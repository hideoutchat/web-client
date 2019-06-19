import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Action = styled.button`
  align-items: center;
  background: none;
  background-color: ${theme('shadow', 'off')};
  border-color: transparent;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  color: ${theme('color', 'primary', 'foreground')};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin: 0 0 0 16px;
  padding: 8px 16px;
  text-decoration: underline;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
  user-select: none;

  :active,
  :hover {
    background-color: ${theme('shadow', 'low')};
  }

  :active:hover {
    background-color: ${theme('shadow', 'high')};
  }

  ::-moz-focus-inner {
    border-width: 0;
  }
`;

export default Action;
