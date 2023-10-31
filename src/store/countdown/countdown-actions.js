import { countdownActions } from "./countdown-slice";
import { COUNTDOWN_GET, COUNTDOWN_PUBLISH, PUT } from "../../APIData";
import { fetchData, updateSingleItem } from "../api/apiHelper";
import {
  ERROR_MESSAGE,
  ERROR_FETCHING,
  SUCCESS_UPDATE_API,
  ERROR_UPDATING,
} from "../constants";
import { notificationActions } from "../notification/notification-slice";

export const fetchCountDownData = () => {
  return async (dispatch) => {
    dispatch(countdownActions.setIsLoading({ isLoading: true }));

    try {
      const response = await fetchData(COUNTDOWN_GET);
      if (response[0]) {
        dispatch(countdownActions.setCountDown({ countdown: response[0] }));
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
      dispatch(countdownActions.setIsLoading({ isLoading: false }));
    }
  };
};

export const updateCountDownData = (countdown) => {
  return async (dispatch) => {
    dispatch(countdownActions.setIsLoading({ isLoading: true }));
    try {
      const response = await updateSingleItem(
        countdown.id,
        countdown,
        PUT,
        COUNTDOWN_PUBLISH
      );
      if (response.isUpdateSuccessful) {
        dispatch(
          countdownActions.setCountDown({ countdown: response.updatedData })
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
      dispatch(countdownActions.setIsLoading({ isLoading: false }));
    }
  };
};
