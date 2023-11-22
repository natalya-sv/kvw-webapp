import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import { ALBUM_TAG, ALBUMS_ACTIONS } from "../../APIData";

const AddEditAlbum = ({
  selectedAlbum,
  handleCloseAddEditAlbumDialog,
  selectedFolderId,
  createData,
  updateData,
}) => {
  const [title, setTitle] = useState("");
  const [albumCoverPhoto, setAlbumCoverPhoto] = useState("");
  const [albumLink, setAlbumLink] = useState("");

  useEffect(() => {
    if (selectedAlbum) {
      setTitle(selectedAlbum.title);
      setAlbumCoverPhoto(selectedAlbum.albumCoverPhoto);
      setAlbumLink(selectedAlbum.albumLink);
    }
  }, [selectedAlbum]);

  const onSubmitHandler = () => {
    const album = {
      title: title,
      album_link: albumLink.trim(),
      album_cover_photo: albumCoverPhoto.trim(),
      folder_id: selectedFolderId,
    };
    if (selectedAlbum) {
      const updatedAlbum = {
        ...album,
        id: selectedAlbum.id,
      };
      updateData({
        updatedItem: updatedAlbum,
        actions: ALBUMS_ACTIONS,
        tag: ALBUM_TAG,
      });
    } else {
      createData({
        newItem: album,
        actions: ALBUMS_ACTIONS,
        tag: ALBUM_TAG,
      });
    }
    handleCloseAddEditAlbumDialog();
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"20px 10px"}
      style={{
        width: "100%",
        padding: 20,
      }}
    >
      <TextInput
        id="title"
        value={title}
        label={"title"}
        multiline={true}
        onChange={setTitle}
      />
      <TextInput
        id="title"
        value={albumLink}
        label={"album link"}
        multiline={true}
        onChange={setAlbumLink}
      />
      <TextInput
        id="cover-photo"
        value={albumCoverPhoto}
        label={"cover-photo"}
        multiline={true}
        onChange={setAlbumCoverPhoto}
      />
      <CustomButton
        title={SAVE}
        onClick={onSubmitHandler}
        disabled={!albumCoverPhoto || !albumLink || !title}
      />
    </Box>
  );
};
export default AddEditAlbum;
