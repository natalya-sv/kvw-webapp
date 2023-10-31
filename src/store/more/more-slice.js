import { createSlice } from "@reduxjs/toolkit";

const moreSlice = createSlice({
  name: "moreData",
  initialState: {
    moreInfo: {
      id: "",
      aboutUsTitle: "",
      aboutUsContent: "",
      mailNotificationContent: "",
      mailNotificationLink: "",
      privacyStatementContent: "",
      privacyStatementLink: "",
      contactEmail: "",
      contactPhoneNumber: "",
      contactContent: "",
    },
    isLoading: false,
  },
  reducers: {
    setMoreData(state, action) {
      if (action.payload.moreData) {
        const {
          id,
          about_us_title,
          about_us_content,
          mail_notification_content,
          mail_notification_link,
          privacy_statement_content,
          privacy_statement_link,
          contact_email,
          contact_phone_number,
          contact_content,
        } = action.payload.moreData;

        state.moreInfo.id = id;
        state.moreInfo.aboutUsTitle = about_us_title;
        state.moreInfo.aboutUsContent = about_us_content;
        state.moreInfo.mailNotificationContent = mail_notification_content;
        state.moreInfo.mailNotificationLink = mail_notification_link;
        state.moreInfo.privacyStatementContent = privacy_statement_content;
        state.moreInfo.privacyStatementLink = privacy_statement_link;
        state.moreInfo.contactEmail = contact_email;
        state.moreInfo.contactPhoneNumber = contact_phone_number;
        state.moreInfo.contactContent = contact_content;
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const moreActions = moreSlice.actions;
export default moreSlice;
