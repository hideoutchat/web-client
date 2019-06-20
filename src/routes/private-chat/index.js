import Hamburger from '/components/hamburger';
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

const BACK = -1;
const goBack = (history) => () => history.go(BACK);

const PrivateChatRoute = ({ history }) => <Screen style={{ minWidth: '80%' }}>
  <Panel
    content={<Children>
      <MessageList count={2}>
        <Prologue>This is the beginning of your conversation with frenzied porcupine.</Prologue>
        <MessageListItem
          actions={<Menu>
            <MenuItem>Add reaction...</MenuItem>
            <MenuItem>Edit...</MenuItem>
            <MenuItem>Delete...</MenuItem>
          </Menu>}
          lines={[
            { text: 'Hello, world!', timestamp: new Date().toISOString() },
            { text: 'This is the second message I sent to you.', timestamp: new Date().toISOString() }
          ]}
          onSelect={() => true}
          reactions={[]}
          sender={{
            color: '#f09030',
            displayName: 'frenzied porcupine',
            id: 'fizz',
            isTrusted: true
          }}
        />
        <MessageListItem
          actions={<Menu>
            <MenuItem>Add reaction...</MenuItem>
            <MenuItem>Edit...</MenuItem>
            <MenuItem>Delete...</MenuItem>
          </Menu>}
          isOutbound
          lines={[
            { text: 'Word up, hoss.', timestamp: new Date().toISOString() }
          ]}
          onSelect={() => true}
          reactions={[
            { count: 1, emoji: '👍' },
            { count: 2, emoji: '🚀' }
          ]}
          sender={{
            color: '#3090f0',
            displayName: 'disgruntled lemur',
            id: 'buzz',
            isTrusted: true
          }}
        />
      </MessageList>
    </Children>}
    footer={<Footer>
      <MessageForm/>
    </Footer>}
    header={<Header>
      <Icon onClick={goBack(history)}>
        <Hamburger/>
      </Icon>
      <Title>
        <ActionBarTitle>frenzied porcupine &amp; Me</ActionBarTitle>
        <ActionBarSubtitle>A private conversation</ActionBarSubtitle>
      </Title>
      <Actions>
        <MenuIcon title="Groups">
          <UserGroupIcon onClick={() => history.push('#!/dialogs/groups')}/>
        </MenuIcon>
        <Menu>
          <MenuItem>Leave chat...</MenuItem>
        </Menu>
      </Actions>
    </Header>}
  />
</Screen>;

const { func, shape } = PropTypes;

PrivateChatRoute.propTypes = {
  history: shape({
    go: func.isRequired
  }).isRequired
};

export default PrivateChatRoute;
