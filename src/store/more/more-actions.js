import { MORE_DATA_PUBLISH, MORE_DATA_GET, PUT } from "../../APIData";
import { fetchData, updateSingleItem } from "../api/apiHelper";
import {
  ERROR_MESSAGE,
  ERROR_FETCHING,
  SUCCESS_UPDATE_API,
  ERROR_UPDATING,
} from "../constants";
import { moreActions } from "./more-slice";
import { notificationActions } from "../notification/notification-slice";
export const fetchMoreData = () => {
  return async (dispatch) => {
    dispatch(moreActions.setIsLoading({ isLoading: true }));
    try {
      const fetchedMoreDataPage = await fetchData(MORE_DATA_GET);

      if (fetchedMoreDataPage[0]) {
        dispatch(moreActions.setMoreData({ moreData: fetchedMoreDataPage[0] }));
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
      dispatch(moreActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const updateMorePageData = (updatedMorePageData) => {
  return async (dispatch) => {
    dispatch(moreActions.setIsLoading({ isLoading: true }));

    try {
      const response = await updateSingleItem(
        updatedMorePageData.id,
        updatedMorePageData,
        PUT,
        MORE_DATA_PUBLISH
      );
      if (response.isUpdateSuccessful) {
        dispatch(moreActions.setMoreData({ moreData: response.updatedData }));
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
      dispatch(moreActions.setIsLoading({ isLoading: false }));
    }
  };
};
