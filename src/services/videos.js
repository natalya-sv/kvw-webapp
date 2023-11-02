import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CREATE_NEW_ITEM, VIDEOS_GET, VIDEOS_PUBLISH } from "../APIData";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const videosApi = createApi({
  reducerPath: "videosApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: VIDEOS_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["Videos"],
    }),
    createVideoItem: builder.mutation({
      query: (videoItem) => ({
        url: CREATE_NEW_ITEM,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: videoItem,
      }),
      invalidatesTags: ["Videos"],
    }),
    updateVideosData: builder.mutation({
      query: (videosData) => ({
        url: VIDEOS_PUBLISH,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: videosData,
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});
export const {
  useGetVideosQuery,
  useUpdateVideosDataMutation,
  useCreateVideoItemMutation,
} = videosApi;
