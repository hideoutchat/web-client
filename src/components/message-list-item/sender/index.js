import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Sender = styled.div`
  color: ${theme('color', 'primary', 'bold')};
  font: ${theme('typeface', 'title')};
  margin-right: 8px;
  text-shadow: 1px 1px 0 ${theme('shadow', 'high')};
`;

export default Sender;
