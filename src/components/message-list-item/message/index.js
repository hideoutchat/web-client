import styled, { keyframes } from 'styled-components';

import ActionList from '../action-list';
import PropTypes from 'prop-types';
import React from 'react';
import { Trigger } from '/components/menu';

import attachLongPressEvent from '/utilities/dom/long-press-event';
import theme from '/utilities/styled/theme';
import whenProp from '/utilities/styled/when-prop';

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
  background-color: ${(props) => whenProp('isOutbound')(props.theme.shadow.off, props.theme.highlight.off)(props)};
  border-radius: ${theme('space', 'small')};
  margin: ${theme('space', 'normal')};
  padding: ${theme('space', 'small')} 0;

  ${({ theme }) => theme.transition('background-color')}

  position: relative;

  :active,
  :hover {
    background-color: ${(props) => whenProp('isOutbound')(props.theme.shadow.low, props.theme.highlight.low)(props)};
  }

  :active:hover {
    background-color: ${(props) => whenProp('isOutbound')(props.theme.shadow.medium, props.theme.highlight.medium)(props)};
  }

  > ${ActionList} ${Trigger} {
    opacity: 0;

    ${({ theme }) => theme.transition('opacity')}
  }

  :hover > ${ActionList} ${Trigger} {
    opacity: 1;
  }
`;

class Message extends React.Component {
  static get defaultProps() {
    return {
      isOutbound: false
    };
  }

  static get propTypes() {
    const { bool, func, node } = PropTypes;
    return {
      children: node,
      isOutbound: bool.isRequired,
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
    return <StyledMessage ref={this.targetRef} isOutbound={this.props.isOutbound}>{this.props.children}</StyledMessage>;
  }
}

export default Message;
