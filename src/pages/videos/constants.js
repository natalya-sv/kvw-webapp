import { DATE, TITLE } from "../../helpers/constants";

export const VIDEOS_PAGE_TITLE = "Video's";
export const VIDEOS_PAGE_DESCRIPTION =
  "Je kunt hier video's toevoegen die worden weergegeven in de app pagina - Media -> Video's";
export const VIDEO_TITLE = "Video titel";
export const VIDEO_DESCRIPTION = "Video beschrijving";
export const YOUTUBE_LINK = "YouTube Link";
export const NO_VIDEOS_YET = "Nog geen videos";
export const DESCRIPTION = "Beschrijving";
export const ADD_NEW_VIDEO = "Video toevoegen";
export const videosTableDefinitions = [
  {
    id: "title",
    label: TITLE,
    type: "text",
  },
  {
    id: "truncatedText",
    label: DESCRIPTION,
    type: "text",
  },
  {
    id: "youtubeLink",
    label: YOUTUBE_LINK,
    type: "text",
  },
  {
    id: "date",
    label: DATE,
    type: "date",
  },
];
