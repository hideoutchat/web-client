import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Screen = styled.div`
  align-items: center;
  background-color: ${theme('color', 'primary', 'background')};
  background: ${theme('gradient', 'screen')};
  color: ${theme('color', 'primary', 'foreground')};
  display: flex;
  flex: 1;
  flex-direction: column;
  font: ${theme('typeface', 'normal')};
  overflow: hidden;
  padding: ${theme('space', 'large')};
`;

export default Screen;
