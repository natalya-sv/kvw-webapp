import React, { useState } from "react";
import Title from "../../components/UI/Title";
import { Box } from "@mui/material";
import PageDescription from "../../components/UI/PageDescription";
import { VIDEOS_PAGE_DESCRIPTION, VIDEOS_PAGE_TITLE } from "./constants";
import VideosTable from "./VideosTable";
import SpinnerView from "../../components/UI/SpinnerView";
import AlertNotification from "../../components/UI/AlertNotification";
import AddEditVideoForm from "./AddEditVideoForm";
import CustomModal from "../../components/CustomModal";
import {
  useGetVideosQuery,
  useUpdateVideosDataMutation,
} from "../../services/videos";

const VideosPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editedVideo, setEditedVideo] = useState(false);
  const {
    data: videos,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetVideosQuery();

  const [
    updateVideosData,
    {
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorRes,
    },
  ] = useUpdateVideosDataMutation();

  const openVideosModal = () => {
    setOpenModal(true);
  };

  const closeVideosModal = () => {
    setEditedVideo(null);
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

      <Title title={VIDEOS_PAGE_TITLE} />
      <PageDescription text={VIDEOS_PAGE_DESCRIPTION} />
      <Box style={{ width: "90%" }}>
        <AddEditVideoForm
          closeVideosModal={closeVideosModal}
          updateVideosData={updateVideosData}
        />
      </Box>
      <CustomModal
        open={openModal}
        handleClose={closeVideosModal}
        modalComponent={
          <AddEditVideoForm
            editedVideo={editedVideo}
            closeVideosModal={closeVideosModal}
            updateVideosData={updateVideosData}
          />
        }
      />

      <VideosTable
        videos={videos}
        openVideosModal={openVideosModal}
        setEditedVideo={setEditedVideo}
        closeVideosModal={closeVideosModal}
        updateVideosData={updateVideosData}
      />
    </Box>
  );
};
export default VideosPage;
