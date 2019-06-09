import Hamburger from '/components/hamburger';
import MenuIcon from '/components/menu-icon';
import MessageForm from '/components/message-form';
import MessageList from '/components/message-list';
import MessageListItem from '/components/message-list-item';
import Panel from '/components/panel';
import PropTypes from 'prop-types';
import React from 'react';
import UserGroupIcon from '/components/user-group-icon';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';
import whenProp from '/utilities/styled/when-prop';

const Screen = styled.div`
  background-color: ${(props) => props.theme.color.primary.background};
  background: ${(props) => props.theme.gradient.screen};
  color: ${(props) => props.theme.color.primary.foreground};
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: ${(props) => props.theme.typeface.normal};
  overflow: hidden;
  padding: 0;
`;

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

const BACK = -1;
const goBack = (history) => () => history.go(BACK);

const PrivateChatRoute = ({ history }) => <Screen>
  <Panel
    content={<Children>
      <MessageList count={2}>
        <MessageListItem
          lines={[
            { text: 'Hello, world!', timestamp: new Date().toISOString() },
            { text: 'This is the second message I sent to you.', timestamp: new Date().toISOString() }
          ]}
          reactions={[]}
          sender={{
            color: '#f09030',
            displayName: 'frenzied porcupine',
            id: 'fizz',
            isTrusted: true
          }}
        />
        <MessageListItem
          lines={[
            { text: 'Word up, hoss.', timestamp: new Date(Date.now()).toISOString() }
          ]}
          reactions={[
            { count: 1, emoji: '👍' }
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
          <UserGroupIcon/>
        </MenuIcon>
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
