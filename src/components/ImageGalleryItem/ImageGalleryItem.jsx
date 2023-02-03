import React from 'react';

const ImageGalleryItem = ({ image, id, onImageClick }) => {
  const handleClick = e => {
    onImageClick(e.currentTarget.id);
  };

  return <img src={image} alt="take" onClick={handleClick} id={id} />;
};

export default ImageGalleryItem;
