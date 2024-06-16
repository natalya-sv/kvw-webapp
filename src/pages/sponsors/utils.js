import {
  DAY_SPONSOR,
  MAIN_SPONSOR,
  MEDIA_SPONSOR,
  SPONSOR,
  STAR_SPONSOR,
} from "./constants";

export const getSponsorType = (name) => {
  switch (name) {
    case "main":
      return MAIN_SPONSOR;
    case "general":
      return SPONSOR;
    case "media-sponsor":
      return MEDIA_SPONSOR;
    case "day-sponsor":
      return DAY_SPONSOR;
    case "star-sponsor":
      return STAR_SPONSOR;
    default:
      return MAIN_SPONSOR;
  }
};
