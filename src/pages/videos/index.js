import React, { useEffect, useState } from "react";
import Title from "../../components/UI/Title";
import { Box } from "@mui/material";
import PageDescription from "../../components/UI/PageDescription";
import { VIDEOS_PAGE_DESCRIPTION, VIDEOS_PAGE_TITLE } from "./constants";
import { useSelector, useDispatch } from "react-redux";
import VideosTable from "./VideosTable";
import { fetchVideosData } from "../../store/videos/videos-actions";
import SpinnerView from "../../components/UI/SpinnerView";
import AlertNotification from "../../components/UI/AlertNotification";
import AddEditVideoForm from "./AddEditVideoForm";
import CustomModal from "../../components/CustomModal";

const VideosPage = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editedVideo, setEditedVideo] = useState(false);
  const { isLoading } = useSelector((state) => state.videos);
  const { notification } = useSelector((state) => state.notification);

  const openVideosModal = () => {
    setOpenModal(true);
  };

  const closeVideosModal = () => {
    setEditedVideo(null);
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(fetchVideosData());
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
      <Title title={VIDEOS_PAGE_TITLE} />
      <PageDescription text={VIDEOS_PAGE_DESCRIPTION} />
      <Box style={{ width: "90%" }}>
        <AddEditVideoForm closeVideosModal={closeVideosModal} />
      </Box>
      <CustomModal
        open={openModal}
        handleClose={closeVideosModal}
        modalComponent={
          <AddEditVideoForm
            editedVideo={editedVideo}
            closeVideosModal={closeVideosModal}
          />
        }
      />

      <VideosTable
        openVideosModal={openVideosModal}
        setEditedVideo={setEditedVideo}
        closeVideosModal={closeVideosModal}
      />
    </Box>
  );
};
export default VideosPage;
