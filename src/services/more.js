import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MORE_DATA_GET, MORE_DATA_PUBLISH } from "../APIData";

const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const moreDataApi = createApi({
  reducerPath: "moreDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getMoreData: builder.query({
      query: () => ({
        url: MORE_DATA_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["MoreData"],
    }),
    setMoreData: builder.mutation({
      query: (updatedMoreData) => ({
        url: MORE_DATA_PUBLISH,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: updatedMoreData,
      }),
      invalidatesTags: ["MoreData"],
    }),
  }),
});

export const { useGetMoreDataQuery, useSetMoreDataMutation } = moreDataApi;
