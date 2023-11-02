import { Box } from "@mui/material";
import React, { useState } from "react";
import AlertNotification from "../../components/UI/AlertNotification";
import PageDescription from "../../components/UI/PageDescription";
import SpinnerView from "../../components/UI/SpinnerView";
import Title from "../../components/UI/Title";
import { SOCIAL_MEDIA_PAGE_DESCRIPTION, SOCIAL_MEDIA_TITLE } from "./constants";
import SocialMediaTable from "./SocialMediaTable";
import CustomModal from "../../components/CustomModal";
import AddEditSocialMediaAccount from "./AddEditSocialMediaAccount";
import {
  useGetSocialMediaAccountsQuery,
  useUpdateSocialMediaDataMutation,
} from "../../services/social-media";
const SocialMediaPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const {
    data: socialMediaAccounts,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetSocialMediaAccountsQuery();

  const [
    updateSocialMediaData,
    {
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorRes,
    },
  ] = useUpdateSocialMediaDataMutation();
  const openMediaModal = () => {
    setOpenModal(true);
  };

  const closeMediaModal = () => {
    setAccountToEdit(null);
    setOpenModal(false);
  };

  if (isLoading) {
    return <SpinnerView />;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      style={{ width: "100%" }}
    >
      <AlertNotification
        errorFetching={errorFetching}
        errorUpdating={errorUpdating}
        successUpdating={successUpdating}
        subMessage={
          fetchingErrorRes?.message ?? updatingErrorRes?.message ?? ""
        }
      />

      <Title title={SOCIAL_MEDIA_TITLE} />
      <PageDescription text={SOCIAL_MEDIA_PAGE_DESCRIPTION} />
      <Box style={{ width: "90%" }}>
        <AddEditSocialMediaAccount
          closeMediaModal={closeMediaModal}
          updateSocialMediaData={updateSocialMediaData}
        />
      </Box>
      <CustomModal
        open={openModal}
        handleClose={closeMediaModal}
        modalComponent={
          <AddEditSocialMediaAccount
            closeMediaModal={closeMediaModal}
            accountToEdit={accountToEdit}
            updateSocialMediaData={updateSocialMediaData}
          />
        }
      />

      <SocialMediaTable
        closeMediaModal={closeMediaModal}
        openMediaModal={openMediaModal}
        setEditAccount={setAccountToEdit}
        socialMediaAccounts={socialMediaAccounts}
        updateSocialMediaData={updateSocialMediaData}
      />
    </Box>
  );
};
export default SocialMediaPage;
