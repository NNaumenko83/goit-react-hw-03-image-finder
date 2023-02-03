import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import { getPhotos } from '../../services/api';
import { ImageGalleryList } from './ImageGallery.styled';
import Loader from '../Loader';

class ImageGallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalPages: null,
    isLoading: false,
  };

  async componentDidMount() {
    console.log('componentDidMount');
    this.setState({ query: this.props.query });
  }

  async componentDidUpdate(_, prevState) {
    console.log('componentDidUpdate');

    if (this.state.query !== prevState.query) {
      try {
        this.setState({ isLoading: true });
        const response = await getPhotos(this.state.query, this.state.page);
        const totalPages = Math.ceil(response.totalHits / 12);

        const imagesArray = response.hits;

        this.setState({
          images: imagesArray.map(image => ({
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
          })),
          totalPages: totalPages,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }

      return;
    }

    if (prevState.page !== this.state.page) {
      try {
        this.setState({ isLoading: true });
        const response = await getPhotos(this.state.query, this.state.page);
        const newImagesArray = response.hits.map(image => ({
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
        }));

        this.setState(prevState => ({
          images: [...prevState.images, ...newImagesArray],
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
      return;
    }

    if (this.state.query !== this.props.query) {
      this.setState({
        query: this.props.query,
        page: 1,
        images: [],
        totalPages: null,
      });
      return;
    }

    return;
  }

  handleBattonClick = () => {
    if (this.state.totalPages === this.state.page) {
      console.log('UPS!!!!!!!!!!!!!');
      return;
    }
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onImageClick = id => {
    console.log(this.state.images.find(image => image.id === +id));

    this.props.onImageClick(
      this.state.images.find(image => image.id === +id).largeImageURL
    );
  };

  render() {
    return (
      <>
        <ImageGalleryList>
          {this.state.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image.webformatURL}
              id={image.id}
              onImageClick={id => {
                this.onImageClick(id);
              }}
            />
          ))}
        </ImageGalleryList>
        {this.state.isLoading && <Loader />}
        {this.state.totalPages > 1 && (
          <Button
            onClick={this.handleBattonClick}
            disabled={this.state.totalPages === this.state.page}
          />
        )}
      </>
    );
  }
}

export default ImageGallery;
