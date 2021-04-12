import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ hits, onClick }) => {
  console.log(hits);
  return (
    <ul className={styles.ImageGallery}>
      {hits.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem key={id} smallImage={webformatURL} largeImage={largeImageURL} onClick={onClick} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
