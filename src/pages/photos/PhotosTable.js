import React, { useMemo } from "react";
import CollapsableTable from "../../components/table/CollapsableTable";
import {
  ALBUMS_TITLE,
  albumsTableDefinition,
  subRowAlbumsDefinition,
} from "./constants";
import { truncateString } from "../../helpers/utils";
const PhotosTable = ({
  folders,
  albums,
  setSelectedFolder,
  handleOpenFolderModal,
  setSelectedFolderId,
  handleOpenAddEditAlbumDialog,
  setSelectedAlbum,
}) => {
  const updatedFolders = useMemo(() => {
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

  //delete folders and albums that belong to these folders
  const handleRemoveFolders = (idsToRemove) => {
    const deleteAllFolders = updatedFolders.length === idsToRemove.length;
    if (deleteAllFolders) {
      // removeFolders(idsToRemove, true)
      const albumsToRemove = albums.map((album) => album.id);
      // removeAlbums(albumsToRemove, true)
    } else {
      const albumsToDelete = albums
        .filter((al) => idsToRemove.includes(al.folderId))
        .map((a) => a.id);
      // removeFolders(idsToRemove, false);
      // removeAlbums(albumsToDelete, false);
    }
  };

  const handleEditFolder = (folderId) => {
    const folder = folders.find((f) => f.id === folderId);
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
    setSelectedFolderId(folderId);

    const album = albums.find((a) => a.id === albumId);
    if (album) {
      setSelectedAlbum(album);
      handleOpenAddEditAlbumDialog();
    }
  };

  const handleRemoveAlbum = (albumId) => {
    // removeAlbum(albumId);
  };

  return (
    <CollapsableTable
      items={updatedFolders}
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
  );
};
export default PhotosTable;
