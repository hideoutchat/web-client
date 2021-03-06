import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Screen = styled.div`
  align-items: stretch;
  background-color: ${theme('color', 'primary', 'background')};
  background: ${theme('gradient', 'screen')};
  border-radius: ${theme('space', 'small')};
  box-shadow: ${theme('space', 'tiny')} ${theme('space', 'tiny')} 1px ${theme('shadow', 'higher')};
  color: ${theme('color', 'primary', 'foreground')};
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: ${theme('space', 'huge')};
  min-width: 300px;
  overflow: hidden;

  ${({ theme }) => theme.transition('min-width')}
`;

export default Screen;
