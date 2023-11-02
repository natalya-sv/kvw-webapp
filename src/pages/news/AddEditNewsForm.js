import React, { useEffect, useState } from "react";
import { IMAGE_URL_OPT } from "./constants";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  NEWS_CONTENT,
  NEWS_TITLE,
  SEND_PUSH_MESSAGE,
  UPDATE_NEWSITEM,
} from "./constants";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { addNewsItem, editNewsItem } from "../../store/news/news-actions";

const AddEditNewsForm = ({ editedNewsItem, closeNewsModal }) => {
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

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
      date: new Date().toISOString(),
      image_url: imageUrl,
    };
    if (editedNewsItem) {
      const newsUpdated = {
        ...newsItem,
        id: editedNewsItem.id,
      };
      dispatch(editNewsItem(newsUpdated));
      closeNewsModal();
    } else {
      dispatch(addNewsItem(newsItem));
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
      <TextInput
        id="news-title"
        value={newsTitle}
        onChange={setNewsTitle}
        label={NEWS_TITLE}
      />
      <TextInput
        id="news-content"
        multiline={true}
        onChange={setNewsContent}
        value={newsContent}
        label={NEWS_CONTENT}
      />
      <TextInput
        id="news-image-url"
        value={imageUrl}
        multiline={true}
        onChange={setImageUrl}
        label={IMAGE_URL_OPT}
        type={"url"}
      />
      <CustomButton
        disabled={newsTitle === "" || newsContent === ""}
        title={editedNewsItem ? UPDATE_NEWSITEM : SEND_PUSH_MESSAGE}
        onClick={submitHandler}
      />
    </Box>
  );
};

export default AddEditNewsForm;
