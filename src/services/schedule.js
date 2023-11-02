import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DAY_PROGRAMMES_GET,
  GROUPS_GET,
  SPONSORS_GET,
  SPONSORS_PUBLISH,
} from "../APIData";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => ({
        url: GROUPS_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["Groups"],
    }),
    getDays: builder.query({
      query: () => ({
        url: DAY_PROGRAMMES_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["Days"],
    }),
  }),
});
export const { useGetGroupsQuery, useGetDaysQuery } = scheduleApi;
