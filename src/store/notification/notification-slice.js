import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: {
      severity: null,
      isActive: false,
      title: "",
      message: "",
      subMessage: "",
    },
  },

  reducers: {
    showNotification(state, action) {
      state.notification = {
        isActive: true,
        severity: action.payload.severity,
        title: action.payload.title,
        message: action.payload.message,
        subMessage: action.payload.subMessage,
      };
    },
    hideNotification(state, action) {
      state.notification = {
        severity: null,
        isActive: false,
        title: "",
        subMessage: "",
        message: "",
      };
    },
  },
});
export const notificationActions = notificationSlice.actions;

export default notificationSlice;
