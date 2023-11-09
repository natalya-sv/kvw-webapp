import { Typography } from "@mui/material";
import { SOCIAL_MEDIA_ACTIONS, SOCIAL_MEDIA_TAG } from "../../APIData";
import MainTable from "../../components/table/MainTable";
import {
  NO_ACCOUNTS_YET,
  SOCIAL_MEDIA_TITLE,
  socialMediaDefinition,
} from "./constants";
import { useMemo } from "react";

const SocialMediaTable = ({
  socialMediaAccounts,
  deleteData,
  setEditAccount,
  openMediaModal,
  successDeleting,
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
      deletedItems: idsToRemove,
      tag: SOCIAL_MEDIA_TAG,
      actions: SOCIAL_MEDIA_ACTIONS,
    });
  };

  const handleEditSocialAccount = (id) => {
    const accountToEdit = updatedAccounts.find((acc) => acc.id === id);
    if (accountToEdit) {
      setEditAccount(accountToEdit);
      openMediaModal();
    }
  };

  return updatedAccounts && updatedAccounts.length > 0 ? (
    <MainTable
      items={updatedAccounts}
      tableDefinition={socialMediaDefinition}
      title={SOCIAL_MEDIA_TITLE}
      onRemoveItems={handleRemoveSocialAccount}
      onEditItem={handleEditSocialAccount}
      successDeleting={successDeleting}
    />
  ) : (
    <Typography>{NO_ACCOUNTS_YET}</Typography>
  );
};
export default SocialMediaTable;
