import styled, { keyframes } from 'styled-components';

import theme from '/utilities/styled/theme';

const fadeInFromBelow = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Line = styled.div`
  align-items: flex-start;
  animation-duration: 100ms;
  animation-fill-mode: both;
  animation-name: ${fadeInFromBelow};
  background-color: ${theme('shadow', 'off')};
  display: flex;
  flex-direction: row;
  line-height: 16px;
  padding: 4px;
  transition-duration: 100ms;
  transition-property: background-color;
  transition-timing-function: ease-in-out;

  :active,
  :hover {
    background-color: ${theme('shadow', 'low')};
  }

  :active:hover {
    background-color: ${theme('shadow', 'high')};
  }
`;

export default Line;
