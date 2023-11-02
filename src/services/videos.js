import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DELETE_ONE,
  DELETE_SPONSORS_BY_IDS,
  PUT,
  SET_STATUS_SPONSORS,
  SPONSORS_DELETE_ALL,
  SPONSORS_GET,
  SPONSORS_POST,
  SPONSORS_PUBLISH,
  VIDEOS_GET,
  VIDEOS_PUBLISH,
} from "../APIData";
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
export const { useGetVideosQuery, useUpdateVideosDataMutation } = videosApi;
