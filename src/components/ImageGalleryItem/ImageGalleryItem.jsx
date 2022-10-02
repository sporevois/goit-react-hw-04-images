import styles from "../ImageGalleryItem/ImageGalleryItem.module.css"
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
    return (
        <li className={styles.galleryItem}>
        <img className={styles.galleryImage}
          src={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL, tags)} />
        </li>
    )
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {    
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};