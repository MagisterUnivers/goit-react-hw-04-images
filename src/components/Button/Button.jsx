import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';
export const Button = ({ clickHandler }) => (
  <StyledButton onClick={clickHandler}>Load More</StyledButton>
);

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};
