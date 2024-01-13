export const truncateString = (longString, length) => {
  return longString.length > length
    ? longString.substring(0, length) + "..."
    : longString;
};

export const replaceHttpByHttps = (httpLink) => {
  const isHttp = !httpLink.includes("https");
  if (isHttp) {
    return httpLink.replace("http", "https").trim();
  }
  return httpLink.trim();
};
