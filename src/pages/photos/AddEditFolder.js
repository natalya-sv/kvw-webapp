import { Box } from "@mui/material";
import { SAVE } from "../../helpers/constants";
import React, { useEffect, useState } from "react";
import { FOLDER_COVER_PHOTO_TITLE, FOLDER_TITLE } from "./constants";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import { useDispatch } from "react-redux";
import {
  addNewFolderItem,
  editFolder,
} from "../../store/photos/photos-actions";
const AddEditFolder = ({ selectedFolder, handleClose }) => {
  const [folderYear, setFolderYear] = useState("");
  const [folderCoverPhoto, setFolderCoverPhoto] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedFolder) {
      setFolderYear(selectedFolder.year);
      setFolderCoverPhoto(selectedFolder.folderCoverPhoto);
    }
  }, [selectedFolder]);

  const submitHandler = (e) => {
    e.preventDefault();
    const isEditing = selectedFolder;
    if (isEditing) {
      const updatedFolder = {
        id: selectedFolder.id,
        year: folderYear,
        folder_cover_photo: folderCoverPhoto,
      };
      dispatch(editFolder(updatedFolder));
    } else {
      dispatch(
        addNewFolderItem({
          year: folderYear,
          folder_cover_photo: folderCoverPhoto,
        })
      );
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
        disabled={folderYear === "" || folderCoverPhoto === ""}
      />
    </Box>
  );
};
export default AddEditFolder;
