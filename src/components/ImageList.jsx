import React from 'react';

const ImageList = ({ images }) => {
  return (
    <ul>
      {images.map(image => (
        <li key={image.id}>
          <img src={image.previewURL} alt={image.tags} />
        </li>
      ))}
    </ul>
  );
};

export default ImageList;
