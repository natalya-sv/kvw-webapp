import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import {
  DAY_SPONSOR,
  MAIN_SPONSOR,
  MEDIA_SPONSOR,
  SPONSOR,
  SPONSOR_IMAGE,
  SPONSOR_NAME,
  SPONSOR_TYPE,
  SPONSOR_WEB,
  STAR_SPONSOR,
} from "./constants";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { SPONSORS_ACTIONS, SPONSORS_TAG } from "../../APIData";
import { replaceHttpByHttps } from "../../helpers/utils";

const AddEditSponsorForm = ({
  editedSponsor,
  closeSponsorsModal,
  createData,
  updateData,
}) => {
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorWebsiteUrl, setSponsorWebsiteUrl] = useState("");
  const [sponsorImageUrl, setSponsorImageUrl] = useState("");
  const [sponsorType, setSponsorType] = useState("general");

  useEffect(() => {
    if (editedSponsor) {
      const { sponsorName, websiteUrl, imageUrl, sponsorType } = editedSponsor;
      setSponsorName(sponsorName);
      setSponsorWebsiteUrl(websiteUrl);
      setSponsorImageUrl(imageUrl);
      setSponsorType(sponsorType);
    }
  }, [editedSponsor]);

  const submitHandler = () => {
    const modifiedSponsorImageUrl = replaceHttpByHttps(sponsorImageUrl);

    const newSponsor = {
      sponsor_name: sponsorName,
      website_url: sponsorWebsiteUrl.trim(),
      sponsor_type: sponsorType,
      image_url: modifiedSponsorImageUrl,
      active: editedSponsor ? editedSponsor.active : true,
    };

    if (editedSponsor) {
      const updatedSponsor = {
        ...newSponsor,
        id: editedSponsor?.id,
      };
      updateData({
        updatedItem: updatedSponsor,
        actions: SPONSORS_ACTIONS,
        tag: SPONSORS_TAG,
      });
    } else {
      createData({
        newItem: newSponsor,
        actions: SPONSORS_ACTIONS,
        tag: SPONSORS_TAG,
      });
    }
    closeSponsorsModal();
  };

  const handleSponsorType = (e) => {
    setSponsorType(e.target.value);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
      <TextInput
        id="sponsor-name"
        onChange={setSponsorName}
        value={sponsorName}
        label={SPONSOR_NAME}
      />
      <TextInput
        id="sponsor-website"
        onChange={setSponsorWebsiteUrl}
        label={SPONSOR_WEB}
        value={sponsorWebsiteUrl}
      />
      <TextInput
        id="sponsor-image-url"
        multiline={true}
        onChange={setSponsorImageUrl}
        label={SPONSOR_IMAGE}
        value={sponsorImageUrl}
      />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          {SPONSOR_TYPE}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          value={sponsorType}
          name="radio-buttons-group"
          onChange={handleSponsorType}
        >
          <FormControlLabel
            value="main"
            control={<Radio />}
            label={MAIN_SPONSOR}
          />
          <FormControlLabel
            value="general"
            control={<Radio />}
            label={SPONSOR}
          />

          <FormControlLabel
            value="day-sponsor"
            control={<Radio />}
            label={DAY_SPONSOR}
          />

          <FormControlLabel
            value="media-sponsor"
            control={<Radio />}
            label={MEDIA_SPONSOR}
          />
          <FormControlLabel
            value="star-sponsor"
            control={<Radio />}
            label={STAR_SPONSOR}
          />
        </RadioGroup>
        <CustomButton
          title={SAVE}
          onClick={submitHandler}
          disabled={!sponsorName || !sponsorImageUrl || !setSponsorWebsiteUrl}
        />
      </FormControl>
    </Box>
  );
};

export default AddEditSponsorForm;
