import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';
export const ImageGallery = ({ data, onItemClick }) => {
  return (
    <StyledImageGallery>
      {data.map(element => {
        return (
          <ImageGalleryItem
            key={element.id}
            imageUrl={element.webformatURL}
            largeImageUrl={element.largeImageURL}
            altText={element.tags}
            clickHandler={onItemClick}
          />
        );
      })}
    </StyledImageGallery>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  onItemClick: PropTypes.func.isRequired,
};
