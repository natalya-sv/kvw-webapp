import { sponsorsActions } from "./sponsors-slice";
import {
  SPONSORS_GET,
  SPONSORS_POST,
  SPONSORS_PUBLISH,
  PUT,
  SET_ACTIVE_SPONSORS,
  DELETE_ONE,
  SPONSORS_DELETE_ALL,
} from "../../APIData";

import {
  addNewItem,
  fetchData,
  removeAllItems,
  removeSeveralItems,
  removeSingleItem,
  updateAllItems,
  updateSingleItem,
} from "../api/apiHelper";
import {
  ERROR_MESSAGE,
  ERROR_FETCHING,
  SUCCESS_UPDATE_API,
  ERROR_UPDATING,
} from "../constants";
import { ERROR_ADD_SPONSOR, ERROR_EDIT_SPONSOR } from "../constants";
import { notificationActions } from "../notification/notification-slice";

export const fetchSponsorsData = () => {
  return async (dispatch) => {
    dispatch(sponsorsActions.setIsLoading({ isLoading: true }));
    try {
      const responseResult = await fetchData(SPONSORS_GET);
      if (responseResult) {
        dispatch(
          sponsorsActions.setSponsors({
            sponsors: responseResult,
          })
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
      dispatch(sponsorsActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const addNewSponsor = (sponsor) => {
  return async (dispatch) => {
    dispatch(sponsorsActions.setIsLoading({ isLoading: true }));
    try {
      const response = await addNewItem(
        sponsor,
        SPONSORS_POST,
        SPONSORS_PUBLISH
      );

      if (response.isUpdateSuccessful) {
        dispatch(sponsorsActions.addNewSponsor({ sponsor: response.newItem }));
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
        sponsorsActions.shsetShowNotificationowNotification({
          ...ERROR_UPDATING,
          subMessage: err.message,
        })
      );
    } finally {
      dispatch(sponsorsActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const editSponsor = (updatedSponsor) => {
  return async (dispatch) => {
    dispatch(sponsorsActions.setIsLoading({ isLoading: true }));

    try {
      const response = await updateSingleItem(
        updatedSponsor.id,
        updatedSponsor,
        PUT,
        SPONSORS_PUBLISH
      );
      if (response.isUpdateSuccessful) {
        dispatch(
          sponsorsActions.updateSponsor({
            sponsor: response.updatedData,
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
      dispatch(sponsorsActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const updateActiveSponsorsData = (sponsors) => {
  return async (dispatch) => {
    dispatch(sponsorsActions.setIsLoading({ isLoading: true }));
    try {
      const response = await updateAllItems(
        sponsors,
        SET_ACTIVE_SPONSORS,
        SPONSORS_PUBLISH
      );
      if (response) {
        dispatch(
          notificationActions.showNotification({
            ...SUCCESS_UPDATE_API,
          })
        );
        dispatch(sponsorsActions.setSponsors({ sponsors }));
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
      dispatch(sponsorsActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeSponsorItem = (idToDelete) => {
  return async (dispatch) => {
    dispatch(sponsorsActions.setIsLoading({ isLoading: true }));
    try {
      const response = await removeSingleItem(
        idToDelete,
        DELETE_ONE,
        SPONSORS_PUBLISH
      );

      if (response) {
        dispatch(sponsorsActions.removeSponsor({ id: idToDelete }));
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
      dispatch(sponsorsActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeSponsors = (idsToDelete, deleteAll) => {
  return async (dispatch) => {
    dispatch(sponsorsActions.setIsLoading({ isLoading: true }));
    try {
      let response;
      if (deleteAll) {
        response = await removeAllItems(SPONSORS_DELETE_ALL, SPONSORS_PUBLISH);
      } else {
        response = await removeSeveralItems(
          idsToDelete,
          DELETE_ONE,
          SPONSORS_PUBLISH
        );
      }
      if (response) {
        dispatch(
          sponsorsActions.removeSponsors({ ids: idsToDelete, deleteAll })
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
      dispatch(sponsorsActions.setIsLoading({ isLoading: false }));
    }
  };
};
