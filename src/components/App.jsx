/**
 * Components
 */
import { Modal } from './Modal/Modal';
import { getPictures } from 'utils/pixabayAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { StyledSection } from './App.styled';
/**
 * Libraries
 */
import { Component } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
export class App extends Component {
  state = {
    modalShown: false,
    images: [],
    searchQuery: '',
    totalImageCount: 0,
    page: 1,
    perPage: 12,
    currentImage: {
      largeImageUrl: '',
      alt: '',
    },
    isLoading: false,
    error: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.getData();
    }
    if (
      this.state.totalImageCount === this.state.images.length &&
      this.state.totalImageCount !== 0 &&
      prevState.images.length !== this.state.images.length
    ) {
      console.log(this.state.totalImageCount, this.state.images.length);
      toast(`That's all images on this request 😥`);
    }
  }
  /**
   * Own functions
   */
  getData = () => {
    const { page, perPage, searchQuery } = this.state;
    this.setState({ isLoading: true });
    getPictures(searchQuery, page, perPage)
      .then(({ data }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
        this.setState({ totalImageCount: data.totalHits });
        if (page === 1) {
          toast(`Wow! We found ${data.totalHits} images for you 😍`);
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  };
  onSearchSubmit = e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchInput.value;
    this.setState({
      searchQuery,
      images: [],
      page: 1,
    });
  };
  onLoadMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  toggleModal = (largeImageUrl, alt) => {
    this.setState(prevState => ({ modalShown: !prevState.modalShown }));
    this.setState({ currentImage: { largeImageUrl, alt } });
  };
  render() {
    return (
      <div>
        <Searchbar formSubmitHandler={this.onSearchSubmit} />

        {this.state.isLoading && (
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
        {this.state.images.length > 0 && (
          <StyledSection>
            <ImageGallery
              data={this.state.images}
              onItemClick={this.toggleModal}
            />
            {this.state.images.length !== this.state.totalImageCount && (
              <Button clickHandler={this.onLoadMoreBtnClick} />
            )}
          </StyledSection>
        )}
        {this.state.modalShown && (
          <Modal onClose={this.toggleModal}>
            <img
              src={this.state.currentImage.largeImageUrl}
              alt={this.state.currentImage.alt}
            />
          </Modal>
        )}

        <ToastContainer />
      </div>
    );
  }
}
