import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SOCIAL_MEDIA_DATA_GET, SOCIAL_MEDIA_DATA_PUBLISH } from "../APIData";
const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
const token = localStorage.getItem("userToken");

export const socialMediaApi = createApi({
  reducerPath: "socialMediaApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getSocialMediaAccounts: builder.query({
      query: () => ({
        url: SOCIAL_MEDIA_DATA_GET,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
      }),
      providesTags: ["SocialMedia"],
    }),

    updateSocialMediaData: builder.mutation({
      query: (socialMData) => ({
        url: SOCIAL_MEDIA_DATA_PUBLISH,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: tokenPrefix + token,
        },
        body: socialMData,
      }),
      invalidatesTags: ["SocialMedia"],
    }),
  }),
});
export const {
  useGetSocialMediaAccountsQuery,
  useUpdateSocialMediaDataMutation,
} = socialMediaApi;
