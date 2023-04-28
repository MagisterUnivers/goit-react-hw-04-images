import PropTypes from 'prop-types';
import {
  StyledImageGalleryItem,
  StyledImageGalleryItemImage,
} from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({
  imageUrl,
  altText,
  largeImageUrl,
  clickHandler,
}) => {
  return (
    <StyledImageGalleryItem
      onClick={() => clickHandler(largeImageUrl, altText)}
    >
      <StyledImageGalleryItemImage src={imageUrl} alt={altText} />
    </StyledImageGalleryItem>
  );
};
ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
