import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const invoke = (object, key, ...args) => {
  if (typeof object[key] === 'function') {
    object[key](...args);
  }
};

const interceptEvent = (event) => {
  invoke(event, 'preventDefault');
  invoke(event, 'stopImmediatePropagation');
  invoke(event, 'stopPropagation');

  return false;
};

const withEventInterception = (f) => (event) => {
  interceptEvent(event);
  return f(event);
};

const StyledButton = styled.button`
  background: none;
  background-color: ${theme('shadow', 'low')};
  border-color: ${theme('color', 'action', 'borderInactive')};
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 1px 1px 1px ${theme('shadow', 'low')};
  color: ${theme('color', 'action', 'foreground')};
  cursor: pointer;
  margin: 0;
  outline: none;
  padding: ${theme('space', 'large')};
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
  user-select: none;
  ${({ theme }) => theme.transition('background-color', 'border-color', 'color', 'text-shadow')}

  :active,
  :focus,
  :hover {
    background-color: ${theme('shadow', 'medium')};
    border-color: ${theme('color', 'action', 'border')};
  }

  :active:hover {
    background-color: ${theme('color', 'action', 'border')};
    color: ${theme('color', 'primary', 'background')};
    text-shadow: none;
  }

  ::-moz-focus-inner {
    border-width: 0;
  }
`;

class Button extends React.Component {
  static get propTypes() {
    const { func, node, object, string } = PropTypes;

    return {
      children: node,
      className: string,
      onClick: func.isRequired,
      style: object,
      title: string
    };
  }

  handleClick = withEventInterception((event) => this.props.onClick(event));

  render() {
    const { handleClick: onClick, props: { children, className, style, title } } = this;
    return <StyledButton className={className} onClick={onClick} style={style} title={title}>{children}</StyledButton>;
  }
}

export default Button;
