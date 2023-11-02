import { newsActions } from "./news-slice";
import {
  NEWS_GET,
  DELETE_ONE,
  NEWS_PUBLISH,
  NEWS_POST,
  NEWS_DELETE_ALL,
  PUT,
} from "../../APIData";
import {
  addNewItem,
  fetchData,
  removeSingleItem,
  removeSeveralItems,
  removeAllItems,
  updateSingleItem,
  sendPushMessage,
} from "../api/apiHelper";
import { ERROR_MESSAGE, ERROR_UPDATING } from "../constants";
import { truncateString } from "../../helpers/utils";

export const fetchNewsItems = () => {
  return async (dispatch) => {
    dispatch(newsActions.setIsLoading({ isLoading: true }));

    try {
      const response = await fetchData(NEWS_GET);
      if (response) {
        dispatch(newsActions.setNewsItems({ news: response }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
      dispatch(newsActions.setNewsItems({ news: [] }));
    } finally {
      dispatch(newsActions.setIsLoading({ isLoading: false }));
    }
  };
};

//add new news item and send a push message
export const addNewsItem = (newsItem) => {
  return async (dispatch) => {
    dispatch(newsActions.setIsLoading({ isLoading: true }));

    try {
      const response = await addNewItem(newsItem, NEWS_POST, NEWS_PUBLISH);

      if (response.isUpdateSuccessful) {
        //send also push message when publishing news was successful
        const pushTitle = newsItem.title;
        const pushMessage = truncateString(newsItem.content, 50);

        if (pushTitle && pushMessage) {
          await sendPushMessage(pushTitle, pushMessage);
        } else {
          throw new Error(ERROR_MESSAGE);
        }
        dispatch(newsActions.addNewsItem({ newsItem: response.newItem }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(newsActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const removeNewsItem = (idToDelete) => {
  return async (dispatch) => {
    dispatch(newsActions.setIsLoading({ isLoading: true }));
    try {
      const response = await removeSingleItem(
        idToDelete,
        DELETE_ONE,
        NEWS_PUBLISH
      );
      if (response) {
        dispatch(newsActions.removeNewsItem({ id: idToDelete }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(newsActions.setIsLoading({ isLoading: false }));
    }
  };
};

//remove several or all news
export const removeNewsItems = (idsToDelete, deleteAll) => {
  return async (dispatch) => {
    dispatch(newsActions.setIsLoading({ isLoading: true }));
    try {
      let response;
      if (deleteAll) {
        response = await removeAllItems(NEWS_DELETE_ALL, NEWS_PUBLISH);
      } else {
        response = await removeSeveralItems(
          idsToDelete,
          DELETE_ONE,
          NEWS_PUBLISH
        );
      }

      if (response) {
        dispatch(newsActions.removeNewsItems({ ids: idsToDelete, deleteAll }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(newsActions.setIsLoading({ isLoading: false }));
    }
  };
};
//update existing news item
export const editNewsItem = (updatedNewsitem) => {
  return async (dispatch) => {
    dispatch(newsActions.setIsLoading({ isLoading: true }));
    try {
      const response = await updateSingleItem(
        updatedNewsitem.id,
        updatedNewsitem,
        PUT,
        NEWS_PUBLISH
      );
      if (response) {
        dispatch(
          newsActions.updateNewsItem({ newsItem: response.updatedData })
        );
      } else {
        throw new Error(ERROR_UPDATING);
      }
    } catch (err) {
    } finally {
      dispatch(newsActions.setIsLoading({ isLoading: false }));
    }
  };
};
