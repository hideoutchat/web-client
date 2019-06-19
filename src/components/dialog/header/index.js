import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 12px ${theme('space', 'normal')};
`;

export default Header;
