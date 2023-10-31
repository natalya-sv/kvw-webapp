export const truncateString = (longString, length) => {
  return longString.length > length
    ? longString.substring(0, length) + "..."
    : longString;
};
