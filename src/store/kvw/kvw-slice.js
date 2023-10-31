import { createSlice } from "@reduxjs/toolkit";

const kvwSlice = createSlice({
  name: "kvwData",
  initialState: {
    kvwInfo: {
      id: "",
      homeTitle: "",
      homeContent: "",
      image: null,
      aboutUsTitle: "",
      aboutUsContent: "",
      kvwWebsite: "",
      themaTitle: "",
      themaImage: "",
    },
    isLoading: false,
  },

  reducers: {
    setKVWData(state, action) {
      if (action.payload.kvwData) {
        const {
          id,
          home_page_title,
          home_page_content,
          image,
          about_us_title,
          about_us_content,
          kvw_website,
          thema_title,
          thema_image,
        } = action.payload.kvwData;
        state.kvwInfo.id = id;
        state.kvwInfo.homeTitle = home_page_title;
        state.kvwInfo.homeContent = home_page_content;
        state.kvwInfo.image = image;
        state.kvwInfo.aboutUsTitle = about_us_title;
        state.kvwInfo.aboutUsContent = about_us_content;
        state.kvwInfo.kvwWebsite = kvw_website;
        state.kvwInfo.themaTitle = thema_title;
        state.kvwInfo.themaImage = thema_image;
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});
export const kvwActions = kvwSlice.actions;

export default kvwSlice;
