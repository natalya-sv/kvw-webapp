import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ fetchData }) => ({
        url: fetchData,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),

      providesTags: (_result, _error, id) => {
        return [id.tag];
      },
    }),
    createData: builder.mutation({
      query: ({ newItem, actions, type }) => ({
        url: actions,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: { action: "create", newItem: newItem, type: type },
      }),
      invalidatesTags: (_result, _error, id) => {
        return [id.tag];
      },
    }),
    updateData: builder.mutation({
      query: ({ updatedItem, actions, type }) => ({
        url: actions,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: { action: "update", updatedItem: updatedItem, type: type },
      }),
      invalidatesTags: (_result, _error, id) => {
        return [id.tag];
      },
    }),
    deleteData: builder.mutation({
      query: ({ deletedItems, actions, type }) => ({
        url: actions,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: { action: "delete", deletedItems: deletedItems, type: type },
      }),
      invalidatesTags: (_result, _error, id) => {
        return [id.tag];
      },
    }),
  }),
});

export const {
  useGetDataQuery,
  useUpdateDataMutation,
  useCreateDataMutation,
  useDeleteDataMutation,
} = api;
