import { useEffect, useState } from "react";
import {
  HOME_PAGE_CONTENT,
  HOME_PAGE_TITLE,
  THEMA_TITLE,
  THEME_IMAGE,
  KVW_WEBSITE_URL,
} from "./constants";
import { Box } from "@mui/material";
import { SAVE } from "../../helpers/constants";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { updateKVWData } from "../../store/kvw/kvw-actions";
import ImageView from "../../components/ImageView";

const KVWForm = () => {
  const { kvwInfo } = useSelector((state) => state.kvwData);
  const [title, setHomeTitle] = useState("");
  const [content, setHomeContent] = useState("");
  const [themaYearTitle, setThemaYearTitle] = useState("");
  const [image, setThemaImage] = useState("");
  const [websiteUrl, setKvwWebsiteUrl] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (kvwInfo) {
      const { homeTitle, homeContent, themaTitle, themaImage, kvwWebsite } =
        kvwInfo;
      setHomeTitle(homeTitle);
      setHomeContent(homeContent);
      setThemaYearTitle(themaTitle);
      setThemaImage(themaImage);
      setKvwWebsiteUrl(kvwWebsite);
    }
  }, [kvwInfo]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const updatedKVWData = {
      id: kvwInfo.id,
      home_page_title: title,
      home_page_content: content,
      kvw_website: websiteUrl,
      thema_title: themaYearTitle,
      thema_image: image,
    };

    dispatch(updateKVWData(updatedKVWData));
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"} width={"90%"}>
      <TextInput
        id="kvw-title"
        value={title}
        label={HOME_PAGE_TITLE}
        onChange={setHomeTitle}
      />

      <TextInput
        id="kvw-content"
        multiline={true}
        value={content}
        label={HOME_PAGE_CONTENT}
        onChange={setHomeContent}
      />

      <TextInput
        id="thema-title"
        value={themaYearTitle}
        label={THEMA_TITLE}
        onChange={setThemaYearTitle}
      />

      <TextInput
        id="thema-image"
        value={image}
        label={THEME_IMAGE}
        onChange={setThemaImage}
      />

      <Box>
        {image && (
          <ImageView
            image={image}
            width={"10%"}
            height={"10%"}
            text={"No image found"}
          />
        )}
      </Box>

      <TextInput
        id="kvw-website"
        value={websiteUrl}
        label={KVW_WEBSITE_URL}
        type="url"
        onChange={setKvwWebsiteUrl}
      />
      <CustomButton title={SAVE} onClick={onSubmitHandler} />
    </Box>
  );
};

export default KVWForm;
