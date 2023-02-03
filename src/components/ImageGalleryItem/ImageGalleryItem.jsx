import React from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, id, onImageClick }) => {
  const handleClick = e => {
    onImageClick(e.currentTarget.id);
  };

  return (
    <ImageItem>
      <Image src={image} alt="take" onClick={handleClick} id={id} />
    </ImageItem>
  );
};

export default ImageGalleryItem;
