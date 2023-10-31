import {
  DELETE_ONE,
  SOCIAL_MEDIA_DATA_DELETE_ALL,
  SOCIAL_MEDIA_DATA_GET,
  SOCIAL_MEDIA_DATA_POST,
  SOCIAL_MEDIA_DATA_PUBLISH,
  PUT,
} from "../../APIData";
import {
  addNewItem,
  fetchData,
  removeAllItems,
  removeSeveralItems,
  removeSingleItem,
  updateSingleItem,
} from "../api/apiHelper";
import { socialMediaActions } from "./social-media-slice";

import {
  ERROR_MESSAGE,
  ERROR_FETCHING,
  SUCCESS_UPDATE_API,
  ERROR_UPDATING,
} from "../constants";
import { notificationActions } from "../notification/notification-slice";

export const fetchSocialMediaData = () => {
  return async (dispatch) => {
    dispatch(socialMediaActions.setIsLoading({ isLoading: true }));
    try {
      const response = await fetchData(SOCIAL_MEDIA_DATA_GET);
      if (response) {
        dispatch(
          socialMediaActions.setAccounts({ socialMediaAccounts: response })
        );
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
      dispatch(
        notificationActions.showNotification({
          ...ERROR_FETCHING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(socialMediaActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const addNewAccount = (newAccount) => {
  return async (dispatch) => {
    dispatch(socialMediaActions.setIsLoading({ isLoading: true }));
    try {
      const response = await addNewItem(
        newAccount,
        SOCIAL_MEDIA_DATA_POST,
        SOCIAL_MEDIA_DATA_PUBLISH
      );

      if (response.isUpdateSuccessful) {
        dispatch(
          socialMediaActions.addNewAccount({ account: response.newItem })
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
      dispatch(socialMediaActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const removeSelectedAccount = (idToDelete) => {
  return async (dispatch) => {
    dispatch(socialMediaActions.setIsLoading({ isLoading: true }));
    try {
      const response = await removeSingleItem(
        idToDelete,
        DELETE_ONE,
        SOCIAL_MEDIA_DATA_PUBLISH
      );
      if (response) {
        dispatch(socialMediaActions.removeAccount({ id: idToDelete }));
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
      dispatch(socialMediaActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeSelectedAccounts = (idsToDelete, deleteAll) => {
  return async (dispatch) => {
    dispatch(socialMediaActions.setIsLoading({ isLoading: true }));
    try {
      let response;
      if (deleteAll) {
        response = await removeAllItems(
          SOCIAL_MEDIA_DATA_DELETE_ALL,
          SOCIAL_MEDIA_DATA_PUBLISH
        );
      } else {
        response = await removeSeveralItems(
          idsToDelete,
          DELETE_ONE,
          SOCIAL_MEDIA_DATA_PUBLISH
        );
      }

      if (response) {
        dispatch(socialMediaActions.removeAccounts({ ids: idsToDelete }));
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
      dispatch(socialMediaActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const editSocialMediaAccount = (updatedAccount) => {
  return async (dispatch) => {
    try {
      dispatch(socialMediaActions.setIsLoading({ isLoading: true }));
      const response = await updateSingleItem(
        updatedAccount.id,
        updatedAccount,
        PUT,
        SOCIAL_MEDIA_DATA_PUBLISH
      );

      if (response) {
        dispatch(
          socialMediaActions.updateAccounts({ account: response.updatedData })
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
      dispatch(socialMediaActions.setIsLoading({ isLoading: false }));
    }
  };
};
