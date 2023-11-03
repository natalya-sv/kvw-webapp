export const SPONSORS = "Sponsoren";
export const SPONSOR_NAME = "Sponsor Naam";
export const SPONSOR_WEB = "Website";
export const SPONSOR_IMAGE = "Image Url";
export const SPONSOR_TYPE = "Type";
export const MAIN_SPONSOR = "Hoofdsponsor";
export const SPONSOR = "Sponsor";
export const ALL_SPONSORS_DESC =
  "Op deze pagina staan alle sponsoren van de afgelopen jaren. Je kunt een nieuwe sponsor toevoegen, verwijderen bewerken. Om sponsoren per jaar te kiezen, selecteer sponsoren en zet ze actief";
export const ACTIVE = "Set Actief";
export const NOT_ACTIVE = "Set Niet Actief";
export const STATUS = "Actief";
export const NO_SPONSORS_YET = "Er zijn nog geen sponsoren";
export const ADD_SPONSOR = "Sponsor toevoegen";
export const sponsorsTableDefinitions = [
  {
    id: "sponsorName",
    label: SPONSOR,
    type: "text",
  },
  {
    id: "websiteUrl",
    label: SPONSOR_WEB,
    type: "text",
  },
  {
    id: "type",
    label: SPONSOR_TYPE,
    type: "text",
  },
  {
    id: "imageUrl",
    label: SPONSOR_IMAGE,
    type: "image",
  },
  {
    id: "status",
    label: STATUS,
    type: "icon",
  },
];
