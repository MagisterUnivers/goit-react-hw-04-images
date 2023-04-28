/**
 * Libraries, services
 */
import { useCallback, useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { getPictures } from 'utils/pixabayAPI';
/**
 * Components
 */
import { Modal } from './Modal/Modal';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { StyledSection } from './App.styled';

export const App = () => {
  const [modalShown, setModalShown] = useState(false);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalImageCount, setTotalImageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(() => {
    setIsLoading(true);
    getPictures(searchQuery, page, perPage)
      .then(({ data }) => {
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalImageCount(data.totalHits);
        if (page === 1) {
          toast(`Wow! We found ${data.totalHits} images for you 😍`);
        }
      })
      .finally(() => setIsLoading(false));
  }, [page, perPage, searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    getData();
  }, [searchQuery, page, getData]);
  useEffect(() => {
    if (totalImageCount === images.length && totalImageCount !== 0) {
      toast(`That's all images on this request 😥`);
    }
  }, [images, totalImageCount]);

  /**
   * Own functions
   */
  const onSearchSubmit = e => {
    e.preventDefault();
    const searchValue = e.target.elements.searchInput.value;

    setSearchQuery(searchValue);
    setImages([]);
    setPage(1);
  };
  const onLoadMoreBtnClick = () => {
    setPage(prevState => prevState + 1);
  };
  const toggleModal = (largeImageUrl, alt) => {
    setModalShown(prevState => !prevState);
    setLargeImageUrl(largeImageUrl);
    setAlt(alt);
  };

  return (
    <div>
      <Searchbar formSubmitHandler={onSearchSubmit} />

      {isLoading && (
        <StyledSection $loader>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#3f51b5"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        </StyledSection>
      )}
      {images.length > 0 && (
        <StyledSection>
          <ImageGallery data={images} onItemClick={toggleModal} />
          {images.length !== totalImageCount && (
            <Button clickHandler={onLoadMoreBtnClick} />
          )}
        </StyledSection>
      )}
      {modalShown && (
        <Modal onClose={toggleModal}>
          <img src={largeImageUrl} alt={alt} />
        </Modal>
      )}

      <ToastContainer />
    </div>
  );
};
