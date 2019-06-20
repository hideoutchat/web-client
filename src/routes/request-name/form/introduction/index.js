import styled, { keyframes } from 'styled-components';
import theme from '/utilities/styled/theme';

const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Introduction = styled.div`
  animation-duration: 1s;
  animation-name: ${FadeIn};
  background-color: ${theme('highlight', 'low')};
  border-radius: ${theme('space', 'normal')};
  margin-bottom: ${theme('space', 'huge')};
  padding: ${theme('space', 'normal')};

  p {
    margin: ${theme('space', 'normal')} 0;
    padding: 0;
  }
`;

export default Introduction;
