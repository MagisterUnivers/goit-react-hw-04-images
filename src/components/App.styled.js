import styled from 'styled-components';
export const StyledSection = styled.section`
  display: flex;
  flex-direction: ${props => (props.$loader ? 'raw' : 'column')};
  justify-content: center;
`;
