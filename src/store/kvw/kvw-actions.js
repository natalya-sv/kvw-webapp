import { kvwActions } from "./kvw-slice";
import { KVW_GET, KVW_PUBLISH, PUT } from "../../APIData";
import { fetchData, updateSingleItem } from "../api/apiHelper";
import { notificationActions } from "../notification/notification-slice";
import {
  ERROR_MESSAGE,
  ERROR_FETCHING,
  SUCCESS_UPDATE_API,
  ERROR_UPDATING,
} from "../constants";
export const fetchKVWData = () => {
  return async (dispatch) => {
    dispatch(kvwActions.setIsLoading({ isLoading: true }));
    try {
      const fetchedKVW = await fetchData(KVW_GET);

      if (fetchedKVW[0]) {
        dispatch(
          kvwActions.setKVWData({
            kvwData: fetchedKVW[0],
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
      dispatch(kvwActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const updateKVWData = (updatedKVWData) => {
  return async (dispatch) => {
    dispatch(kvwActions.setIsLoading({ isLoading: true }));

    try {
      const response = await updateSingleItem(
        updatedKVWData.id,
        updatedKVWData,
        PUT,
        KVW_PUBLISH
      );
      if (response.isUpdateSuccessful) {
        dispatch(kvwActions.setKVWData({ kvwData: response.updatedData }));
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
      dispatch(kvwActions.setIsLoading({ isLoading: false }));
    }
  };
};
