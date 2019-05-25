import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';

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

const StyledTextInput = styled.input`
  background: none;
  border-color: ${(props) => props.theme.color.action.borderInactive};
  border-style: solid;
  border-width: 0 0 2px 0;
  color: inherit;
  font-family: inherit;
  font-size: 2em;
  line-height: 1.5em;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.space.normal};
  width: 80%;
  ${(props) => props.theme.transition('border-color')}

  :active,
  :focus,
  :hover {
    border-color: ${(props) => props.theme.color.action.border};
  }

  :active:hover,
  :focus:hover {
    border-color: ${(props) => props.theme.color.action.border};
  }
`;

class TextInput extends React.Component {
  static get defaultProps() {
    return {
      isAutoFocus: false,
      isDisabled: false,
      placeholder: '',
      type: 'text'
    };
  }

  static get propTypes() {
    const { bool, func, string } = PropTypes;
    return {
      isAutoFocus: bool,
      isDisabled: bool,
      onChange: func.isRequired,
      placeholder: string,
      type: string,
      value: string.isRequired
    };
  }

  handleChange = withEventInterception((event) => {
    this.props.onChange(event.target.value);
  });

  render() {
    const {
      handleChange,
      props: {
        isAutoFocus,
        isDisabled,
        placeholder,
        type,
        value
      }
    } = this;

    return <StyledTextInput
      autoFocus={isAutoFocus}
      disabled={isDisabled}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />;
  }
}

export default TextInput;
