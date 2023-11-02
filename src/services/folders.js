import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ALBUMS_GET, FOLDERS_GET } from "../APIData";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const foldersApi = createApi({
  reducerPath: "foldersApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getFolders: builder.query({
      query: () => ({
        url: FOLDERS_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["Folders"],
    }),
    getAlbums: builder.query({
      query: () => ({
        url: ALBUMS_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["Albums"],
    }),
  }),
});
export const { useGetFoldersQuery, useGetAlbumsQuery } = foldersApi;
