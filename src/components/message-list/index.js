import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';

const MessageList = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 8px 0;
`;

class ScrollingMessageList extends React.Component {
  static get defaultProps() {
    return {
      count: 0
    };
  }

  static get propTypes() {
    const { number } = PropTypes;
    return {
      count: number.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.scrollableRef = React.createRef();
  }

  componentDidMount() {
    this.handleGravity();
  }

  componentDidUpdate(previousProps) {
    if (this.props.count !== previousProps.count) {
      this.handleGravity();
    }
  }

  handleGravity = () => {
    const { scrollableRef: { current } } = this;
    if (current) {
      current.scrollTo(0, current.scrollHeight);
    }
  };

  render() {
    return <MessageList ref={this.scrollableRef} {...this.props}/>;
  }
}

export default ScrollingMessageList;
