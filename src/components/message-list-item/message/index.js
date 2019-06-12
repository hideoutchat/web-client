import styled, { keyframes } from 'styled-components';

import ActionList from '../action-list';
import PropTypes from 'prop-types';
import React from 'react';
import { Trigger } from '/components/menu';

import attachLongPressEvent from '/utilities/dom/long-press-event';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledMessage = styled.div`
  animation-duration: 100ms;
  animation-name: ${fadeIn};
  position: relative;

  > ${ActionList} ${Trigger} {
    opacity: 0;

    ${({ theme }) => theme.transition('opacity')}
  }

  :hover > ${ActionList} ${Trigger} {
    opacity: 1;
  }
`;

class Message extends React.Component {
  static get propTypes() {
    const { func, node } = PropTypes;
    return {
      children: node,
      onLongPress: func
    };
  }

  constructor(props) {
    super(props);
    this.targetRef = React.createRef();
  }

  componentDidMount() {
    if (this.targetRef && this.targetRef.current) {
      this.detachLongPressEvent = attachLongPressEvent(this.targetRef.current, this.handleLongPress);
    }
  }

  componentWillUnmount() {
    if (this.detachLongPressEvent) {
      this.detachLongPressEvent();
    }
  }

  handleLongPress = (event) => {
    const { props: { onLongPress } } = this;
    if (typeof onLongPress === 'function') {
      onLongPress(event);
    }
  };

  render() {
    return <StyledMessage ref={this.targetRef}>{this.props.children}</StyledMessage>;
  }
}

export default Message;
