import { useState, useEffect } from 'react';
import * as API from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGellary from './imageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export const App = () => {
  const [searchQuerry, setSearchQuerry] = useState('');
  const [totalImgFind, setTotalImgFind] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImgUrl, setCurrentImgUrl] = useState('');
  const [currentImgTag, setCurrentImgTag] = useState('');

  useEffect(() => {
    if (!searchQuerry) {
      return;
    }
    const getImages = async () => {
      try {
        const data = await API.fetchImages(searchQuerry, page);
        const totalHits = data.totalHits;
        const images = data.hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return {
              id,
              largeImageURL,
              webformatURL,
              tags,
            };
          }
        );

        if (images.length === 0) {
          throw new Error('Not find. Please, enter another request');
        }

        setGallery(prev => [...prev, ...images]);
        setTotalImgFind(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    setTimeout(() => {
      getImages();
    }, 300);
  }, [searchQuerry, page]);

  const handleSubmit = querry => {
    if (searchQuerry !== querry) {
      setSearchQuerry(querry);
      setGallery([]);
      setPage(1);
      setError(null);
    }
  };

  const loadMoreImages = () => {
    setPage(prev => prev + 1);
  };

  const onModalOpen = (url, tag) => {
    setCurrentImgUrl(url);
    setCurrentImgTag(tag);
  };

  const onModalClose = () => {
    setCurrentImgUrl('');
    setCurrentImgTag('');
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGellary images={gallery} error={error} onClick={onModalOpen} />
      {gallery.length > 0 && gallery.length < totalImgFind && (
        <Button onClick={loadMoreImages} />
      )}
      {isLoading && <Loader isLoading={isLoading} />}
      {currentImgUrl && (
        <Modal
          closeModal={onModalClose}
          url={currentImgUrl}
          tag={currentImgTag}
        />
      )}
    </div>
  );
};
