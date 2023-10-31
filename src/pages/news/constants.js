import { DATE, TITLE } from "../../helpers/constants";

export const NEWS = "Nieuws";
export const NEWS_DESC =
  "Hier kun je nieuws plaatsen en verwijderen. De push bericht wordt ook gestuurd.";
export const NEWS_TITLE = "Nieuws Title";
export const NEWS_CONTENT = "Nieuws Content";
export const NO_NEWS_MESSAGE = "Er zijn geen vorige berichten/nieuws";
export const SEND_PUSH_MESSAGE = "Bericht Sturen";
export const PREVIOUS_NEWS = "Vorige berichten";
export const UPDATE_NEWSITEM = "Bericht bewerken";
export const IMAGE_URL_OPT = "Afbeelding URL(Optioneel)";
const CONTENT = "Content";
const IMAGE_URL = "Image URL";

export const newsTableDefinition = [
  {
    id: "title",
    label: TITLE,
    type: "text",
  },
  {
    id: "truncatedText",
    label: CONTENT,
    type: "text",
  },
  {
    id: "date",
    label: DATE,
    type: "date-time",
  },
  {
    id: "imageUrl",
    label: IMAGE_URL,
    type: "image",
  },
];
