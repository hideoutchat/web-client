import PropTypes from 'prop-types';
import React from 'react';

import styled from 'styled-components';
import theme from '/utilities/styled/theme';

const Form = styled.form`
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 36px;
  margin: 0;
  padding: 8px;
  position: relative;
`;

const Text = styled.input`
  background: none;
  background-color: transparent;
  border-color: ${theme('color', 'primary', 'border')};
  border-style: solid;
  border-width: 0;
  color: inherit;
  flex: 1;
  font: ${theme('typeface', 'paragraph')};
  line-height: 2em;
  margin: 0;
  opacity: 1;
  outline: none;
  padding: 0;
  transition-duration: 100ms;
  transition-property: background-color, opacity;
  transition-timing-function: ease-in-out;

  :disabled {
    cursor: default;
    opacity: 0.25;
  }
`;

class MessageForm extends React.Component {
  static get defaultProps() {
    return {
      isDisabled: false,
      onCommit: () => 'Stub!'
    };
  }

  static get propTypes() {
    const { bool, func } = PropTypes;
    return {
      isDisabled: bool.isRequired,
      onCommit: func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      isValid: false,
      text: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const {
      inputRef,
      props: { isDisabled, onCommit },
      state: { isValid, text }
    } = this;

    if (isValid && !isDisabled) {
      onCommit({ text });

      if (inputRef.current) {
        inputRef.current.focus();
      }

      this.setState({ isValid: false, text: '' });
    }

    return false;
  };

  handleTextChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { target: { value } } = event;
    this.setState({ isValid: Boolean(value), text: value });
    return false;
  };

  render() {
    const {
      handleSubmit,
      handleTextChange,
      inputRef,
      props: { isDisabled },
      state: { text }
    } = this;
    return <Form onSubmit={handleSubmit}>
      <Text ref={inputRef} autoFocus disabled={isDisabled} onChange={handleTextChange} placeholder="Write your message here..." type="text" value={text}/>
    </Form>;
  }
}

export default MessageForm;
