import Hashatar from '/components/hashatar';
import Logo from '/components/logo';
import PropTypes from 'prop-types';
import React from 'react';
import Screen from '/components/screen';
import TextInput from '/components/text-input';
import Timestamp from '/components/timestamp';

import { connect } from 'react-redux';
import styled from 'styled-components';
import theme from '/utilities/styled/theme';
import visitTopic from '/redux/actions/visit-topic';

const Header = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (max-height: 30rem) {
    display: none;
  }
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TopicList = styled.div`
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  font: ${theme('typeface', 'normal')};
  margin: ${theme('space', 'huge')} 0;
  overflow: auto;
  width: 90%;
`;

const TopicListItem = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  border-color: transparent;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: ${theme('space', 'normal')};
  margin: 0 0 ${theme('space', 'tiny')};

  ${({ theme }) => theme.transition('background-color', 'border-color', 'color')}

  :active,
  :hover {
    border-color: ${theme('color', 'action', 'border')};
  }

  :active:hover {
    background-color: ${theme('color', 'action', 'border')};
    color: ${theme('color', 'primary', 'background')};
  }
`;

const TopicAvatar = styled.div`
  background-color: #000000;
  border-radius: 50%;
  font-size: 48px;
  height: 48px;
  margin: ${theme('space', 'normal')};
  width: 48px;
`;

const TopicSummary = styled.div`
  flex: 1;
  margin: ${theme('space', 'normal')};
`;

const TopicName = styled.div`
  font-weight: 700;
  line-height: 24px;
`;

const TopicActivity = styled.div`
  font-size: 0.8em;
  line-height: 24px;
  ${(props) => {
    if (props.isShiny) {
      return `
        opacity: 1.0;

        ::after {
          content: " ✨";
        }
      `;
    }
    return `
      opacity: 0.5;
    `;
  }}
`;

const Search = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font: ${theme('typeface', 'normal')};
`;

const Introduction = styled.div`
  font: ${theme('typeface', 'normal')};
  text-align: center;
`;

const Welcome = styled.div`
  font: ${theme('typeface', 'code')};
  opacity: 0.1;
`;

const byMatchingDisplayName = (filter) => {
  if (!filter) {
    return () => true;
  }

  const normalizedFilter = filter.toLowerCase();

  return ({ displayName }) => {
    if (!displayName) {
      return true;
    }

    const normalizedDisplayName = displayName.toLowerCase();

    return normalizedDisplayName.includes(normalizedFilter);
  };
};

class NetworkRoute extends React.Component {
  static get propTypes() {
    const { arrayOf, bool, func, number, shape, string } = PropTypes;
    return {
      onTopicSelect: func.isRequired,
      peerCount: number.isRequired,
      topics: arrayOf(shape({
        displayName: string.isRequired,
        hasUnreadMessages: bool.isRequired,
        hashatar: string.isRequired,
        id: string.isRequired,
        updatedAt: string.isRequired
      })).isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      filteredTopics: props.topics,
      topicFilter: ''
    };
  }

  componentDidUpdate(previousProps) {
    if (previousProps.topics !== this.props.topics) {
      this.setState({
        filteredTopics: this.props.topics.filter(byMatchingDisplayName(this.state.topicFilter))
      });
    }
  }

  handleTopicFilterChange = (topicFilter) => {
    this.setState({
      filteredTopics: this.props.topics.filter(byMatchingDisplayName(topicFilter)),
      topicFilter
    });
  };

  render() {
    const {
      handleTopicFilterChange,
      props: { onTopicSelect, peerCount },
      state: { filteredTopics, topicFilter }
    } = this;

    return <Screen>
      <Header>
        <Logo/>
        <Welcome>SElERU9VVA</Welcome>
        <Introduction>
          <p><b style={{ color: '#3090f0' }}>{peerCount}</b> other {peerCount === 1 ? 'person is' : 'people are'} here.</p>
          {peerCount > 0 && <p>Looking for someone in particular?</p>}
        </Introduction>
      </Header>
      {peerCount > 0 && <Search>
        <TextInput isAutoFocus onChange={handleTopicFilterChange} value={topicFilter}/>
      </Search>}
      <Content>
        <TopicList>
          {filteredTopics.map((topic) => <TopicListItem key={topic.id} onClick={() => onTopicSelect(topic)}>
            <TopicAvatar>
              <Hashatar code={topic.hashatar}/>
            </TopicAvatar>
            <TopicSummary>
              <TopicName>{topic.displayName}</TopicName>
              <TopicActivity isShiny={topic.hasUnreadMessages}>Last active <Timestamp value={topic.updatedAt}/></TopicActivity>
            </TopicSummary>
          </TopicListItem>)}
        </TopicList>
      </Content>
    </Screen>;
  }
}

export { NetworkRoute };

const mapStateToProps = (state) => ({
  peerCount: state.indexes.resources.by.type.identity.length - 1,
  topics: (state.indexes.resources.by.type.topic || []).map((it) => ({
    displayName: it.attributes.displayName,
    hasUnreadMessages: (state.indexes.resources.by.type.message || []).some((message) => message.relationships.topic.id === it.id && !message.attributes.viewedAt),
    hashatar: it.relationships.symmetricKey.id,
    id: it.id,
    updatedAt: (state.indexes.resources.by.type.message || []).reduce((a, b) => {
      if (b.relationships.topic.id === it.id && b.attributes.timestamp && b.attributes.timestamp > a) {
        return b.attributes.timestamp;
      }
      return a;
    }, it.attributes.updatedAt)
  }))
});

const mapDispatchToProps = (dispatch, props) => ({
  onTopicSelect: (topic) => dispatch(visitTopic({ history: props.history, topic }))
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkRoute);
