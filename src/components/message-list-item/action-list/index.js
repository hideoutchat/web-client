import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const ActionList = styled.div`
  margin-right: ${theme('space', 'normal')};
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

export default ActionList;
