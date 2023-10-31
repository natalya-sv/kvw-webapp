import { useEffect, useState } from "react";
import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import {
  ABOUT_US_CONTENT,
  ABOUT_US_PAGE,
  ABOUT_US_TITLE,
  CONTACTS_PAGE,
  CONTACT_CONTENT,
  CONTACT_EMAIL,
  CONTACT_PHONE_NUMBER,
  NEWSLETTERS_CONTENT,
  NEWSLETTERS_LINK,
  NEWSLETTERS_PAGE,
  PRIVACY_PAGE,
  PRIVACY_STATEMENT_CONTENT,
  PRIVACY_STATEMENT_LINK,
} from "./constants";
import { SAVE } from "../../helpers/constants";
import TextInput from "../../components/TextInput";
import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { updateMorePageData } from "../../store/more/more-actions";

const MoreForm = ({ moreData }) => {
  const [aboutUsTitle, setAboutUsTitle] = useState("");
  const [aboutUsContent, setAboutUsContent] = useState("");
  const [mailNotificationContent, setMailNotificationContent] = useState("");
  const [mailNotificationLink, setMailNotificationLink] = useState("");
  const [privacyStatementContent, setPrivacyStatementContent] = useState("");
  const [privacyStatementLink, setPrivacyStatementLink] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contactContent, setContactContent] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (moreData) {
      setAboutUsTitle(moreData.aboutUsTitle);
      setAboutUsContent(moreData.aboutUsContent);
      setMailNotificationContent(moreData.mailNotificationContent);
      setMailNotificationLink(moreData.mailNotificationLink);
      setPrivacyStatementContent(moreData.privacyStatementContent);
      setPrivacyStatementLink(moreData.privacyStatementLink);
      setContactEmail(moreData.contactEmail);
      setContactPhoneNumber(moreData.contactPhoneNumber);
      setContactContent(moreData.contactContent);
    }
  }, [moreData]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const updatedMoreData = {
      id: moreData.id,
      about_us_title: aboutUsTitle,
      about_us_content: aboutUsContent,
      mail_notification_content: mailNotificationContent,
      mail_notification_link: mailNotificationLink,
      privacy_statement_content: privacyStatementContent,
      privacy_statement_link: privacyStatementLink,
      contact_email: contactEmail,
      contact_phone_number: contactPhoneNumber,
      contact_content: contactContent,
    };

    dispatch(updateMorePageData(updatedMoreData));
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
      <Typography color={"#ea507c"} variant="subtitle2">
        {ABOUT_US_PAGE}
      </Typography>
      <TextInput
        id="about-us"
        fullWidth={true}
        value={aboutUsTitle}
        label={ABOUT_US_TITLE}
        onChange={setAboutUsTitle}
      />
      <TextInput
        id="about-content"
        fullWidth={true}
        multiline={true}
        value={aboutUsContent}
        label={ABOUT_US_CONTENT}
        onChange={setAboutUsContent}
      />
      <Divider variant="fullwidth" />
      <Typography color={"#ea507c"} variant="subtitle2">
        {NEWSLETTERS_PAGE}
      </Typography>

      <TextInput
        id="mail-content"
        fullWidth={true}
        multiline={true}
        value={mailNotificationContent}
        label={NEWSLETTERS_CONTENT}
        onChange={setMailNotificationContent}
      />
      <TextInput
        id="mail-link"
        fullWidth={true}
        value={mailNotificationLink}
        label={NEWSLETTERS_LINK}
        onChange={setMailNotificationLink}
      />
      <Divider variant="fullWidth" />
      <Typography color={"#ea507c"} variant="subtitle2">
        {PRIVACY_PAGE}
      </Typography>

      <TextInput
        id="privacy-content"
        fullWidth={true}
        multiline={true}
        value={privacyStatementContent}
        label={PRIVACY_STATEMENT_CONTENT}
        onChange={setPrivacyStatementContent}
      />

      <TextInput
        id="privacy-link"
        fullWidth={true}
        value={privacyStatementLink}
        label={PRIVACY_STATEMENT_LINK}
        onChange={setPrivacyStatementLink}
      />
      <Divider variant="fullWidth" />

      <Typography color={"#ea507c"} variant="subtitle2">
        {CONTACTS_PAGE}
      </Typography>

      <TextInput
        id="contact-email"
        fullWidth={true}
        value={contactEmail}
        label={CONTACT_EMAIL}
        type={"email"}
        onChange={setContactEmail}
      />
      <TextInput
        id="contact-phone"
        fullWidth={true}
        value={contactPhoneNumber}
        label={CONTACT_PHONE_NUMBER}
        type={"tel"}
        onChange={setContactPhoneNumber}
      />
      <TextInput
        id="contact-content"
        fullWidth={true}
        multiline={true}
        value={contactContent}
        label={CONTACT_CONTENT}
        onChange={setContactContent}
      />
      <CustomButton title={SAVE} onClick={onSubmitHandler} />
    </Box>
  );
};
export default MoreForm;
