import styled, { keyframes } from 'styled-components';

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
  margin-bottom: ${(props) => props.theme.space.huge};
  text-align: center;

  p {
    margin: 0 0 ${(props) => props.theme.space.normal};
    padding: 0;
  }
`;

export default Introduction;
