import Action from '../action';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const PrimaryAction = styled(Action)`
  background-color: ${theme('color', 'action', 'background')};
  border-color: ${theme('color', 'action', 'borderInactive')};
  text-decoration: none;

  :active,
  :hover {
    border-color: ${theme('color', 'action', 'border')};
  }

  :active:hover {
    background-color: ${theme('color', 'action', 'border')};
    border-color: ${theme('color', 'action', 'border')};
    color: ${theme('color', 'primary', 'background')};
  }
`;

export default PrimaryAction;
