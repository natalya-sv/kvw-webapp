import React, { useMemo } from "react";
import {
  ALBUMS_TITLE,
  NO_PHOTOS,
  albumsTableDefinition,
  subRowAlbumsDefinition,
} from "./constants";
import { truncateString } from "../../helpers/utils";
import {
  FOLDERS_ACTIONS,
  PHOTOS_TAG,
  ALBUM_TAG,
  ALBUMS_ACTIONS,
} from "../../APIData";
import { Typography } from "@mui/material";
import MainTable from "../../components/table/MainTable";

const PhotosTable = ({
  folders,
  albums,
  setSelectedFolder,
  handleOpenFolderModal,
  setSelectedFolderId,
  handleOpenAddEditAlbumDialog,
  setSelectedAlbum,
  deleteData,
  successUpdating,
}) => {
  const mergedFoldersAndAlbums = useMemo(() => {
    if (folders && albums) {
      const photos = folders.map((folder) => {
        const folderAlbums = albums
          .filter((alb) => alb.folder_id === folder.id)
          .map((album) => {
            return {
              id: album.id,
              title: album.title,
              albumCoverPhoto: album.album_cover_photo,
              albumLink: album.album_link,
              folderId: album.folder_id,
              truncatedText: album.album_link
                ? truncateString(album.album_link, 70)
                : "",
            };
          });
        return {
          id: folder.id,
          year: folder.year,
          folderCoverPhoto: folder.folder_cover_photo,
          albums: [...folderAlbums],
          nrOfAlbums: folderAlbums.length,
        };
      });
      return photos;
    }
    return [];
  }, [folders, albums]);

  const handleRemoveFolders = (idsToRemove) => {
    deleteData({
      deletedItems: idsToRemove,
      actions: FOLDERS_ACTIONS,
      tag: PHOTOS_TAG,
    });
  };

  const handleEditFolder = (folderId) => {
    const folder = mergedFoldersAndAlbums.find((f) => f.id === folderId);
    if (folder) {
      setSelectedFolder(folder);
      handleOpenFolderModal();
    }
  };

  const handleAddNewAlbum = (folderId) => {
    setSelectedFolderId(folderId);
    handleOpenAddEditAlbumDialog();
  };

  const handleEditAlbum = (albumId, folderId) => {
    const folder = mergedFoldersAndAlbums.find((f) => f.id === folderId);
    const album = folder.albums.find((a) => a.id === albumId);
    if (album) {
      setSelectedFolderId(folderId);
      setSelectedAlbum(album);
      handleOpenAddEditAlbumDialog();
    }
  };

  const handleRemoveAlbum = (albumId) => {
    deleteData({
      deletedItems: [albumId],
      actions: ALBUMS_ACTIONS,
      tag: ALBUM_TAG,
    });
  };

  return mergedFoldersAndAlbums && mergedFoldersAndAlbums.length > 0 ? (
    <MainTable
      items={mergedFoldersAndAlbums}
      tableDefinition={albumsTableDefinition}
      onRemoveItems={handleRemoveFolders}
      onEditItem={handleEditFolder}
      subRowItemsDefinition={subRowAlbumsDefinition}
      subTableTitle={ALBUMS_TITLE}
      subTableListName={"albums"}
      onAddNewSubRowItem={handleAddNewAlbum}
      onEditSubRowItem={handleEditAlbum}
      onRemoveSubRowItem={handleRemoveAlbum}
      successUpdating={successUpdating}
    />
  ) : (
    <Typography>{NO_PHOTOS}</Typography>
  );
};
export default PhotosTable;
