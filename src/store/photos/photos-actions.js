import { photosActions } from "./photos-slice";
import {
  FOLDERS_GET,
  ALBUMS_GET,
  FOLDERS_POST,
  FOLDERS_PUBLISH,
  DELETE_ONE,
  FOLDERS_DELETE_ALL,
  ALBUMS_POST,
  ALBUMS_DELETE_ALL,
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
import {
  ERROR_MESSAGE,
  ERROR_FETCHING,
  SUCCESS_UPDATE_API,
  ERROR_UPDATING,
} from "../constants";
import { notificationActions } from "../notification/notification-slice";

export const addNewFolderItem = (newFolder) => {
  return async (dispatch) => {
    dispatch(photosActions.setIsLoading({ isLoading: true }));

    try {
      const response = await addNewItem(
        newFolder,
        FOLDERS_POST,
        FOLDERS_PUBLISH
      );

      if (response) {
        dispatch(photosActions.addNewFolder({ newFolder: response.newItem }));
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
      dispatch(photosActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const fetchPhotoFolders = () => {
  return async (dispatch) => {
    try {
      dispatch(photosActions.setIsLoading({ isLoading: true }));
      const responseAlbums = await fetchData(ALBUMS_GET);
      const responseFolders = await fetchData(FOLDERS_GET);

      if (responseFolders && responseFolders) {
        dispatch(
          photosActions.setFolders({
            folders: responseFolders,
            albums: responseAlbums,
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
      dispatch(photosActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const editFolder = (editedFolderData) => {
  return async (dispatch) => {
    dispatch(photosActions.setIsLoading({ isLoading: true }));
    try {
      const response = await updateSingleItem(
        editedFolderData.id,
        editedFolderData,
        PUT,
        FOLDERS_PUBLISH
      );

      if (response) {
        dispatch(
          photosActions.updateFolder({ editedFolderData: response.updatedData })
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
      dispatch(photosActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeFolders = (ids, deleteAll) => {
  return async (dispatch) => {
    dispatch(photosActions.setIsLoading({ isLoading: true }));
    try {
      let response;
      if (deleteAll) {
        response = await removeAllItems(FOLDERS_DELETE_ALL, FOLDERS_PUBLISH);
      } else {
        response = await removeSeveralItems(ids, DELETE_ONE, FOLDERS_PUBLISH);
      }
      if (response) {
        dispatch(photosActions.removeFolders({ ids, deleteAll }));
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
      dispatch(photosActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const addNewAlbum = (album) => {
  return async (dispatch) => {
    dispatch(photosActions.setIsLoading({ isLoading: true }));
    try {
      const response = await addNewItem(album, ALBUMS_POST, FOLDERS_PUBLISH);
      if (response.isUpdateSuccessful) {
        dispatch(photosActions.addNewAlbum({ newAlbum: response.newItem }));
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
      dispatch(photosActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeAlbum = (id) => {
  return async (dispatch) => {
    dispatch(photosActions.setIsLoading({ isLoading: true }));
    try {
      const response = await removeSingleItem(id, DELETE_ONE, FOLDERS_PUBLISH);

      if (response) {
        dispatch(photosActions.removeAlbum({ id: id }));
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
      dispatch(photosActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const editAlbum = (album) => {
  return async (dispatch) => {
    dispatch(photosActions.setIsLoading({ isLoading: true }));

    try {
      const response = await updateSingleItem(
        album.id,
        album,
        PUT,
        FOLDERS_PUBLISH
      );
      if (response.isUpdateSuccessful) {
        dispatch(photosActions.editAlbum({ editedAlbum: album }));
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
      dispatch(photosActions.setIsLoading({ isLoading: false }));
    }
  };
};
export const removeAlbums = (albumsIds, deleteAll) => {
  return async (dispatch) => {
    dispatch(photosActions.setIsLoading({ isLoading: true }));
    try {
      let response;
      if (deleteAll) {
        response = await removeAllItems(ALBUMS_DELETE_ALL, FOLDERS_PUBLISH);
      } else {
        response = await removeSeveralItems(
          albumsIds,
          DELETE_ONE,
          FOLDERS_PUBLISH
        );
      }
      if (response) {
        removeAlbums({ ids: albumsIds, deleteAll });
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
      dispatch(photosActions.setIsLoading({ isLoading: false }));
    }
  };
};
