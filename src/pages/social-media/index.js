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
import {
  useCreateDataMutation,
  useDeleteDataMutation,
  useGetDataQuery,
  useUpdateDataMutation,
} from "../../services/api";
import { SOCIAL_MEDIA_DATA_GET, SOCIAL_MEDIA_TAG } from "../../APIData";
import CustomButton from "../../components/CustomButton";

const SocialMediaPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const {
    data: socialMediaAccounts,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetDataQuery({
    fetchData: SOCIAL_MEDIA_DATA_GET,
    tag: SOCIAL_MEDIA_TAG,
  });

  const [
    updateSocialMediaData,
    {
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorRes,
    },
  ] = useUpdateDataMutation();
  const [createData] = useCreateDataMutation();
  const [deleteData] = useDeleteDataMutation();

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
      <CustomButton title={ADD_ACCOUNT} onClick={openMediaModal} />
      <CustomModal
        open={openModal}
        handleClose={closeMediaModal}
        modalComponent={
          <AddEditSocialMediaAccount
            closeMediaModal={closeMediaModal}
            accountToEdit={accountToEdit}
            updateSocialMediaData={updateSocialMediaData}
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
      />
    </Box>
  );
};
export default SocialMediaPage;
