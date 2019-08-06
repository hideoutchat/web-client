import styled, { keyframes } from 'styled-components';

import PropTypes from 'prop-types';
import React from 'react';

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

const StyledLine = styled.div`
  align-items: flex-start;
  animation-duration: 100ms;
  animation-fill-mode: both;
  animation-name: ${fadeInFromBelow};
  display: flex;
  flex-direction: row;
  line-height: 16px;
  padding: 4px;
`;

class Line extends React.Component {
  static get propTypes() {
    const { bool, func, node } = PropTypes;
    return {
      children: node,
      isRead: bool.isRequired,
      onRead: func.isRequired
    };
  }

  componentDidMount() {
    if (!this.props.isRead) {
      this.props.onRead();
    }
  }

  componentDidUpdate() {
    if (!this.props.isRead) {
      this.props.onRead();
    }
  }

  render() {
    return <StyledLine>{this.props.children}</StyledLine>;
  }
}

export default Line;
