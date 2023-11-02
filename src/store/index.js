import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./news/news-slice";
import { kvwApi } from "../services/kvw";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { countdownApi } from "../services/countdown";
import { moreDataApi } from "../services/more";
import { sponsorsApi } from "../services/sponsors";
import { videosApi } from "../services/videos";
import { socialMediaApi } from "../services/social-media";
import { newslettersApi } from "../services/newsletters";
import { scheduleApi } from "../services/schedule";
import { foldersApi } from "../services/folders";

const store = configureStore({
  reducer: {
    [kvwApi.reducerPath]: kvwApi.reducer,
    [countdownApi.reducerPath]: countdownApi.reducer,
    [moreDataApi.reducerPath]: moreDataApi.reducer,
    news: newsSlice.reducer,
    [sponsorsApi.reducerPath]: sponsorsApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [foldersApi.reducerPath]: foldersApi.reducer,
    [videosApi.reducerPath]: videosApi.reducer,
    [socialMediaApi.reducerPath]: socialMediaApi.reducer,
    [newslettersApi.reducerPath]: newslettersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      kvwApi.middleware,
      countdownApi.middleware,
      moreDataApi.middleware,
      sponsorsApi.middleware,
      videosApi.middleware,
      socialMediaApi.middleware,
      newslettersApi.middleware,
      scheduleApi.middleware,
      foldersApi.middleware
    ),
});
setupListeners(store.dispatch);
export default store;
