import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { KVW_GET, KVW_PUBLISH } from "../APIData";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: () => ({
        url: KVW_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["Home"],
    }),
    setHomeData: builder.mutation({
      query: (updatedKvwData) => ({
        url: KVW_PUBLISH,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: updatedKvwData,
      }),
      invalidatesTags: ["Home"],
    }),
  }),
});
export const { useGetHomeDataQuery, useSetHomeDataMutation } = homeApi;
