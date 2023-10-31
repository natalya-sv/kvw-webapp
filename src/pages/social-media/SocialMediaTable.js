import { useDispatch, useSelector } from "react-redux";
import SimpleTable from "../../components/table/SimpleTable";
import { SOCIAL_MEDIA_TITLE, socialMediaDefinition } from "./constants";
import {
  removeSelectedAccount,
  removeSelectedAccounts,
} from "../../store/social-media/social-media-actions";

const SocialMediaTable = (props) => {
  const { socialMediaAccounts } = useSelector((state) => state.socialMedia);
  const dispatch = useDispatch();

  const handleRemoveSocialAccount = (idsToRemove) => {
    if (idsToRemove.length === 1) {
      dispatch(removeSelectedAccount(idsToRemove[0]));
    } else {
      const deleteAllItems = socialMediaAccounts.length === idsToRemove.length;
      dispatch(removeSelectedAccounts(idsToRemove, deleteAllItems));
    }
  };

  const handleEditSocialAccount = (id) => {
    const accountToEdit = socialMediaAccounts.find((acc) => acc.id === id);
    if (accountToEdit) {
      props.setEditAccount(accountToEdit);
      props.openMediaModal();
    }
  };

  return (
    <SimpleTable
      items={socialMediaAccounts}
      headCells={socialMediaDefinition}
      title={SOCIAL_MEDIA_TITLE}
      onRemove={handleRemoveSocialAccount}
      buttons={["edit", "delete"]}
      onEditItem={handleEditSocialAccount}
    />
  );
};
export default SocialMediaTable;
