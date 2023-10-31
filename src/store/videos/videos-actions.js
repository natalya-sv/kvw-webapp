import {
  DELETE_ONE,
  VIDEOS_DELETE_ALL,
  VIDEOS_GET,
  VIDEOS_POST,
  VIDEOS_PUBLISH,
  PUT,
} from "../../APIData";
import {
  ERROR_MESSAGE,
  ERROR_FETCHING,
  SUCCESS_UPDATE_API,
  ERROR_UPDATING,
} from "../constants";
import {
  addNewItem,
  fetchData,
  removeAllItems,
  removeSeveralItems,
  removeSingleItem,
  updateSingleItem,
} from "../api/apiHelper";
import { notificationActions } from "../notification/notification-slice";
import { videosActions } from "./videos-slice";

export const fetchVideosData = () => {
  return async (dispatch) => {
    dispatch(videosActions.setIsLoading({ isLoading: true }));
    try {
      const responseResult = await fetchData(VIDEOS_GET);

      if (responseResult) {
        dispatch(videosActions.setVideos({ videos: responseResult }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
      dispatch(videosActions.setVideos({ videos: [] }));
      dispatch(
        notificationActions.showNotification({
          ...ERROR_FETCHING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(videosActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const addNewVideoItem = (videoItem) => {
  return async (dispatch) => {
    dispatch(videosActions.setIsLoading({ isLoading: true }));

    try {
      const response = await addNewItem(videoItem, VIDEOS_POST, VIDEOS_PUBLISH);
      if (response.isUpdateSuccessful) {
        dispatch(
          videosActions.addNewVideoItem({ videoItem: response.newItem })
        );
        dispatch(
          notificationActions.showNotification({
            ...SUCCESS_UPDATE_API,
          })
        );
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
      dispatch(
        notificationActions.showNotification({
          ...ERROR_UPDATING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(videosActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const removeVideoItem = (idToDelete) => {
  return async (dispatch) => {
    dispatch(videosActions.setIsLoading({ isLoading: true }));
    try {
      const response = await removeSingleItem(
        idToDelete,
        DELETE_ONE,
        VIDEOS_PUBLISH
      );
      if (response) {
        dispatch(videosActions.removeVideoItem({ id: idToDelete }));
        dispatch(
          notificationActions.showNotification({
            ...SUCCESS_UPDATE_API,
          })
        );
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
      dispatch(
        notificationActions.showNotification({
          ...ERROR_UPDATING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(videosActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const removeVideoItems = (idsToDelete, deleteAll) => {
  return async (dispatch) => {
    dispatch(videosActions.setIsLoading({ isLoading: true }));
    try {
      let response;
      if (deleteAll) {
        response = await removeAllItems(VIDEOS_DELETE_ALL, VIDEOS_PUBLISH);
      } else {
        response = await removeSeveralItems(
          idsToDelete,
          DELETE_ONE,
          VIDEOS_PUBLISH
        );
      }
      if (response) {
        dispatch(videosActions.removeVideosItems({ ids: idsToDelete }));
        dispatch(
          notificationActions.showNotification({
            ...SUCCESS_UPDATE_API,
          })
        );
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
      dispatch(
        notificationActions.showNotification({
          ...ERROR_UPDATING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(videosActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const updateVideoitem = (updatedVideo) => {
  return async (dispatch) => {
    dispatch(videosActions.setIsLoading({ isLoading: true }));
    try {
      const response = await updateSingleItem(
        updatedVideo.id,
        updatedVideo,
        PUT,
        VIDEOS_PUBLISH
      );
      if (response) {
        dispatch(
          videosActions.updateVideo({ videoItem: response.updatedData })
        );
        dispatch(
          notificationActions.showNotification({
            ...SUCCESS_UPDATE_API,
          })
        );
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
      dispatch(
        notificationActions.showNotification({
          ...ERROR_UPDATING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(videosActions.setIsLoading({ isLoading: false }));
    }
  };
};
