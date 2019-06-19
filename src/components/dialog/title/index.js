import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Title = styled.div`
  color: ${theme('color', 'action', 'border')};
  font: ${theme('typeface', 'title')};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

export default Title;
