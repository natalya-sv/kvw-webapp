import { DATE, SPONSORS } from "../../helpers/constants";

export const GROUPS = "Groepen";
export const GROUP_NAME = "Groep Naam";
export const GROUPS_DESC = "Hier kun je groepen toevoegen en aanpassen";
export const NO_GROUPS_YET = "Nog geen groepen";

//Table columns data
export const DAY_SCHEDULE = "Dag rooster";
export const NUMBER_OF_DAYS = "Aantal evenementen";
export const START_DATE = "Begin datum";
export const END_DATE = "Einddatum";
export const PROGRAMMA = "Programma";
export const START_TIME = "Starttijd";
export const END_TIME = "Eindtijd";
export const EXTRA = "Extra";
export const START_LOCATION = "Openingslocatie";
export const END_LOCATION = "Sluitingslocatie";
export const DAY_SPONSORS = "Kies dag sponsoren";

//table actions
export const ADD_NEW_GROUP = "Nieuwe groep creeren";
export const ADD_DAY = "Dag Toevoegen";
export const ADD_GROUP_NAME = "Groep naam";
export const EDIT_GROUP_NAME = "Groep naam bewerken";
export const ADD_NEW_DAY = "Nieuwe Dag Toevoegen";
export const EDIT_DAY = "Dag Bewerken";
export const REMOVE_DAY = "Dag Verwijderen";
export const SCHEDULE_BOOK_URL = "Groepsdraaiboeken url";
export const groupsTableDefinition = [
  {
    id: "empty",
    label: "",
    type: "empty",
  },
  {
    id: "groupName",
    label: GROUP_NAME,
    type: "text",
  },
  {
    id: "days",
    label: NUMBER_OF_DAYS,
    type: "text",
  },
];
export const subRowItemsDefinition = [
  { id: "date", label: DATE, type: "date" },
  { id: "startTime", label: START_TIME, type: "text" },
  { id: "endTime", label: END_TIME, type: "text" },
  {
    id: "startLocation",
    label: START_LOCATION,
    type: "text",
  },
  {
    id: "endLocation",
    label: END_LOCATION,
    type: "text",
  },
  {
    id: "extraInfo",
    label: EXTRA,
    type: "text",
  },
  {
    id: "programma",
    label: PROGRAMMA,
    type: "text",
  },
  {
    id: "namedSponsors",
    label: SPONSORS,
    type: "array",
  },
];
