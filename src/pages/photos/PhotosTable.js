import React, { useMemo } from "react";
import CollapsableTable from "../../components/table/CollapsableTable";
import {
  ALBUMS_TITLE,
  NO_PHOTOS,
  albumsTableDefinition,
  subRowAlbumsDefinition,
} from "./constants";
import { truncateString } from "../../helpers/utils";
import {
  ALBUMS_ACTIONS,
  ALBUMS_TAG,
  ALBUM_TYPE,
  PHOTOS_ACTIONS,
  PHOTOS_TAG,
  FOLDER_TYPE,
} from "../../APIData";
import { Typography } from "@mui/material";

const PhotosTable = ({
  folders,
  albums,
  setSelectedFolder,
  handleOpenFolderModal,
  setSelectedFolderId,
  handleOpenAddEditAlbumDialog,
  setSelectedAlbum,
  deleteData,
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
              truncatedText: truncateString(album.album_link, 70),
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
      deletedItems: { items: idsToRemove, type: FOLDER_TYPE },
      actions: PHOTOS_ACTIONS,
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
      deletedItems: { item: albumId, type: ALBUM_TYPE },
      actions: PHOTOS_ACTIONS,
      tag: PHOTOS_TAG,
    });
  };

  return mergedFoldersAndAlbums && mergedFoldersAndAlbums.length > 0 ? (
    <CollapsableTable
      items={mergedFoldersAndAlbums}
      tableDefinition={albumsTableDefinition}
      buttons={["edit", "delete", "add"]}
      onRemoveItems={handleRemoveFolders}
      onEditItem={handleEditFolder}
      subRowItemsDefinition={subRowAlbumsDefinition}
      subTableTitle={ALBUMS_TITLE}
      subTableListName={"albums"}
      onAddNewSubRowItem={handleAddNewAlbum}
      onEditSubRowItem={handleEditAlbum}
      onRemoveSubRowItem={handleRemoveAlbum}
    />
  ) : (
    <Typography>{NO_PHOTOS}</Typography>
  );
};
export default PhotosTable;
