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
} from "../APIData";
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
    createSponsor: builder.mutation({
      query: (sponsor) => ({
        url: SPONSORS_POST,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: sponsor,
      }),
      invalidatesTags: ["Sponsors"],
    }),
    updateSponsor: builder.mutation({
      query: (sponsor) => ({
        url: `${PUT}${sponsor.id}`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: sponsor,
      }),
      invalidatesTags: ["Sponsors"],
    }),
    deleteSponsorById: builder.mutation({
      query: (id) => ({
        url: `${DELETE_ONE}${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      invalidatesTags: ["Sponsors"],
    }),
    deleteAllSponsors: builder.mutation({
      query: () => ({
        url: SPONSORS_DELETE_ALL,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      invalidatesTags: ["Sponsors"],
    }),
    updateSponsorsStatus: builder.mutation({
      query: (data) => ({
        url: `${SET_STATUS_SPONSORS}`,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: data,
      }),
      invalidatesTags: ["Sponsors"],
    }),
    deleteSponsorsByIds: builder.mutation({
      query: (ids) => ({
        url: DELETE_SPONSORS_BY_IDS,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: ids,
      }),
      invalidatesTags: ["Sponsors"],
    }),
  }),
});
export const {
  useGetSponsorsQuery,
  useCreateSponsorMutation,
  useUpdateSponsorMutation,
  useDeleteSponsorsByIdsMutation,
  useUpdateSponsorsStatusMutation,
  useDeleteSponsorByIdMutation,
  useDeleteAllSponsorsMutation,
} = sponsorsApi;
