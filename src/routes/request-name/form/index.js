import Button from '/components/button';
import Introduction from './introduction';
import PropTypes from 'prop-types';
import React from 'react';
import TextInput from '/components/text-input';

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

const Field = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  padding: ${theme('space', 'normal')};
`;

const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.8em;
  margin: 0 auto;
  padding: ${theme('space', 'normal')};
  width: 80%;
`;

const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  font: ${theme('typeface', 'normal')};
  margin: ${theme('space', 'large')} 0;
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 0 ${theme('space', 'large')};
`;

class Form extends React.Component {
  static get propTypes() {
    const { func } = PropTypes;
    return {
      onCommit: func.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleCommit = withEventInterception(() => {
    this.props.onCommit({
      name: this.state.name
    });
  });

  handleNameChange = (name) => this.setState({ name });

  render() {
    const { handleNameChange, handleCommit, state: { name } } = this;

    return <StyledForm onSubmit={handleCommit}>
      <Content>
        <div>
          <Introduction>
            <p>It looks like this is your first time here.</p>
            <p><b>Relax.</b> I am getting a key ready for you now.</p>
            <p>In the meantime, what would you like to be called?</p>
          </Introduction>
          <Field>
            <TextInput isAutoFocus onChange={handleNameChange} placeholder="e.g: DB Cooper" value={name}/>
            <Label>Your &quot;name&quot; &mdash; if empty, I shall choose for you.</Label>
          </Field>
        </div>
      </Content>
      <Actions>
        <Button onClick={handleCommit}>Continue</Button>
      </Actions>
    </StyledForm>;
  }
}

export default Form;
