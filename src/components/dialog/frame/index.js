import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Frame = styled.div`
  align-items: stretch;
  background-color: ${theme('color', 'primary', 'background')};
  border-color: ${theme('color', 'primary', 'border')};
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  color: ${theme('color', 'primary', 'foreground')};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-height: 80%;
  max-width: 80%;
  min-height: 180px;
  min-width: 240px;
`;

export default Frame;
