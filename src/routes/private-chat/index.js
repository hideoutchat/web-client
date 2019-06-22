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
import sendMessage from '/redux/actions/send-message';
import styled from 'styled-components';
import theme from '/utilities/styled/theme';
import whenProp from '/utilities/styled/when-prop';

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
  margin-left: ${whenProp('isShifted')('-40px', '0')};
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

const BACK = -1;
const goBack = (history) => () => history.go(BACK);

const PrivateChatRoute = ({ history, messages, onMessageSend, peer, self }) => <Screen style={{ minWidth: '80%' }}>
  <Panel
    content={<Children>
      <MessageList count={2}>
        <Prologue>This is the beginning of your conversation with {peer.name}.</Prologue>
        {messages.map((it) => <MessageListItem
          actions={<Menu>
            <MenuItem>Add reaction...</MenuItem>
            <MenuItem>Edit...</MenuItem>
            <MenuItem>Delete...</MenuItem>
          </Menu>}
          isOutbound
          key={it.id}
          lines={it.lines}
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
      </Icon>
      <ActionBarIcon>
        <Hashatar code={peer.id}/>
      </ActionBarIcon>
      <Title>
        <ActionBarTitle>{peer.name} &amp; {self.displayName}</ActionBarTitle>
        <ActionBarSubtitle>A private conversation</ActionBarSubtitle>
      </Title>
      <Actions>
        <MenuIcon onClick={() => history.push('#!/dialogs/groups')} title="Groups">
          <UserGroupIcon/>
        </MenuIcon>
        <Menu>
          <MenuItem>Leave chat...</MenuItem>
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
      color: string,
      displayName: string.isRequired,
      id: string.isRequired,
      isTrusted: bool.isRequired
    }).isRequired
  })).isRequired,
  onMessageSend: func.isRequired,
  peer: shape({
    activity: string.isRequired,
    id: string.isRequired,
    name: string.isRequired
  }).isRequired,
  self: shape({
    displayName: string.isRequired
  }).isRequired
};

export { PrivateChatRoute };

export default connect((state, props) => ({
  messages: state.messages.byPeer[decodeURIComponent(props.match.params.id)],
  peer: state.peers.byId[decodeURIComponent(props.match.params.id)],
  self: state.self
}), (dispatch, props) => ({
  onMessageSend: (message) => dispatch(sendMessage({
    message,
    peerId: decodeURIComponent(props.match.params.id)
  }))
}))(PrivateChatRoute);
