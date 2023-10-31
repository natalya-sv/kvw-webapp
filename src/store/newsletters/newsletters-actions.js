import { newslettersActions } from "./newsletters-slice";
import {
  addNewItem,
  fetchData,
  removeSingleItem,
  removeSeveralItems,
  removeAllItems,
  updateSingleItem,
} from "../api/apiHelper";
import {
  DELETE_ONE,
  NEWSLETTERS_DELETE_ALL,
  NEWSLETTERS_GET,
  NEWSLETTERS_POST,
  NEWSLETTERS_PUBLISH,
  PUT,
} from "../../APIData";
import {
  ERROR_MESSAGE,
  ERROR_FETCHING,
  SUCCESS_UPDATE_API,
  ERROR_UPDATING,
} from "../constants";
import { notificationActions } from "../notification/notification-slice";
export const fetchNewsletters = () => {
  return async (dispatch) => {
    dispatch(newslettersActions.setIsLoading({ isLoading: true }));
    try {
      const response = await fetchData(NEWSLETTERS_GET);
      if (response) {
        dispatch(newslettersActions.setNewsletters({ newsletters: response }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
      dispatch(newslettersActions.setNewsletters({ newsletters: [] }));
      dispatch(
        notificationActions.showNotification({
          ...ERROR_FETCHING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(newslettersActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const addNewsletterItem = (newsletterItem) => {
  return async (dispatch) => {
    dispatch(newslettersActions.setIsLoading({ isLoading: true }));
    try {
      const response = await addNewItem(
        newsletterItem,
        NEWSLETTERS_POST,
        NEWSLETTERS_PUBLISH
      );
      if (response) {
        dispatch(
          newslettersActions.addNewslettersItem({
            newsletterItem: response.newItem,
          })
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
      dispatch(newslettersActions.setNewsletters({ newsletters: [] }));
      dispatch(
        notificationActions.showNotification({
          ...ERROR_UPDATING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(newslettersActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeNewsletterItem = (idToDelete) => {
  return async (dispatch) => {
    dispatch(newslettersActions.setIsLoading({ isLoading: true }));
    try {
      const response = await removeSingleItem(
        idToDelete,
        DELETE_ONE,
        NEWSLETTERS_PUBLISH
      );
      if (response) {
        dispatch(newslettersActions.removeNewslettersItem({ id: idToDelete }));
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
      dispatch(newslettersActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeNewslettersItems = (idsToDelete, deleteAll) => {
  return async (dispatch) => {
    dispatch(newslettersActions.setIsLoading({ isLoading: true }));
    try {
      let response;
      if (deleteAll) {
        response = response = await removeAllItems(
          NEWSLETTERS_DELETE_ALL,
          NEWSLETTERS_PUBLISH
        );
      } else {
        response = await removeSeveralItems(
          idsToDelete,
          DELETE_ONE,
          NEWSLETTERS_PUBLISH
        );
      }

      if (response) {
        dispatch(
          newslettersActions.removeNewslettersItems({
            ids: idsToDelete,
            deleteAll: deleteAll,
          })
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
      dispatch(newslettersActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const editNewsletterItem = (updatedNewsletterItem) => {
  return async (dispatch) => {
    dispatch(newslettersActions.setIsLoading({ isLoading: true }));
    try {
      const response = await updateSingleItem(
        updatedNewsletterItem.id,
        updatedNewsletterItem,
        PUT,
        NEWSLETTERS_PUBLISH
      );

      if (response) {
        dispatch(
          newslettersActions.updateNewslettersItem({
            newsletterItem: response.updatedData,
          })
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
      dispatch(newslettersActions.setNewsletters({ newsletters: [] }));
      dispatch(
        notificationActions.showNotification({
          ...ERROR_UPDATING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(newslettersActions.setIsLoading({ isLoading: false }));
    }
  };
};
