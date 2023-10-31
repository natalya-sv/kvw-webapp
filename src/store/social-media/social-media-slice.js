import { createSlice } from "@reduxjs/toolkit";

const socialMediaSlice = createSlice({
  name: "social-media",
  initialState: {
    socialMediaAccounts: [],
    isLoading: false,
  },
  reducers: {
    setAccounts(state, action) {
      const accounts = action.payload.socialMediaAccounts.map((account) => {
        return {
          id: account.id,
          title: account.title,
          iconName: account.icon_name,
          color: account.color,
          websiteUrl: account.website_url,
        };
      });
      state.socialMediaAccounts = accounts;
    },
    updateAccounts(state, action) {
      const { id, title, icon_name, color, website_url } =
        action.payload.account;

      const index = state.socialMediaAccounts.findIndex((acc) => acc.id === id);
      if (index !== -1) {
        const updatedAccount = {
          id: id,
          title: title,
          iconName: icon_name,
          color: color,
          websiteUrl: website_url,
        };
        state.socialMediaAccounts[index] = updatedAccount;
      }
    },
    addNewAccount(state, action) {
      const { id, title, icon_name, color, website_url } =
        action.payload.account;
      const newAccount = {
        id: id,
        title: title,
        iconName: icon_name,
        color: color,
        websiteUrl: website_url,
      };

      state.socialMediaAccounts.push(newAccount);
    },
    removeAccount(state, action) {
      state.socialMediaAccounts = state.socialMediaAccounts.filter(
        (accItem) => accItem.id !== action.payload.id
      );
    },

    removeAccounts(state, action) {
      const { deleteAll, ids } = action.payload;
      if (deleteAll) {
        state.socialMediaAccounts = [];
      } else
        state.socialMediaAccounts = state.socialMediaAccounts.filter(
          (n) => !ids.includes(n.id)
        );
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const socialMediaActions = socialMediaSlice.actions;
export default socialMediaSlice;
