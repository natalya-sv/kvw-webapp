import React, { useState } from "react";
import Title from "../../components/UI/Title";
import { Box } from "@mui/material";
import PageDescription from "../../components/UI/PageDescription";
import {
  ADD_NEW_VIDEO,
  VIDEOS_PAGE_DESCRIPTION,
  VIDEOS_PAGE_TITLE,
} from "./constants";
import VideosTable from "./VideosTable";
import SpinnerView from "../../components/UI/SpinnerView";
import AlertNotification from "../../components/UI/AlertNotification";
import AddEditVideoForm from "./AddEditVideoForm";
import CustomModal from "../../components/CustomModal";

import { VIDEOS_GET, VIDEOS_TAG } from "../../APIData";
import CustomButton from "../../components/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import useCustomDataQuery from "../../useCustomDataQuery";

const VideosPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editedVideo, setEditedVideo] = useState(false);
  const {
    data: videos,
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
  } = useCustomDataQuery({ fetchData: VIDEOS_GET, tag: VIDEOS_TAG });

  const openVideosModal = () => {
    setOpenModal(true);
  };

  const closeVideosModal = () => {
    setEditedVideo(null);
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

      <Title title={VIDEOS_PAGE_TITLE} />
      <PageDescription text={VIDEOS_PAGE_DESCRIPTION} />
      <CustomButton
        title={ADD_NEW_VIDEO}
        onClick={openVideosModal}
        startIcon={<AddIcon />}
      />
      <CustomModal
        open={openModal}
        handleClose={closeVideosModal}
        modalComponent={
          <AddEditVideoForm
            editedVideo={editedVideo}
            closeVideosModal={closeVideosModal}
            updateData={updateData}
            createData={createData}
          />
        }
      />

      <VideosTable
        videos={videos}
        openVideosModal={openVideosModal}
        setEditedVideo={setEditedVideo}
        closeVideosModal={closeVideosModal}
        deleteData={deleteData}
        successUpdating={successDeleting || successUpdating}
      />
    </Box>
  );
};
export default VideosPage;
