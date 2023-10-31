import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollapsableTable from "../../components/table/CollapsableTable";
import {
  ALBUMS_TITLE,
  albumsTableDefinition,
  subRowAlbumsDefinition,
} from "./constants";
import {
  removeAlbum,
  removeAlbums,
  removeFolders,
} from "../../store/photos/photos-actions";
import { truncateString } from "../../helpers/utils";
const PhotosTable = (props) => {
  const { folders, albums } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const updatedFolders = useMemo(() => {
    if (folders && albums) {
      const photos = folders.map((folder) => {
        const folderAlbums = albums
          .filter((album) => album.folderId === folder.id)
          .map((alb) => {
            return {
              ...alb,
              truncatedText: truncateString(alb.albumLink, 70),
            };
          });
        return {
          ...folder,
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
      dispatch(removeFolders(idsToRemove, true));
      const albumsToRemove = albums.map((album) => album.id);
      dispatch(removeAlbums(albumsToRemove, true));
    } else {
      const albumsToDelete = albums
        .filter((al) => idsToRemove.includes(al.folderId))
        .map((a) => a.id);
      removeFolders(idsToRemove, false);
      removeAlbums(albumsToDelete, false);
    }
  };

  const handleEditFolder = (folderId) => {
    const folder = folders.find((f) => f.id === folderId);
    if (folder) {
      props.setSelectedFolder(folder);
      props.handleOpenFolderModal();
    }
  };

  const handleAddNewAlbum = (folderId) => {
    props.setSelectedFolderId(folderId);
    props.handleOpenAddEditAlbumDialog();
  };

  const handleEditAlbum = (albumId, folderId) => {
    props.setSelectedFolderId(folderId);

    const album = albums.find((a) => a.id === albumId);
    if (album) {
      props.setSelectedAlbum(album);
      props.handleOpenAddEditAlbumDialog();
    }
  };

  const handleRemoveAlbum = (albumId) => {
    dispatch(removeAlbum(albumId));
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
