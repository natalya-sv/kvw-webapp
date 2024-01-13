const ImageView = ({ image, width, height, text }) => {
  return (
    <img
      src={image}
      srcSet={image}
      alt={text}
      loading="lazy"
      width={width}
      height={height}
    />
  );
};
export default ImageView;
