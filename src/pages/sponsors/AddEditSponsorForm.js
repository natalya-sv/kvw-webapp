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
  MAIN_SPONSOR,
  SPONSOR,
  SPONSOR_IMAGE,
  SPONSOR_NAME,
  SPONSOR_TYPE,
  SPONSOR_WEB,
} from "./constants";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";

const AddEditSponsorForm = ({
  editedSponsor,
  closeSponsorsModal,
  createSponsor,
  updateSponsorsData,
}) => {
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorWebsiteUrl, setSponsorWebsiteUrl] = useState("");
  const [sponsorImageUrl, setSponsorImageUrl] = useState("");
  const [sponsorType, setSponsorType] = useState("main");

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
    const newSponsor = {
      sponsor_name: sponsorName,
      website_url: sponsorWebsiteUrl,
      sponsor_type: sponsorType,
      image_url: sponsorImageUrl,
      active: editedSponsor ? editedSponsor.active : false,
    };

    if (editedSponsor) {
      const updatedSponsor = {
        ...newSponsor,
        id: editedSponsor?.id,
      };
      updateSponsorsData(updatedSponsor);
    } else {
      createSponsor(newSponsor);
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
        </RadioGroup>
        <CustomButton
          title={SAVE}
          onClick={submitHandler}
          disabled={
            sponsorName === "" ||
            sponsorImageUrl === "" ||
            setSponsorWebsiteUrl === ""
          }
        />
      </FormControl>
    </Box>
  );
};

export default AddEditSponsorForm;
