import axios from 'axios';

const API_KEY = '34815242-39bc1251e4e5bf62a3fd3d06c';
export const getPictures = (searchValue, page, perPage) =>
  axios.get(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
