import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Screen = styled.div`
  align-items: center;
  background-color: ${theme('color', 'primary', 'background')};
  background: ${theme('gradient', 'screen')};
  border-radius: 4px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.5);
  color: ${theme('color', 'primary', 'foreground')};
  display: flex;
  flex: 1;
  flex-direction: column;
  font: ${theme('typeface', 'normal')};
  height: 80%;
  overflow: hidden;
  margin: 32px auto;
  padding: ${theme('space', 'large')};
  max-width: 80%;
  min-width: 28%;
`;

export default Screen;
