import { Box } from "@mui/material";
import React, { useState } from "react";
import AlertNotification from "../../components/UI/AlertNotification";
import PageDescription from "../../components/UI/PageDescription";
import SpinnerView from "../../components/UI/SpinnerView";
import Title from "../../components/UI/Title";
import {
  ADD_ACCOUNT,
  SOCIAL_MEDIA_PAGE_DESCRIPTION,
  SOCIAL_MEDIA_TITLE,
} from "./constants";
import SocialMediaTable from "./SocialMediaTable";
import CustomModal from "../../components/CustomModal";
import AddEditSocialMediaAccount from "./AddEditSocialMediaAccount";
import { SOCIAL_MEDIA_DATA_GET, SOCIAL_MEDIA_TAG } from "../../APIData";
import CustomButton from "../../components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import useCustomDataQuery from "../../useCustomDataQuery";

const SocialMediaPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const {
    data: socialMediaAccounts,
    fetchingData,
    isError,
    successCreating,
    successUpdating,
    successDeleting,
    isLoading,
    errorMessage,
    updateData,
    createData,
    deleteData,
  } = useCustomDataQuery({
    fetchData: SOCIAL_MEDIA_DATA_GET,
    tag: SOCIAL_MEDIA_TAG,
  });

  const openMediaModal = () => {
    setOpenModal(true);
  };

  const closeMediaModal = () => {
    setAccountToEdit(null);
    setOpenModal(false);
  };

  if (fetchingData) {
    return <SpinnerView />;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      style={{ width: "100%" }}
    >
      {isLoading && <SpinnerView />}

      <AlertNotification
        isError={isError}
        isSuccessCreating={successCreating}
        isSuccessUpdating={successUpdating}
        isSuccessDeleting={successDeleting}
        errorMessage={errorMessage}
      />

      <Title title={SOCIAL_MEDIA_TITLE} />
      <PageDescription text={SOCIAL_MEDIA_PAGE_DESCRIPTION} />
      <CustomButton
        title={ADD_ACCOUNT}
        onClick={openMediaModal}
        startIcon={<AddIcon />}
      />
      <CustomModal
        open={openModal}
        handleClose={closeMediaModal}
        modalComponent={
          <AddEditSocialMediaAccount
            closeMediaModal={closeMediaModal}
            accountToEdit={accountToEdit}
            updateData={updateData}
            createData={createData}
          />
        }
      />
      <SocialMediaTable
        closeMediaModal={closeMediaModal}
        openMediaModal={openMediaModal}
        setEditAccount={setAccountToEdit}
        socialMediaAccounts={socialMediaAccounts}
        deleteData={deleteData}
        successDeleting={successDeleting}
      />
    </Box>
  );
};
export default SocialMediaPage;
