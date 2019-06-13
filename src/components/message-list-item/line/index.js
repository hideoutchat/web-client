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
  display: flex;
  flex-direction: row;
  line-height: 16px;
  padding: 4px;
`;

export default Line;
