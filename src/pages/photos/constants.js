export const NUMBER_OF_ALBUMS = "Aantal albums";
export const YEAR = "Jaar";
export const COVER_PHOTO = "Cover foto";
export const ALBUM_PHOTO = "Album foto";
export const LINK = "Link";
export const PHOTOS_PAGE_TITLE = "Foto's";
export const PHOTOS_PAGE_DESCRIPTION = "U kunt hier fotoalbums toevoegen";
export const FOLDER_TITLE_TOOLTIP = "Folder titel bewerken";
export const ADD_NEW_ALBUM = "Album toevoegen";
export const EDIT_ALBUM = "Album bewerken";
export const ALBUMS_TITLE = "Albums";
export const COVER_PHOTO_LINK = "Omslagfoto link";
export const ALBUM_LINK = "Album link";
export const TITLE = "Title";
export const ADD_NEW_FOLDER = "Nieuwe folder toevoegen";
export const FOLDER_TITLE = "Jaar";
export const FOLDER_COVER_PHOTO_TITLE = "Folder omslagfoto link";
export const NO_PHOTOS = "Er zijn nog geen foto albums";
export const albumsTableDefinition = [
  {
    id: "empty",
    label: "",
    type: "empty",
  },
  {
    id: "year",
    label: YEAR,
    type: "text",
  },
  {
    id: "folderCoverPhoto",
    label: COVER_PHOTO,
    type: "image",
  },
  {
    id: "nrOfAlbums",
    label: NUMBER_OF_ALBUMS,
    type: "text",
  },
];
export const subRowAlbumsDefinition = [
  {
    id: "title",
    label: TITLE,
    type: "text",
  },
  {
    id: "albumCoverPhoto",
    label: ALBUM_PHOTO,
    type: "image",
  },
  {
    id: "truncatedText",
    label: LINK,
    type: "text",
  },
];
