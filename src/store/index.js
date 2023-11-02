import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./schedule/schedule-slice";
import newsSlice from "./news/news-slice";
import photosSlice from "./photos/photos-slice";
import { kvwApi } from "../services/kvw";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { countdownApi } from "../services/countdown";
import { moreDataApi } from "../services/more";
import { sponsorsApi } from "../services/sponsors";
import { videosApi } from "../services/videos";
import { socialMediaApi } from "../services/social-media";
import { newslettersApi } from "../services/newsletters";

const store = configureStore({
  reducer: {
    [kvwApi.reducerPath]: kvwApi.reducer,
    [countdownApi.reducerPath]: countdownApi.reducer,
    [moreDataApi.reducerPath]: moreDataApi.reducer,
    news: newsSlice.reducer,
    [sponsorsApi.reducerPath]: sponsorsApi.reducer,
    schedule: scheduleSlice.reducer,
    photos: photosSlice.reducer,
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
      newslettersApi.middleware
    ),
});
setupListeners(store.dispatch);
export default store;
