import React, { Component } from 'react';
import css from './App.module.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';

export class App extends Component {
  state = {
    query: '',
    largeImageURL: '',
  };

  onSubmit = ({ newQuery }) => {
    this.setState({ query: newQuery });
  };

  handleImageClick = image => {
    console.log(image);
    this.setState({ largeImageURL: image });
  };

  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { query } = this.state;
    console.log(!!this.state.largeImageURL.length);

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.query && (
          <ImageGallery query={query} onImageClick={this.handleImageClick} />
        )}
        {this.state.largeImageURL && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt="XXX" />
          </Modal>
        )}
      </div>
    );
  }
}
