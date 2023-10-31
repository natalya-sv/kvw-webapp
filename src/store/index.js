import { configureStore } from "@reduxjs/toolkit";
import scheduleSlice from "./schedule/schedule-slice";
import newsSlice from "./news/news-slice";
import photosSlice from "./photos/photos-slice";
import sponsorsSlice from "./sponsors/sponsors-slice";
import videosSlice from "./videos/videos-slice";
import socialMediaSlice from "./social-media/social-media-slice";
import newslettersSlice from "./newsletters/newsletters-slice";
import notificationSlice from "./notification/notification-slice";
import { kvwApi } from "../services/kvw";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { countdownApi } from "../services/countdown";
import { moreDataApi } from "../services/more";

const store = configureStore({
  reducer: {
    [kvwApi.reducerPath]: kvwApi.reducer,
    [countdownApi.reducerPath]: countdownApi.reducer,
    [moreDataApi.reducerPath]: moreDataApi.reducer,
    news: newsSlice.reducer,
    sponsors: sponsorsSlice.reducer,
    schedule: scheduleSlice.reducer,
    photos: photosSlice.reducer,
    videos: videosSlice.reducer,
    socialMedia: socialMediaSlice.reducer,
    newsletters: newslettersSlice.reducer,
    notification: notificationSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      kvwApi.middleware,
      countdownApi.middleware,
      moreDataApi.middleware
    ),
});
setupListeners(store.dispatch);
export default store;
