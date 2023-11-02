import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NEWSLETTERS_GET, NEWSLETTERS_PUBLISH } from "../APIData";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const newslettersApi = createApi({
  reducerPath: "newslettersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getNewsletters: builder.query({
      query: () => ({
        url: NEWSLETTERS_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["Newsletters"],
    }),
    updateNewslettersData: builder.mutation({
      query: (newslettersData) => ({
        url: NEWSLETTERS_PUBLISH,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: newslettersData,
      }),
      invalidatesTags: ["Newsletters"],
    }),
  }),
});
export const { useGetNewslettersQuery, useUpdateNewslettersDataMutation } =
  newslettersApi;
