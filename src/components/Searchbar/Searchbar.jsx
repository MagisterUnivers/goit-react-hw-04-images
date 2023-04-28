import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import {
  StyledSearchbar,
  StyledSearchForm,
  StyledSearchFormButton,
  StyledSearchFormInput,
} from './Searchbar.styled';
export const Searchbar = ({ formSubmitHandler }) => {
  return (
    <StyledSearchbar>
      <StyledSearchForm onSubmit={formSubmitHandler}>
        <StyledSearchFormButton type="submit">
          <IconContext.Provider value={{ size: '18px' }}>
            {' '}
            <AiOutlineSearch />
          </IconContext.Provider>
        </StyledSearchFormButton>

        <StyledSearchFormInput
          name="searchInput"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledSearchForm>{' '}
    </StyledSearchbar>
  );
};

Searchbar.propTypes = {
  formSubmitHandler: PropTypes.func,
};
