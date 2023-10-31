import { createSlice } from "@reduxjs/toolkit";
const photosSlice = createSlice({
  name: "photos",
  initialState: {
    folders: [],
    albums: [],
    isLoading: false,
  },

  reducers: {
    setFolders(state, action) {
      const folders = action.payload.folders.map((folder) => {
        return {
          id: folder.id,
          year: folder.year,
          folderCoverPhoto: folder.folder_cover_photo,
          albums: [],
        };
      });
      const albums = action.payload.albums.map((album) => {
        return {
          id: album.id,
          title: album.title,
          albumCoverPhoto: album.album_cover_photo,
          albumLink: album.album_link,
          folderId: album.folder_id,
        };
      });

      state.folders = folders;
      state.albums = albums;
    },

    addNewFolder(state, action) {
      const { id, year, folder_cover_photo } = action.payload.newFolder;
      const newFolder = {
        id: id,
        year: year,
        folderCoverPhoto: folder_cover_photo,
        albums: [],
      };
      state.folders.push(newFolder);
    },
    removeFolder(state, action) {
      state.folders = state.folders.filter(
        (folderItem) => folderItem.id !== action.payload.id
      );
    },
    removeFolders(state, action) {
      const { deleteAll, ids } = action.payload;
      if (deleteAll) {
        state.folders = [];
      } else {
        state.folders = state.folders.filter(
          (folder) => !ids.includes(folder.id)
        );
      }
    },
    updateFolder(state, action) {
      const { id, year, folder_cover_photo } = action.payload.editedFolderData;
      state.folders = state.folders.map((f) => {
        if (f.id === id) {
          return {
            ...f,
            year: year,
            folderCoverPhoto: folder_cover_photo,
          };
        }
        return f;
      });
    },
    addNewAlbum(state, action) {
      const { id, title, album_link, album_cover_photo, folder_id } =
        action.payload.newAlbum;
      const newAlbum = {
        id: id,
        title: title,
        albumLink: album_link,
        albumCoverPhoto: album_cover_photo,
        folderId: folder_id,
      };

      state.albums.push(newAlbum);
    },

    removeAlbum(state, action) {
      state.albums = state.albums.filter(
        (album) => album.id !== action.payload.album.id
      );
    },
    removeAlbums(state, action) {
      const { ids, deleteAll } = action.payload;
      if (deleteAll) {
        state.albums = [];
      } else {
        state.albums = state.albums.filter((album) => !ids.includes(album.id));
      }
    },
    editAlbum(state, action) {
      const { id, title, album_link, album_cover_photo, folder_id } =
        action.payload.editedAlbum;
      const updatedAlbum = {
        id: id,
        title: title,
        albumLink: album_link,
        albumCoverPhoto: album_cover_photo,
        folderId: folder_id,
      };

      const index = state.albums.findIndex((album) => album.id === id);
      if (index !== -1) {
        state.albums[index] = updatedAlbum;
      }
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
  },
});
export const photosActions = photosSlice.actions;
export default photosSlice;
