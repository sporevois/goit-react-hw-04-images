import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem"
import styles from "../imageGallery/imageGallery.module.css"
import PropTypes from 'prop-types';


const ImageGallery = ({ images, onClick }) => {
    return (
        <ul className={styles.gallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) =>
            (  < ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL = {largeImageURL}
                tags={tags}
                onClick={onClick}
            />
            ))}        
                
        </ul>
    )
}

export default ImageGallery;

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.exact({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired
    })),
    onClick: PropTypes.func.isRequired
};