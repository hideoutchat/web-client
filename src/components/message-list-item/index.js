import ActionList from './action-list';
import AddReaction from './add-reaction';
import Avatar from './avatar';
import Content from './content';
import Gutter from './gutter';
import Hashatar from '/components/hashatar';
import Header from './header';
import Line from './line';
import Markdown from 'react-markdown';
import Message from './message';
import PropTypes from 'prop-types';
import React from 'react';
import ReactionList from './reaction-list';
import ReactionListItem from './reaction-list-item';
import Sender from './sender';
import Text from './text';
import Time from './time';

const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' });

const MessageListItem = ({ actions, isOutbound, lines, onSelect, reactions, sender }) => <Message isOutbound={isOutbound} onLongPress={onSelect}>
  {actions && <ActionList>{actions}</ActionList>}
  <Line>
    <Gutter>
      <Avatar style={{ borderColor: sender.color }}>
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
  <ReactionList>
    {reactions.map((it) => <ReactionListItem key={it.emoji} count={it.count} emoji={it.emoji}/>)}
    {reactions.length > 0 && <AddReaction onReact={() => true}/>}
  </ReactionList>
</Message>;

const { arrayOf, bool, func, node, number, shape, string } = PropTypes;

MessageListItem.propTypes = {
  actions: node,
  isOutbound: bool,
  lines: arrayOf(shape({
    text: string.isRequired,
    timestamp: string.isRequired
  })).isRequired,
  onSelect: func.isRequired,
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
};

export default MessageListItem;
