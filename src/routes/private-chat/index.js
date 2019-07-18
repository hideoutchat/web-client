import Hamburger from '/components/hamburger';
import Hashatar from '/components/hashatar';
import Menu from '/components/menu';
import MenuIcon from '/components/menu-icon';
import MenuItem from '/components/menu-item';
import MessageForm from '/components/message-form';
import MessageList from '/components/message-list';
import MessageListItem from '/components/message-list-item';
import Panel from '/components/panel';
import PropTypes from 'prop-types';
import React from 'react';
import Screen from '/components/screen';
import UserGroupIcon from '/components/user-group-icon';

import { connect } from 'react-redux';
import editMessage from '/redux/actions/edit-message';
import groupMessages from './group-messages';
import leaveChat from '/redux/actions/leave-chat';
import removeMessage from '/redux/actions/remove-message';
import selectMessageReaction from '/redux/actions/select-message-reaction';
import sendMessage from '/redux/actions/send-message';
import styled from 'styled-components';
import theme from '/utilities/styled/theme';
import toggleMessageReaction from '/redux/actions/toggle-message-reaction';

const Children = styled.div`
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
`;

const Footer = styled.div`
  align-items: stretch;
  background-color: ${theme('shadow', 'medium')};
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const Header = styled.div`
  align-items: center;
  background-color: ${theme('shadow', 'medium')};
  display: flex;
  flex-direction: row;
  height: 36px;
  padding: 8px;
`;

const Title = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 8px;
`;

const Icon = styled.div`
  background-color: ${theme('shadow', 'off')};
  border-radius: 50%;
  color: ${theme('color', 'foreground')};
  cursor: pointer;
  display: block;
  font-size: 14px;
  height: 32px;
  line-height: 34px;
  margin-left: -${theme('space', 'normal')};
  position: relative;
  text-align: center;
  transition-duration: 100ms;
  transition-property: background-color, color, margin-left;
  transition-timing-function: ease-in-out;
  user-select: none;
  width: 32px;

  :active,
  :hover {
    background-color: ${theme('shadow', 'low')};
  }

  :active:hover {
    background-color: ${theme('shadow', 'high')};
  }
`;

const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const ActionBarTitle = styled.div`
  color: ${theme('color', 'primary', 'bold')};
  font: ${theme('typeface', 'title')};
`;

const ActionBarSubtitle = styled.div`
  font: ${theme('typeface', 'paragraph')};
  font-size: 12px;
  max-height: 1.5em;
  opacity: 0.5;
  overflow: hidden;
`;

const Prologue = styled.div`
  border-color: ${theme('color', 'primary', 'foreground')};
  border-style: dotted;
  border-width: 1px 0 0;
  color: ${theme('color', 'primary', 'foreground')};
  font: ${theme('typeface', 'normal')};
  font-size: 12px;
  margin: ${theme('space', 'small')} auto;
  opacity: 0.1;
  padding: ${theme('space', 'small')};
  pointer-events: none;
  text-align: center;
  user-select: none;
  width: 75%;
`;

const ActionBarIcon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 32px;
`;

const Shine = styled.div`
  background-color: ${theme('color', 'badge', 'background')};
  border-radius: 50%;
  height: ${theme('space', 'normal')};
  position: absolute;
  right: ${theme('space', 'small')};
  top: ${theme('space', 'small')};
  width: ${theme('space', 'normal')};
`;

const BACK = -1;
const goBack = (history) => () => history.go(BACK);

const PrivateChatRoute = ({ history, isDistracting, messages, onLeave, onMessageEdit, onMessageReactionSelect, onMessageReactionToggle, onMessageRemove, onMessageSend, topic }) => <Screen style={{ minWidth: '80%' }}>
  <Panel
    content={<Children>
      <MessageList count={messages.length}>
        <Prologue>This is the beginning of your conversation in <b>{topic.attributes.displayName}</b>.</Prologue>
        {messages.map((it) => <MessageListItem
          actions={<Menu>
            <MenuItem onClick={() => onMessageReactionSelect(it)}>Add reaction...</MenuItem>
            <MenuItem onClick={() => onMessageEdit(it)}>Edit...</MenuItem>
            <MenuItem onClick={() => onMessageRemove(it)}>Delete...</MenuItem>
          </Menu>}
          isOutbound
          key={it.id}
          lines={it.lines}
          onReactionSelect={() => onMessageReactionSelect(it)}
          onReactionToggle={(emoji) => onMessageReactionToggle({ emoji, message: it })}
          onSelect={() => true}
          reactions={it.reactions}
          sender={it.sender}
        />)}
      </MessageList>
    </Children>}
    footer={<Footer>
      <MessageForm onCommit={onMessageSend}/>
    </Footer>}
    header={<Header>
      <Icon onClick={goBack(history)}>
        <Hamburger/>
        {isDistracting && <Shine/>}
      </Icon>
      <ActionBarIcon>
        <Hashatar code={topic.id}/>
      </ActionBarIcon>
      <Title>
        <ActionBarTitle>{topic.attributes.displayName}</ActionBarTitle>
        <ActionBarSubtitle>A private conversation</ActionBarSubtitle>
      </Title>
      <Actions>
        <MenuIcon onClick={() => history.push('#!/dialogs/groups', { topicId: topic.id })} title="Groups">
          <UserGroupIcon/>
        </MenuIcon>
        <Menu>
          <MenuItem onClick={onLeave}>Leave chat...</MenuItem>
        </Menu>
      </Actions>
    </Header>}
  />
</Screen>;

const { arrayOf, bool, func, number, shape, string } = PropTypes;

PrivateChatRoute.propTypes = {
  history: shape({
    go: func.isRequired
  }).isRequired,
  isDistracting: bool.isRequired,
  match: shape({
    params: shape({
      id: string.isRequired
    }).isRequired
  }).isRequired,
  messages: arrayOf(shape({
    id: string.isRequired,
    lines: arrayOf(shape({
      text: string.isRequired,
      timestamp: string.isRequired
    })).isRequired,
    reactions: arrayOf(shape({
      count: number.isRequired,
      emoji: string.isRequired
    })).isRequired,
    sender: shape({
      attributes: shape({
        color: string,
        displayName: string.isRequired,
        isTrusted: bool.isRequired
      }).isRequired,
      id: string.isRequired
    }).isRequired
  })).isRequired,
  onLeave: func.isRequired,
  onMessageEdit: func.isRequired,
  onMessageReactionSelect: func.isRequired,
  onMessageReactionToggle: func.isRequired,
  onMessageRemove: func.isRequired,
  onMessageSend: func.isRequired,
  topic: shape({
    attributes: shape({
      displayName: string.isRequired
    }).isRequired,
    id: string.isRequired
  }).isRequired
};

export { PrivateChatRoute };

const mapStateToProps = (state, props) => ({
  isDistracting: (state.indexes.resources.by.type.message || []).some((it) => it.relationships.topic.id !== decodeURIComponent(props.match.params.id)),
  messages: groupMessages(state, { id: decodeURIComponent(props.match.params.id) }),
  topic: state.indexes.resources.by.id[decodeURIComponent(props.match.params.id)][0]
});

const mapDispatchToProps = (dispatch, { history, match }) => ({
  onLeave: () => dispatch(leaveChat({ history })),
  onMessageEdit: (message) => dispatch(editMessage({ message })),
  onMessageReactionSelect: (message) => dispatch(selectMessageReaction({ history, message })),
  onMessageReactionToggle: ({ emoji, message }) => dispatch(toggleMessageReaction({ emoji, message })),
  onMessageRemove: (message) => dispatch(removeMessage({ message })),
  onMessageSend: ({ text }) => dispatch(sendMessage({
    text,
    topic: {
      id: decodeURIComponent(match.params.id),
      type: 'topic'
    }
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChatRoute);
