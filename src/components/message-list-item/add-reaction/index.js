import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const StyledAddReaction = styled.div`
  align-items: center;
  background-color: ${theme('highlight', 'none')};
  border-color: ${theme('highlight', 'medium')};
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  color: ${theme('highlight', 'medium')};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  padding: ${theme('space', 'small')};
  user-select: none;

  ${({ theme }) => theme.transition('background-color', 'color')}

  :active,
  :hover {
    background-color: ${theme('highlight', 'low')};
    color: ${theme('color', 'primary', 'foreground')};
  }

  :active:hover {
    background-color: ${theme('highlight', 'medium')};
    color: ${theme('color', 'primary', 'foreground')};
  }
`;

const AddReaction = ({ onReact }) => <StyledAddReaction onClick={onReact}>
  ☺+
</StyledAddReaction>;

const { func } = PropTypes;

AddReaction.propTypes = {
  onReact: func.isRequired
};

export default AddReaction;
