import React, { useEffect, useState } from "react";
import { IMAGE_URL_OPT } from "./constants";
import { Box } from "@mui/material";
import {
  NEWS_CONTENT,
  NEWS_TITLE,
  SEND_PUSH_MESSAGE,
  UPDATE_NEWSITEM,
} from "./constants";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { NEWS_ACTIONS, NEWS_TAG, PUSH_ACTIONS } from "../../APIData";

const AddEditNewsForm = ({
  editedNewsItem,
  closeNewsModal,
  updateData,
  createData,
  successCreating,
  isLoading,
}) => {
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (editedNewsItem) {
      setNewsContent(editedNewsItem.content);
      setNewsTitle(editedNewsItem.title);
      setImageUrl(editedNewsItem.imageUrl);
    }
  }, [editedNewsItem]);

  const submitHandler = () => {
    const newsItem = {
      title: newsTitle,
      content: newsContent,
      image_url: imageUrl.trim(),
    };
    if (editedNewsItem) {
      const newsUpdated = {
        ...newsItem,
        id: editedNewsItem.id,
      };
      updateData({
        updatedItem: newsUpdated,
        tag: NEWS_TAG,
        actions: NEWS_ACTIONS,
      });
    } else {
      createData({ newItem: newsItem, tag: NEWS_TAG, actions: PUSH_ACTIONS });
    }

    closeNewsModal();
  };

  useEffect(() => {
    if (successCreating) {
      setNewsContent("");
      setNewsTitle("");
      setImageUrl("");
    }
  }, [successCreating]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
      <TextInput
        id="news-title"
        value={newsTitle}
        onChange={setNewsTitle}
        label={NEWS_TITLE}
        disabled={isLoading}
      />
      <TextInput
        id="news-content"
        multiline={true}
        onChange={setNewsContent}
        value={newsContent}
        label={NEWS_CONTENT}
        disabled={isLoading}
      />
      <TextInput
        id="news-image-url"
        value={imageUrl}
        multiline={true}
        onChange={setImageUrl}
        label={IMAGE_URL_OPT}
        type={"url"}
        disabled={isLoading}
      />
      <CustomButton
        disabled={newsTitle === "" || newsContent === "" || isLoading}
        title={editedNewsItem ? UPDATE_NEWSITEM : SEND_PUSH_MESSAGE}
        onClick={submitHandler}
      />
    </Box>
  );
};

export default AddEditNewsForm;
