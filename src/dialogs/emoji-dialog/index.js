import Dialog from '/components/dialog';
import PropTypes from 'prop-types';
import React from 'react';

import addMessageReaction from '/redux/actions/add-message-reaction';
import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Content = styled.div`
`;

const Choice = styled.div`
  background-color: ${theme('highlight', 'off')};
  cursor: pointer;
  display: inline-block;
  padding: 8px;

  ${({ theme }) => theme.transition('background-color')}

  :active,
  :hover {
    background-color: ${theme('highlight', 'low')};
  }

  :active:hover {
    background-color: ${theme('highlight', 'medium')};
  }
`;

const EMOJI_CHOICES = Object.freeze([
  { emoji: '👍' },
  { emoji: '🎉' },
  { emoji: '🚀' },
  { emoji: '😀' },
  { emoji: '😉' },
  { emoji: '🙁' },
  { emoji: '💓' }
]);

class EmojiDialog extends React.Component {
  static get propTypes() {
    const { func, shape, string } = PropTypes;

    return {
      history: shape({
        goBack: func.isRequired
      }).isRequired,
      location: shape({
        state: shape({
          messageId: string.isRequired
        }).isRequired
      }).isRequired,
      onCancel: func.isRequired,
      onCommit: func.isRequired
    };
  }

  render() {
    const { props: { onCancel, onCommit } } = this;

    return <Dialog
      content={<Content>
        {EMOJI_CHOICES.map((it) => <Choice
          key={it.emoji}
          onClick={() => onCommit(it)}
        >{it.emoji}</Choice>)}
      </Content>}
      onCancel={onCancel}
      title="Select an emoji"
    />;
  }
}

export { EmojiDialog };

export default connect(null, (dispatch, props) => ({
  onCancel: () => props.history.goBack(),
  onCommit: ({ emoji }) => {
    dispatch(addMessageReaction({
      emoji,
      message: {
        id: props.location.state.messageId
      }
    }));
    props.history.goBack();
  }
}))(EmojiDialog);
