import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COUNTDOWN_GET, COUNTDOWN_PUBLISH, PUT } from "../APIData";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const countdownApi = createApi({
  reducerPath: "countdownApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getCountdownData: builder.query({
      query: () => ({
        url: COUNTDOWN_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["Countdown"],
    }),
    setCountdownData: builder.mutation({
      query: (updatedCountdownData) => ({
        url: COUNTDOWN_PUBLISH,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: updatedCountdownData,
      }),
      invalidatesTags: ["Countdown"],
    }),
  }),
});
export const { useGetCountdownDataQuery, useSetCountdownDataMutation } =
  countdownApi;
