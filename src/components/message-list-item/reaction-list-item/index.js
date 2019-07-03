import Count from './count';
import Emoji from './emoji';
import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const StyledReactionListItem = styled.div`
  align-items: center;
  background-color: ${theme('highlight', 'low')};
  border-color: ${theme('shadow', 'low')};
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin-bottom: ${theme('space', 'small')};
  margin-right: ${theme('space', 'normal')};
  padding: ${theme('space', 'small')};
  padding-right: 0;
  user-select: none;

  > ${Emoji} {
    filter: saturate(0%);
    opacity: 0.25;
    transform: scaleX(1) scaleY(1);

    ${({ theme }) => theme.transition('filter', 'opacity', 'transform')}
  }

  > ${Count} {
    opacity: 0.5;

    ${({ theme }) => theme.transition('color', 'opacity')}
  }

  :active,
  :hover {
    > ${Emoji} {
      filter: saturate(100%);
      opacity: 1;
      transform: scaleX(1.1) scaleY(1.1);
    }

    > ${Count} {
      opacity: 1;
    }
  }

  :active:hover {
    > ${Emoji} {
      transform: scaleX(1.2) scaleY(1.2);
    }

    > ${Count} {
      color: ${theme('color', 'primary', 'link')};
    }
  }
`;

const ReactionListItem = ({ count, emoji, onClick }) => <StyledReactionListItem onClick={onClick}>
  <Emoji>{emoji}</Emoji>
  <Count>{count}</Count>
</StyledReactionListItem>;

const { func, number, string } = PropTypes;

ReactionListItem.propTypes = {
  count: number.isRequired,
  emoji: string.isRequired,
  onClick: func.isRequired
};

export default ReactionListItem;
