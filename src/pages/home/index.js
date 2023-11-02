import React, { useEffect, useState } from "react";
import Title from "../../components/UI/Title.js";
import SpinnerView from "../../components/UI/SpinnerView.js";
import AlertNotification from "../../components/UI/AlertNotification.js";
import { KVW_DESC, KVW_INFO } from "./constants.js";
import PageDescription from "../../components/UI/PageDescription.js";
import { Box } from "@mui/material";
import TextInput from "../../components/TextInput.js";
import { SAVE } from "../../helpers/constants.js";
import {
  HOME_PAGE_CONTENT,
  HOME_PAGE_TITLE,
  THEMA_TITLE,
  THEME_IMAGE,
  KVW_WEBSITE_URL,
} from "./constants.js";
import CustomButton from "../../components/CustomButton.js";
import ImageView from "../../components/ImageView.js";
import {
  useGetHomeDataQuery,
  useSetHomeDataMutation,
} from "../../services/home.js";

const HomePage = () => {
  const [title, setHomeTitle] = useState("");
  const [content, setHomeContent] = useState("");
  const [themaYearTitle, setThemaYearTitle] = useState("");
  const [image, setThemaImage] = useState("");
  const [websiteUrl, setKvwWebsiteUrl] = useState("");
  const {
    data,
    isLoading,
    isError: errorFetching,
    error: fetchingErrorRes,
  } = useGetHomeDataQuery();

  const [setHomeData, { isSuccess: successUpdating, isError: errorUpdating }] =
    useSetHomeDataMutation();

  useEffect(() => {
    if (data && data[0]) {
      const {
        home_page_title,
        home_page_content,
        thema_title,
        thema_image,
        kvw_website,
      } = data[0];
      setHomeTitle(home_page_title);
      setHomeContent(home_page_content);
      setThemaYearTitle(thema_title);
      setThemaImage(thema_image);
      setKvwWebsiteUrl(kvw_website);
    }
  }, [data]);

  const onSubmitHandler = (event) => {
    const updatedHomeData = {
      id: data[0].id,
      home_page_title: title,
      home_page_content: content,
      kvw_website: websiteUrl,
      thema_title: themaYearTitle,
      thema_image: image,
    };

    setHomeData(updatedHomeData);
  };

  if (isLoading) {
    return <SpinnerView />;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      <AlertNotification
        errorFetching={errorFetching}
        errorUpdating={errorUpdating}
        successUpdating={successUpdating}
        subMessage={fetchingErrorRes?.message ?? ""}
      />

      <Title title={KVW_INFO} />
      <PageDescription text={KVW_DESC} />
      <Box display={"flex"} flexDirection={"column"} gap={"20px"} width={"90%"}>
        <TextInput
          id="home-title"
          value={title}
          label={HOME_PAGE_TITLE}
          onChange={setHomeTitle}
        />

        <TextInput
          id="home-content"
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
    </Box>
  );
};

export default HomePage;
