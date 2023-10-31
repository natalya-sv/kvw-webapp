import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertNotification from "../../components/UI/AlertNotification";
import PageDescription from "../../components/UI/PageDescription";
import SpinnerView from "../../components/UI/SpinnerView";
import Title from "../../components/UI/Title";
import { fetchSocialMediaData } from "../../store/social-media/social-media-actions";
import { SOCIAL_MEDIA_PAGE_DESCRIPTION, SOCIAL_MEDIA_TITLE } from "./constants";
import SocialMediaTable from "./SocialMediaTable";
import CustomModal from "../../components/CustomModal";
import AddEditSocialMediaAccount from "./AddEditSocialMediaAccount";
const SocialMediaPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.socialMedia);
  const { notification } = useSelector((state) => state.notification);
  const [openModal, setOpenModal] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);

  const openMediaModal = () => {
    setOpenModal(true);
  };

  const closeMediaModal = () => {
    setAccountToEdit(null);
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(fetchSocialMediaData());
  }, [dispatch]);

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
      {notification?.isActive && (
        <AlertNotification notification={notification} />
      )}
      <Title title={SOCIAL_MEDIA_TITLE} />
      <PageDescription text={SOCIAL_MEDIA_PAGE_DESCRIPTION} />
      <Box style={{ width: "90%" }}>
        <AddEditSocialMediaAccount closeMediaModal={closeMediaModal} />
      </Box>
      <CustomModal
        open={openModal}
        handleClose={closeMediaModal}
        modalComponent={
          <AddEditSocialMediaAccount
            closeMediaModal={closeMediaModal}
            accountToEdit={accountToEdit}
          />
        }
      />

      <SocialMediaTable
        closeMediaModal={closeMediaModal}
        openMediaModal={openMediaModal}
        setEditAccount={setAccountToEdit}
      />
    </Box>
  );
};
export default SocialMediaPage;
