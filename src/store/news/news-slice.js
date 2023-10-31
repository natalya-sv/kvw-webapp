import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    isLoading: false,
  },

  reducers: {
    setNewsItems(state, action) {
      const newsItems = action.payload.news.map((newsItem) => {
        return {
          id: newsItem.id,
          title: newsItem.title,
          content: newsItem.content,
          date: newsItem.date,
          imageUrl: newsItem.image_url,
        };
      });
      state.news = newsItems;
    },
    addNewsItem(state, action) {
      if (action.payload.newsItem) {
        const { id, title, content, date, image_url } = action.payload.newsItem;

        const newsItem = {
          id: id,
          title: title,
          content: content,
          date: date,
          imageUrl: image_url,
        };
        state.news.push(newsItem);
      }
    },
    updateNewsItem(state, action) {
      const { id, title, content, date, image_url } = action.payload.newsItem;
      const index = state.news.findIndex((nItem) => nItem.id === id);

      if (index !== -1) {
        const updatedNewsItem = {
          id: id,
          title: title,
          content: content,
          date: date,
          imageUrl: image_url,
        };
        state.news[index] = updatedNewsItem;
      }
    },
    removeNewsItem(state, action) {
      state.news = state.news.filter((nItem) => nItem.id !== action.payload.id);
    },
    removeNewsItems(state, action) {
      const { deleteAll, ids } = action.payload;
      if (deleteAll) {
        state.news = [];
      } else {
        state.news = state.news.filter((nItem) => !ids.includes(nItem.id));
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const newsActions = newsSlice.actions;
export default newsSlice;
