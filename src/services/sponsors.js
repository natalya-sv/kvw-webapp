import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SPONSORS_GET, SPONSORS_PUBLISH } from "../APIData";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const sponsorsApi = createApi({
  reducerPath: "sponsorsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getSponsors: builder.query({
      query: () => ({
        url: SPONSORS_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["Sponsors"],
    }),

    updateSponsorsData: builder.mutation({
      query: (sponsorsData) => ({
        url: SPONSORS_PUBLISH,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: sponsorsData,
      }),
      invalidatesTags: ["Sponsors"],
    }),
  }),
});
export const { useGetSponsorsQuery, useUpdateSponsorsDataMutation } =
  sponsorsApi;
