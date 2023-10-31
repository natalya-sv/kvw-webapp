import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SAVE } from "../../helpers/constants";
import { PLATFORM_TITEL, SOCIAL_MEDIA_URL } from "./constants";
import CustomButton from "../../components/CustomButton";
import {
  addNewAccount,
  editSocialMediaAccount,
} from "../../store/social-media/social-media-actions";
import { useDispatch } from "react-redux";
import TextInput from "../../components/TextInput";
const AddEditSocialMediaAccount = ({ accountToEdit, closeMediaModal }) => {
  const [accountTitle, setAccountTitle] = useState("");
  const [accountWebsiteUrl, setAccountWebsiteUrl] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (accountToEdit) {
      setAccountTitle(accountToEdit.title);
      setAccountWebsiteUrl(accountToEdit.websiteUrl);
    }
  }, [accountToEdit]);

  const submitHandler = (event) => {
    event.preventDefault();
    const isEditing = accountToEdit;
    const account = {
      title: accountTitle,
      website_url: accountWebsiteUrl,
      icon_name: "person-circle-outline",
      color: "#72c6c8",
    };
    if (isEditing) {
      const updatedAccount = {
        ...account,
        id: accountToEdit.id,
        icon_name: accountToEdit.iconName,
        color: accountToEdit.color,
      };
      dispatch(editSocialMediaAccount(updatedAccount));
    } else {
      dispatch(addNewAccount(account));
    }
    closeMediaModal();
  };
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
      <TextInput
        id="account-title"
        onChange={setAccountTitle}
        value={accountTitle}
        label={PLATFORM_TITEL}
      />
      <TextInput
        id="account-website"
        onChange={setAccountWebsiteUrl}
        value={accountWebsiteUrl}
        label={SOCIAL_MEDIA_URL}
      />

      <CustomButton
        title={SAVE}
        onClick={submitHandler}
        disabled={accountWebsiteUrl === "" || accountTitle === ""}
      />
    </Box>
  );
};
export default AddEditSocialMediaAccount;
