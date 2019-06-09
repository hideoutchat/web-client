import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Message = styled.div`
  animation-duration: 100ms;
  animation-name: ${fadeIn};
`;

export default Message;
