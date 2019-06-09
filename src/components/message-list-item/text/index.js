import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Text = styled.div`
  font: ${theme('typeface', 'paragraph')};

  & ol li,
  & p,
  & ul li {
    margin: 0;
    padding: 0;
  }

  & ol,
  & ul {
    margin: 0 0 0 16px;
    padding: 0;
  }

  & a {
    color: ${theme('color', 'primary', 'link')};
  }

  & b,
  & strong {
    color: ${theme('color', 'primary', 'bold')};
  }

  & img {
    border-radius: 4px;
    margin: 8px 0;
  }
`;

export default Text;
