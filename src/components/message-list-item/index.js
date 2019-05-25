import styled, { keyframes } from 'styled-components';

import Hashatar from '/components/hashatar';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React from 'react';

import theme from '/utilities/styled/theme';

const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' });

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeInFromBelow = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Message = styled.div`
  animation-duration: 100ms;
  animation-name: ${fadeIn};
`;

const Avatar = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 2em;
`;

const Line = styled.div`
  align-items: flex-start;
  animation-duration: 100ms;
  animation-fill-mode: both;
  animation-name: ${fadeInFromBelow};
  background-color: ${theme('shadow', 'off')};
  display: flex;
  flex-direction: row;
  line-height: 16px;
  padding: 4px;
  transition-duration: 100ms;
  transition-property: background-color;
  transition-timing-function: ease-in-out;

  :active,
  :hover {
    background-color: ${theme('shadow', 'low')};
  }

  :active:hover {
    background-color: ${theme('shadow', 'high')};
  }
`;

const Gutter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  width: 48px;
`;

const Time = styled.div`
  font: ${theme('typeface', 'paragraph')};
  font-size: 10px;
  line-height: 16px;
  opacity: 0.5;
  transition-duration: 100ms;
  transition-property: opacity;
  transition-timing-function: ease-in-out;

  ${Line} ${Gutter} & {
    opacity: 0;
  }

  ${Line}:hover ${Gutter} & {
    opacity: 0.5;
  }
`;

const Content = styled.div`
  flex: 1;
  margin-left: 8px;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Sender = styled.div`
  color: ${theme('color', 'primary', 'bold')};
  font: ${theme('typeface', 'title')};
  font-weight: 700;
  margin-right: 8px;
  text-shadow: 1px 1px 0 ${theme('shadow', 'high')};
`;

const Text = styled.div`
  font: ${theme('typeface', 'paragraph')};

  & ol li,
  & p,
  & ul li {
    margin: 0;
    padding: 0;
  }

  & ol,
  & ul {
    margin: 0 0 0 16px;
    padding: 0;
  }

  & a {
    color: ${theme('color', 'primary', 'link')};
  }

  & b,
  & strong {
    color: ${theme('color', 'primary', 'bold')};
  }

  & img {
    border-radius: 4px;
    margin: 8px 0;
  }
`;

const MessageListItem = ({ lines, sender }) => <Message>
  <Line>
    <Gutter>
      <Avatar>
        <Hashatar code={sender.id}/>
      </Avatar>
    </Gutter>
    <Content>
      <Header>
        <Sender>{sender.displayName}</Sender>
        <Time title={lines[0].timestamp}>{timeFormat.format(new Date(lines[0].timestamp))}</Time>
      </Header>
      <Text>
        {sender.isTrusted ? <Markdown source={lines[0].text}/> : lines[0].text}
      </Text>
    </Content>
  </Line>
  {lines.slice(1).map((line, index) => <Line key={index}>
    <Gutter>
      <Time title={line.timestamp}>{timeFormat.format(new Date(line.timestamp))}</Time>
    </Gutter>
    <Content>
      <Text>
        {sender.isTrusted ? <Markdown source={line.text}/> : line.text}
      </Text>
    </Content>
  </Line>)}
</Message>;

const { arrayOf, bool, shape, string } = PropTypes;

MessageListItem.propTypes = {
  lines: arrayOf(shape({
    text: string.isRequired,
    timestamp: string.isRequired
  })).isRequired,
  sender: shape({
    displayName: string.isRequired,
    id: string.isRequired,
    isTrusted: bool.isRequired
  }).isRequired
};

export default MessageListItem;
