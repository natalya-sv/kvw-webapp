import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "./news/news-slice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "../services/api";

const store = configureStore({
  reducer: {
    news: newsSlice.reducer,

    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);
export default store;
