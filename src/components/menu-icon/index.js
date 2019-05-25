import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const MenuIcon = styled.div`
  background-color: ${theme('shadow', 'off')};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  height: 32px;
  text-align: center;
  transition-duration: 100ms;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  user-select: none;
  width: 32px;

  :active,
  :hover {
    background-color: ${theme('shadow', 'low')};
  }

  :active:hover {
    background-color: ${theme('shadow', 'high')};
  }
`;

export default MenuIcon;
