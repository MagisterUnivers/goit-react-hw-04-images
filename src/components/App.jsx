import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Spinner from './Loader';
import Modal from './Modal/Modal';
import { getPictures } from '../utils/pixabayAPI';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const perPage = 12;

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    getPictures(query, currentPage, perPage)
      .then(response => {
        setImages(prevState => [...prevState, ...response.data.hits]);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [query, currentPage, perPage]);

  const handleSearchSubmit = searchQuery => {
    setQuery(searchQuery);
    setImages([]);
    setCurrentPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setCurrentPage(prevState => prevState + 1);
  };

  const handleImageClick = image => {
    console.log(image);
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    console.log(selectedImage);
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />

      {error && <p>Oops, something went wrong: {error}</p>}

      <ImageGallery images={images} onImageClick={handleImageClick} />

      {isLoading && <Spinner />}

      {!isLoading &&
        images.length >= perPage &&
        images.length % perPage === 0 && <Button onClick={handleLoadMore} />}

      {!isLoading &&
        images.length >= perPage &&
        images.length % perPage !== 0 && <p>Картинки закончились</p>}

      {selectedImage && (
        <Modal onClose={handleModalClose}>
          <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
        </Modal>
      )}
    </div>
  );
}

export default App;
