import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import { VIDEO_DESCRIPTION, VIDEO_TITLE, YOUTUBE_LINK } from "./constants";
import { getEmbeddedUrl } from "./utils";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import {
  addNewVideoItem,
  updateVideoitem,
} from "../../store/videos/videos-actions";

const AddEditVideoForm = ({ editedVideo, closeVideosModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editedVideo) {
      setTitle(editedVideo.title);
      setDescription(editedVideo.description);
      setYoutubeLink(editedVideo.youtubeLink);
    }
  }, [editedVideo]);

  const submitHandler = (event) => {
    event.preventDefault();
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
      dispatch(updateVideoitem(updatedVideo));
    } else {
      dispatch(addNewVideoItem(videoItem));
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
