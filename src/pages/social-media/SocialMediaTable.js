import { SOCIAL_MEDIA_ACTIONS, SOCIAL_MEDIA_TAG } from "../../APIData";
import SimpleTable from "../../components/table/SimpleTable";
import { SOCIAL_MEDIA_TITLE, socialMediaDefinition } from "./constants";
import { useMemo } from "react";

const SocialMediaTable = ({
  socialMediaAccounts,
  deleteData,
  setEditAccount,
  openMediaModal,
}) => {
  const updatedAccounts = useMemo(() => {
    if (socialMediaAccounts && socialMediaAccounts.length > 0) {
      return socialMediaAccounts.map((account) => {
        return {
          id: account.id,
          title: account.title,
          iconName: account.icon_name,
          color: account.color,
          websiteUrl: account.website_url,
        };
      });
    }
    return [];
  }, [socialMediaAccounts]);

  const handleRemoveSocialAccount = (idsToRemove) => {
    deleteData({
      data: idsToRemove,
      tag: SOCIAL_MEDIA_TAG,
      actions: SOCIAL_MEDIA_ACTIONS,
    });
  };

  const handleEditSocialAccount = (id) => {
    const accountToEdit = socialMediaAccounts.find((acc) => acc.id === id);
    if (accountToEdit) {
      setEditAccount(accountToEdit);
      openMediaModal();
    }
  };

  return (
    <SimpleTable
      items={updatedAccounts}
      headCells={socialMediaDefinition}
      title={SOCIAL_MEDIA_TITLE}
      onRemove={handleRemoveSocialAccount}
      buttons={["edit", "delete"]}
      onEditItem={handleEditSocialAccount}
    />
  );
};
export default SocialMediaTable;
