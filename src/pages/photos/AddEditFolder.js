import { Box } from "@mui/material";
import { SAVE } from "../../helpers/constants";
import React, { useEffect, useState } from "react";
import { FOLDER_COVER_PHOTO_TITLE, FOLDER_TITLE } from "./constants";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import { PHOTOS_ACTIONS, PHOTOS_TAG, FOLDER_TYPE } from "../../APIData";

const AddEditFolder = ({
  selectedFolder,
  handleClose,
  createData,
  updateData,
}) => {
  const [folderYear, setFolderYear] = useState("");
  const [folderCoverPhoto, setFolderCoverPhoto] = useState("");

  useEffect(() => {
    if (selectedFolder) {
      setFolderYear(selectedFolder.year);
      setFolderCoverPhoto(selectedFolder.folderCoverPhoto);
    }
  }, [selectedFolder]);

  const submitHandler = () => {
    if (selectedFolder) {
      const updatedFolder = {
        id: selectedFolder.id,
        year: folderYear,
        folder_cover_photo: folderCoverPhoto.trim(),
      };
      updateData({
        updatedItem: updatedFolder,
        type: FOLDER_TYPE,
        actions: PHOTOS_ACTIONS,
        tag: PHOTOS_TAG,
      });
    } else {
      const newFolder = {
        year: folderYear,
        folder_cover_photo: folderCoverPhoto,
      };
      createData({
        newItem: newFolder,
        type: FOLDER_TYPE,
        actions: PHOTOS_ACTIONS,
        tag: PHOTOS_TAG,
      });
    }
    handleClose();
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
      style={{
        width: "100%",
        marginLeft: 5,
        marginRight: 5,
      }}
    >
      <TextInput
        id="folder_title"
        value={folderYear}
        label={FOLDER_TITLE}
        onChange={setFolderYear}
        multiline={true}
      />
      <TextInput
        id="folder_cover_photo"
        value={folderCoverPhoto}
        label={FOLDER_COVER_PHOTO_TITLE}
        multiline={true}
        onChange={setFolderCoverPhoto}
      />
      <CustomButton
        title={SAVE}
        onClick={submitHandler}
        disabled={!folderYear || !folderCoverPhoto}
      />
    </Box>
  );
};
export default AddEditFolder;
