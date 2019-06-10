import MenuIcon from '/components/menu-icon';
import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const StyledActionIcon = styled.div`
  background-color: #305090;
  border-radius: 50%;
  color: ${theme('color', 'action', 'foreground')};
  height: 2em;
  transform: scaleX(1) scaleY(1);

  ${({ theme }) => theme.transition('transform')}

  :active,
  :hover {
    transform: scaleX(1.1) scaleY(1.1);
  }

  :active:hover {
    transform: scaleX(1.2) scaleY(1.2);
  }
`;

const ActionIcon = ({ children }) => <StyledActionIcon>
  <MenuIcon>
    {children}
  </MenuIcon>
</StyledActionIcon>;

const { node } = PropTypes;

ActionIcon.propTypes = {
  children: node.isRequired
};

export default ActionIcon;
