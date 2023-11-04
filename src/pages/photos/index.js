import React, { useState } from "react";
import Title from "../../components/UI/Title";
import { Box } from "@mui/material";
import PageDescription from "../../components/UI/PageDescription";
import SpinnerView from "../../components/UI/SpinnerView";
import AlertNotification from "../../components/UI/AlertNotification";
import { ADD_NEW_ALBUM, EDIT_ALBUM, PHOTOS_PAGE_TITLE } from "./constants";
import { PHOTOS_PAGE_DESCRIPTION } from "./constants";
import PhotosTable from "./PhotosTable";
import AddIcon from "@mui/icons-material/Add";
import { ADD_NEW_FOLDER } from "./constants";
import AddEditFolder from "./AddEditFolder";
import CustomModal from "../../components/CustomModal";
import CustomDialog from "../../components/CustomDialog";
import AddEditAlbum from "./AddEditAlbum";
import CustomButton from "../../components/CustomButton";
import {
  useCreateDataMutation,
  useDeleteDataMutation,
  useGetDataQuery,
  useUpdateDataMutation,
} from "../../services/api";
import { ALBUMS_GET, FOLDERS_GET, PHOTOS_TAG } from "../../APIData";

const PhotosPage = () => {
  const [open, setOpen] = useState(false);
  const [openAddEditAlbumDialog, setOpenAddEditAlbumDialog] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const {
    data: folders,
    isError: errorFetching,
    error: fetchingErrorRes,
    isLoading,
  } = useGetDataQuery({ fetchData: FOLDERS_GET, tag: PHOTOS_TAG });

  const { data: albums } = useGetDataQuery({
    fetchData: ALBUMS_GET,
    tag: ALBUMS_GET,
  });

  const [updateData, { isSuccess: successUpdating, isError: errorUpdating }] =
    useUpdateDataMutation();
  const [deleteData] = useDeleteDataMutation();
  const [createData] = useCreateDataMutation();

  const handleOpenFolderModal = () => {
    setOpen(true);
  };
  const handleCloseFolderModal = () => {
    if (selectedFolder) {
      setSelectedFolder(null);
    }
    setOpen(false);
  };

  const handleOpenAddEditAlbumDialog = () => {
    setOpenAddEditAlbumDialog(true);
  };
  const handleCloseAddEditAlbumDialog = () => {
    setSelectedAlbum(null);
    setOpenAddEditAlbumDialog(false);
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
        subMessage={fetchingErrorRes?.message ?? ""}
      />
      <Title title={PHOTOS_PAGE_TITLE} />
      <PageDescription text={PHOTOS_PAGE_DESCRIPTION} />

      <CustomButton
        onClick={handleOpenFolderModal}
        startIcon={<AddIcon />}
        title={ADD_NEW_FOLDER}
      />

      <CustomModal
        open={open}
        handleClose={handleCloseFolderModal}
        modalComponent={
          <AddEditFolder
            selectedFolder={selectedFolder}
            handleClose={handleCloseFolderModal}
            createData={createData}
            updateData={updateData}
          />
        }
      />
      <CustomDialog
        openDialog={openAddEditAlbumDialog}
        handleCloseDialog={handleCloseAddEditAlbumDialog}
        title={selectedAlbum ? EDIT_ALBUM : ADD_NEW_ALBUM}
        component={
          <AddEditAlbum
            selectedAlbum={selectedAlbum}
            selectedFolderId={selectedFolderId}
            handleCloseAddEditAlbumDialog={handleCloseAddEditAlbumDialog}
            createData={createData}
            updateData={updateData}
          />
        }
      />
      <PhotosTable
        handleOpenFolderModal={handleOpenFolderModal}
        setSelectedFolder={setSelectedFolder}
        setSelectedFolderId={setSelectedFolderId}
        handleOpenAddEditAlbumDialog={handleOpenAddEditAlbumDialog}
        setSelectedAlbum={setSelectedAlbum}
        folders={folders}
        albums={albums}
        deleteData={deleteData}
      />
    </Box>
  );
};
export default PhotosPage;
