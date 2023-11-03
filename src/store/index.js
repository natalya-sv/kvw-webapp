import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./news/news-slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { sponsorsApi } from "../services/sponsors";
import { newslettersApi } from "../services/newsletters";
import { scheduleApi } from "../services/schedule";
import { foldersApi } from "../services/folders";
import { api } from "../services/api";

const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
    [sponsorsApi.reducerPath]: sponsorsApi.reducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
    [foldersApi.reducerPath]: foldersApi.reducer,
    [newslettersApi.reducerPath]: newslettersApi.reducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      sponsorsApi.middleware,
      newslettersApi.middleware,
      scheduleApi.middleware,
      foldersApi.middleware,
      api.middleware
    ),
});
setupListeners(store.dispatch);
export default store;
