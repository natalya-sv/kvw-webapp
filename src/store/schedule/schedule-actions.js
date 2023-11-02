import { scheduleActions } from "./schedule-slice";
import {
  GROUPS_GET,
  GROUPS_POST,
  DELETE_ONE,
  GROUPS_PUBLISH,
  DAY_PROGRAMMES_GET,
  DAY_PROGRAMMES_POST,
  GROUPS_DELETE_ALL,
  DAY_PROGRAMMES_DELETE_ALL,
  GROUPS_PUBLISH_V2,
  PUT,
} from "../../APIData";
import {
  addNewItem,
  fetchData,
  removeSeveralItems,
  removeSingleItem,
  updateSingleItem,
  removeAllItems,
  publishScheduleV2,
} from "../api/apiHelper";
import { ERROR_MESSAGE } from "../constants";

export const addNewGroupItem = (newGroup) => {
  return async (dispatch) => {
    dispatch(scheduleActions.setIsLoading({ isLoading: true }));

    try {
      const response = await addNewItem(newGroup, GROUPS_POST, GROUPS_PUBLISH);
      const responseUpdateScheduleV2 = await publishScheduleV2(
        GROUPS_PUBLISH_V2
      );
      if (response && responseUpdateScheduleV2) {
        dispatch(
          scheduleActions.addNewGroup({
            newGroup: response.newItem,
          })
        );
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(scheduleActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const fetchGroupsData = () => {
  return async (dispatch) => {
    dispatch(scheduleActions.setIsLoading({ isLoading: true }));

    try {
      const response = await fetchData(GROUPS_GET);
      const responseUpdateScheduleV2 = await publishScheduleV2(
        GROUPS_PUBLISH_V2
      );
      if (response && responseUpdateScheduleV2) {
        const responseDays = await fetchData(DAY_PROGRAMMES_GET);
        if (responseDays) {
          dispatch(
            scheduleActions.setGroupsAndDays({
              groups: response,
              days: responseDays,
            })
          );
        }
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(scheduleActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeGroupItem = (groupIdToDelete) => {
  return async (dispatch) => {
    dispatch(scheduleActions.setIsLoading({ isLoading: true }));
    try {
      const response = await removeSingleItem(
        groupIdToDelete,
        DELETE_ONE,
        GROUPS_PUBLISH
      );
      const responseUpdateScheduleV2 = await publishScheduleV2(
        GROUPS_PUBLISH_V2
      );
      if (response && responseUpdateScheduleV2) {
        dispatch(
          scheduleActions.removeGroup({
            id: groupIdToDelete,
          })
        );
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(scheduleActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const updateGroupName = (updatedGroup) => {
  return async (dispatch) => {
    dispatch(scheduleActions.setIsLoading({ isLoading: true }));
    try {
      const response = await updateSingleItem(
        updatedGroup.id,
        updatedGroup,
        PUT,
        GROUPS_PUBLISH
      );
      const responseUpdateScheduleV2 = await publishScheduleV2(
        GROUPS_PUBLISH_V2
      );
      if (response && responseUpdateScheduleV2) {
        dispatch(scheduleActions.updateGroup(response.updatedData));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(scheduleActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeGroups = (ids, deleteAll) => {
  return async (dispatch) => {
    dispatch(scheduleActions.setIsLoading({ isLoading: true }));
    try {
      let response;
      if (deleteAll) {
        response = await removeAllItems(GROUPS_DELETE_ALL, GROUPS_PUBLISH);
      } else {
        response = await removeSeveralItems(ids, DELETE_ONE, GROUPS_PUBLISH);
      }
      const responseUpdateScheduleV2 = await publishScheduleV2(
        GROUPS_PUBLISH_V2
      );
      if (response && responseUpdateScheduleV2) {
        dispatch(scheduleActions.removeGroups({ ids, deleteAll }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(scheduleActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeDayItem = (dayIdToDelete) => {
  return async (dispatch) => {
    dispatch(scheduleActions.setIsLoading({ isLoading: true }));
    try {
      const response = await removeSingleItem(
        dayIdToDelete,
        DELETE_ONE,
        GROUPS_PUBLISH
      );
      const responseUpdateScheduleV2 = await publishScheduleV2(
        GROUPS_PUBLISH_V2
      );
      if (response && responseUpdateScheduleV2) {
        dispatch(scheduleActions.removeDay({ id: dayIdToDelete }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(scheduleActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const addNewDay = (day) => {
  return async (dispatch) => {
    dispatch(scheduleActions.setIsLoading({ isLoading: true }));
    try {
      const response = await addNewItem(
        day,
        DAY_PROGRAMMES_POST,
        GROUPS_PUBLISH
      );
      const responseUpdateScheduleV2 = await publishScheduleV2(
        GROUPS_PUBLISH_V2
      );
      if (response.isUpdateSuccessful && responseUpdateScheduleV2) {
        dispatch(scheduleActions.addNewDay({ newDay: response.newItem }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(scheduleActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const editDay = (day) => {
  return async (dispatch) => {
    dispatch(scheduleActions.setIsLoading({ isLoading: true }));

    try {
      const response = await updateSingleItem(day.id, day, PUT, GROUPS_PUBLISH);
      const responseUpdateScheduleV2 = await publishScheduleV2(
        GROUPS_PUBLISH_V2
      );
      if (response.isUpdateSuccessful && responseUpdateScheduleV2) {
        dispatch(scheduleActions.editDay({ editedDay: response.updatedData }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(scheduleActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeDays = (daysIds, deleteAll) => {
  return async (dispatch) => {
    dispatch(scheduleActions.setIsLoading({ isLoading: true }));
    try {
      let response;
      if (deleteAll) {
        response = await removeAllItems(
          DAY_PROGRAMMES_DELETE_ALL,
          GROUPS_PUBLISH
        );
      } else {
        response = await removeSeveralItems(
          daysIds,
          DELETE_ONE,
          GROUPS_PUBLISH
        );
      }
      const responseUpdateScheduleV2 = await publishScheduleV2(
        GROUPS_PUBLISH_V2
      );
      if (response && responseUpdateScheduleV2) {
        dispatch(scheduleActions.removeDays({ daysIds, deleteAll }));
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
    } finally {
      dispatch(scheduleActions.setIsLoading({ isLoading: false }));
    }
  };
};
