import { Component } from "react";
import * as API from '../services/api';
import Searchbar from "./Searchbar/Searchbar"
import ImageGellary from "./imageGallery/ImageGallery";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Modal from "./Modal/Modal";

export class App extends Component {

  state = {
    searchQuerry: "",
    totalImgFind: 0,
    gallery: [],
    page: 1,
    error: null,
    isLoading: false,
    currentImgUrl: "",
    currentImgTag: ""
  }

  componentDidUpdate(_, prevState) {
    const { page, searchQuerry } = this.state;
    if ( (searchQuerry && prevState.searchQuerry !== searchQuerry) || prevState.page !== page ) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.getImages(searchQuerry, page);
      }, 500)
      
    }
  }

  onModalOpen = (url, tag) => {
    this.setState({
      currentImgUrl: url,
      currentImgTag: tag
    })
  }

  onModalClose = () => {
    this.setState({
      currentImgUrl: "",
      currentImgTag: ""
    })
  } 

  getImages = async (searchQuerry, page) => {
    try {
      const data = await API.fetchImages(searchQuerry, page);
      const totalHits = data.totalHits;
      const images = data.hits.map(({ id, largeImageURL, webformatURL, tags }) => {
        return {
          id,
          largeImageURL,
          webformatURL,
          tags,
        }
      })
      
      this.setState(({ gallery }) => ({
        gallery: [...gallery, ...images],
        totalImgFind: totalHits
      }));
      
      if(images.length === 0) {
        alert("Not find. Please, enter another request");
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({isLoading: false});
    }
  }

  loadMoreImages = () => {
    this.setState(({page}) => {
        return {
            page: page + 1
        }
    })
  }

  handleSubmit = querry => {
    this.setState(({ searchQuerry }) => {
      if (querry !== searchQuerry)
      return {
        searchQuerry: querry,
        gallery: [],
        page: 1
      }
    });
  }

  render() {
    const { gallery, isLoading, currentImgUrl, currentImgTag, totalImgFind } = this.state;
    const { handleSubmit, loadMoreImages, onModalOpen, onModalClose } = this;
    
    return (
      <div style={{marginBottom:'15px'}}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGellary images={gallery} onClick={onModalOpen} />
        {gallery.length > 0 && gallery.length < totalImgFind && <Button onClick={loadMoreImages} />}
        {isLoading && <Loader isLoading={isLoading} />}
        {currentImgUrl && <Modal
            closeModal={onModalClose}
            url={currentImgUrl}
            tag={currentImgTag}
          />}
      </div>
    )
  }
}

