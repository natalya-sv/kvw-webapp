import { createSlice } from "@reduxjs/toolkit";

const newslettersSlice = createSlice({
  name: "newsletters",
  initialState: {
    newsletters: [],
    isLoading: false,
  },
  reducers: {
    setNewsletters(state, action) {
      const newsLetters = action.payload.newsletters.map((nl) => {
        return {
          id: nl.id,
          title: nl.title,
          newsletterLink: nl.newsletter_link,
          date: nl.date,
        };
      });
      state.newsletters = newsLetters;
    },
    addNewslettersItem(state, action) {
      const { id, title, newsletter_link, date } =
        action.payload.newsletterItem;

      const newsLetterItem = {
        id: id,
        title: title,
        newsletterLink: newsletter_link,
        date: date,
      };
      state.newsletters.push(newsLetterItem);
    },
    updateNewslettersItem(state, action) {
      const { id, title, newsletter_link, date } =
        action.payload.newsletterItem;
      const index = state.newsletters.findIndex((i) => i.id === id);
      if (index !== -1) {
        const item = {
          id: id,
          title: title,
          newsletterLink: newsletter_link,
          date: date,
        };
        state.newsletters[index] = item;
      }
    },
    removeNewslettersItem(state, action) {
      const id = action.payload.id;
      state.newsletters = state.newsletters.filter((item) => item.id !== id);
    },
    removeNewslettersItems(state, action) {
      if (action.payload.deleteAll) {
        state.newsletters = [];
      } else {
        state.newsletters = state.newsletters.filter(
          (n) => !action.payload.ids.includes(n.id)
        );
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const newslettersActions = newslettersSlice.actions;
export default newslettersSlice;
