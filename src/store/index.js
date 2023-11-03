import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./news/news-slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { scheduleApi } from "../services/schedule";
import { foldersApi } from "../services/folders";
import { api } from "../services/api";

const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [foldersApi.reducerPath]: foldersApi.reducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      scheduleApi.middleware,
      foldersApi.middleware,
      api.middleware
    ),
});
setupListeners(store.dispatch);
export default store;
