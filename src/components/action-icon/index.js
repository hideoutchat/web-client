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
