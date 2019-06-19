import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Content = styled.div`
  flex: 1;
  font: ${theme('typeface', 'paragraph')};
  overflow: auto;
  padding: 8px;
`;

export default Content;
