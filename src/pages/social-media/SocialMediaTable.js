import SimpleTable from "../../components/table/SimpleTable";
import { SOCIAL_MEDIA_TITLE, socialMediaDefinition } from "./constants";
import { useMemo } from "react";

const SocialMediaTable = ({
  socialMediaAccounts,
  updateSocialMediaData,
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
    if (idsToRemove.length === 1) {
      updateSocialMediaData(idsToRemove[0]);
    } else {
      const deleteAllItems = socialMediaAccounts.length === idsToRemove.length;
      updateSocialMediaData(idsToRemove, deleteAllItems);
    }
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
