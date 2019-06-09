import Gutter from '../gutter';
import Line from '../line';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Time = styled.div`
  font: ${theme('typeface', 'paragraph')};
  font-size: 10px;
  line-height: 16px;
  opacity: 0.5;
  transition-duration: 100ms;
  transition-property: opacity;
  transition-timing-function: ease-in-out;

  ${Line} ${Gutter} & {
    opacity: 0;
  }

  ${Line}:hover ${Gutter} & {
    opacity: 0.5;
  }
`;

export default Time;
