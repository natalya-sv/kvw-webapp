import { configureStore } from "@reduxjs/toolkit";
import countdownSlice from "./countdown/countdown-slice";
import scheduleSlice from "./schedule/schedule-slice";
import kvwSlice from "./kvw/kvw-slice";
import newsSlice from "./news/news-slice";
import photosSlice from "./photos/photos-slice";
import sponsorsSlice from "./sponsors/sponsors-slice";
import videosSlice from "./videos/videos-slice";
import moreSlice from "./more/more-slice";
import socialMediaSlice from "./social-media/social-media-slice";
import newslettersSlice from "./newsletters/newsletters-slice";
import notificationSlice from "./notification/notification-slice";

const store = configureStore({
  reducer: {
    kvwData: kvwSlice.reducer,
    news: newsSlice.reducer,
    sponsors: sponsorsSlice.reducer,
    schedule: scheduleSlice.reducer,
    countdown: countdownSlice.reducer,
    photos: photosSlice.reducer,
    videos: videosSlice.reducer,
    moreData: moreSlice.reducer,
    socialMedia: socialMediaSlice.reducer,
    newsletters: newslettersSlice.reducer,
    notification: notificationSlice.reducer,
  },
});
export default store;
