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
import {
  useCreateDataMutation,
  useDeleteDataMutation,
  useGetDataQuery,
  useUpdateDataMutation,
} from "../../services/api";
import { VIDEOS_GET, VIDEOS_TAG } from "../../APIData";
import CustomButton from "../../components/CustomButton";
import AddIcon from "@mui/icons-material/Add";

const VideosPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editedVideo, setEditedVideo] = useState(false);
  const {
    data: videos,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetDataQuery({ fetchData: VIDEOS_GET, tag: VIDEOS_TAG });

  const [
    updateData,
    {
      isSuccess: successUpdating,
      isError: errorUpdating,
      error: updatingErrorRes,
    },
  ] = useUpdateDataMutation();

  const [deleteData, { isError: errorDeleting }] = useDeleteDataMutation();
  const [createData, { isError: errorCreating }] = useCreateDataMutation();

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
        errorUpdating={errorUpdating || errorDeleting || errorCreating}
        successUpdating={successUpdating}
        subMessage={
          fetchingErrorRes?.message ?? updatingErrorRes?.message ?? ""
        }
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
      />
    </Box>
  );
};
export default VideosPage;
