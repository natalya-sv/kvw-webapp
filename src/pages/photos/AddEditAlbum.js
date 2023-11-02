import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";

const AddEditAlbum = ({
  selectedAlbum,
  handleCloseAddEditAlbumDialog,
  selectedFolderId,
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
      album_link: albumLink,
      album_cover_photo: albumCoverPhoto,
      folder_id: selectedFolderId,
    };
    if (selectedAlbum) {
      const updAlbum = {
        ...album,
        id: selectedAlbum.id,
      };
      // editAlbum(updAlbum)
    } else {
      //  addNewAlbum(album)
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
        disabled={albumCoverPhoto === "" || albumLink === "" || title === ""}
      />
    </Box>
  );
};
export default AddEditAlbum;
