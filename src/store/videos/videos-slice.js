import { createSlice } from "@reduxjs/toolkit";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    isLoading: false,
  },

  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    setVideos(state, action) {
      const videos = action.payload.videos.map((videoItem) => {
        return {
          id: videoItem.id,
          title: videoItem.title,
          description: videoItem.description,
          url: videoItem.url,
          youtubeLink: videoItem.youtube_link,
          date: videoItem.date,
        };
      });
      state.videos = videos;
    },
    addNewVideoItem(state, action) {
      const { id, title, description, youtube_link, date } =
        action.payload.videoItem;
      const newVideoItem = {
        id: id,
        title: title,
        description: description,
        youtubeLink: youtube_link,
        date: date,
      };
      state.videos.push(newVideoItem);
    },

    removeVideoItem(state, action) {
      state.videos = state.videos.filter(
        (videoItem) => videoItem.id !== action.payload.id
      );
    },
    removeVideosItems(state, action) {
      const { deleteAll, ids } = action.payload;
      if (deleteAll) {
        state.videos = [];
      } else
        state.videos = state.videos.filter(
          (videoItem) => !ids.includes(videoItem.id)
        );
    },
    updateVideo(state, action) {
      const { id, title, description, youtube_link, url, date } =
        action.payload.videoItem;

      const index = state.videos.findIndex((videoItem) => videoItem.id === id);
      if (index !== -1) {
        const videoItem = {
          id: id,
          title: title,
          description: description,
          url: url,
          youtubeLink: youtube_link,
          date: date,
        };
        state.videos[index] = videoItem;
      }
    },
  },
});

export const videosActions = videosSlice.actions;

export default videosSlice;
