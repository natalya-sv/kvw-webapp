import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import { VIDEO_DESCRIPTION, VIDEO_TITLE, YOUTUBE_LINK } from "./constants";
import { getEmbeddedUrl } from "./utils";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { VIDEOS_ACTIONS, VIDEOS_TAG } from "../../APIData";

const AddEditVideoForm = ({
  editedVideo,
  closeVideosModal,
  updateData,
  createData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  useEffect(() => {
    if (editedVideo) {
      setTitle(editedVideo.title);
      setDescription(editedVideo.description);
      setYoutubeLink(editedVideo.youtubeLink);
    }
  }, [editedVideo]);

  const submitHandler = () => {
    const embeddedLinkForApp = getEmbeddedUrl(youtubeLink);
    const videoItem = {
      title: title,
      url: embeddedLinkForApp,
      description: description,
      youtube_link: youtubeLink,
      date: new Date().toISOString(),
    };
    if (editedVideo) {
      const updatedVideo = {
        ...videoItem,
        id: editedVideo.id,
      };
      updateData({
        updatedItem: updatedVideo,
        actions: VIDEOS_ACTIONS,
        tag: VIDEOS_TAG,
      });
    } else {
      createData({
        newItem: videoItem,
        actions: VIDEOS_ACTIONS,
        tag: VIDEOS_TAG,
      });
    }
    closeVideosModal();
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
      <TextInput
        id="title"
        value={title}
        onChange={setTitle}
        label={VIDEO_TITLE}
      />
      <TextInput
        id="description"
        value={description}
        onChange={setDescription}
        label={VIDEO_DESCRIPTION}
        multiline={true}
      />
      <TextInput
        id="youtubeLink"
        value={youtubeLink}
        onChange={setYoutubeLink}
        label={YOUTUBE_LINK}
      />
      <CustomButton
        title={SAVE}
        onClick={submitHandler}
        disabled={title === "" || description === "" || youtubeLink === ""}
      />
    </Box>
  );
};
export default AddEditVideoForm;
