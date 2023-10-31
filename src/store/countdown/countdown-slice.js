import { createSlice } from "@reduxjs/toolkit";

const countdownSlice = createSlice({
  name: "countdown",
  initialState: {
    countdown: {
      id: "",
      eventTitle: "",
      startDate: "",
      endDate: "",
    },
    isLoading: false,
  },

  reducers: {
    setCountDown(state, action) {
      const { id, event_title, start_date, end_date } =
        action.payload.countdown;
      state.countdown = {
        id: id,
        eventTitle: event_title,
        startDate: start_date,
        endDate: end_date,
      };
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});
export const countdownActions = countdownSlice.actions;
export default countdownSlice;
