export const getEmbeddedUrl = (url) => {
  let editedUrl = "";

  if (url) {
    const newUrl = url.replace(
      "https://youtu.be/",
      "https://www.youtube.com/embed/"
    );
    editedUrl = newUrl.concat("?rel=0");
  }

  return editedUrl;
};
