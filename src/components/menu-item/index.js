import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const MenuItem = styled.div`
  background-color: ${theme('shadow', 'off')};
  border-color: ${theme('color', 'primary', 'border')};
  border-style: solid;
  border-width: 0 0 1px 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font: ${theme('typeface', 'normal')};
  font-size: 12px;
  line-height: 32px;
  padding: 0 8px;
  text-align: left;
  transition-duration: 100ms;
  transition-property: background-color;
  transition-timing-function: ease-in-out;

  :last-of-type {
    border-width: 0;
  }

  :active,
  :hover {
    background-color: ${theme('shadow', 'low')};
  }

  :active:hover {
    background-color: ${theme('shadow', 'high')};
  }
`;

export default MenuItem;
