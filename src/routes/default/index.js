import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import setName from '/redux/actions/set-name';
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

const Vector = styled.svg`
  stroke-width: 4;
  height: 128px;
  width: 128px;
`;

const Dot = styled.rect.attrs({ height: 16, width: 16 })`
  stroke: none;
  fill: ${(props) => props.theme.color.primary.foreground};
`;

const Dash = styled.path`
  fill: none;
  stroke: ${(props) => props.theme.color.action.border};
  stroke-width: 4;
`;

const Logo = () => <Vector>
  <Dash d="m 16,16 v 64 v -32 h 64 v 32"/>
  <Dot x="8" y="8"/>
  <Dot x="8" y="40"/>
  <Dot x="40" y="40"/>
  <Dot x="72" y="40"/>
  <Dot x="72" y="72"/>
  <Dot x="8" y="72"/>
</Vector>;

const Screen = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.color.primary.background};
  background: linear-gradient(to bottom, ${(props) => props.theme.color.primary.background} 0%, rgba(4, 8, 16, 1) 100%);
  color: ${(props) => props.theme.color.primary.foreground};
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: ${(props) => props.theme.typeface.normal};
  padding: ${(props) => props.theme.space.large};
`;

const Introduction = styled.div`
  flex: 1;
  text-align: center;

  p {
    margin: 0 0 ${(props) => props.theme.space.normal};
    padding: 0;
  }
`;

const Field = styled.div`
  align-items: stretch;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${(props) => props.theme.space.normal};
`;

const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Action = styled.button`
  background: none;
  background-color: ${(props) => props.theme.shadow.low};
  border-color: ${(props) => props.theme.color.primary.border};
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  box-shadow: 1px 1px 1px ${(props) => props.theme.shadow.low};
  color: ${(props) => props.theme.color.action.foreground};
  cursor: pointer;
  margin: 0;
  outline: none;
  padding: ${(props) => props.theme.space.large};
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
  user-select: none;
  ${(props) => props.theme.transition('background-color', 'border-color', 'color', 'text-shadow')}

  :active,
  :focus,
  :hover {
    background-color: ${(props) => props.theme.shadow.medium};
    border-color: ${(props) => props.theme.color.action.border};
  }

  :active:hover {
    background-color: ${(props) => props.theme.color.action.border};
    color: ${(props) => props.theme.color.primary.background};
    text-shadow: none;
  }

  ::-moz-focus-inner {
    border-width: 0;
  }
`;

const TextInput = styled.input.attrs({ placeholder: 'e.g: DB Cooper', type: 'text' })`
  background: none;
  border-color: ${(props) => props.theme.color.primary.border};
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

const Label = styled.label`
  font-size: 0.8em;
  margin: 0 auto;
  padding: ${(props) => props.theme.space.normal};
  width: 80%;
`;

const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex: 2;
  flex-direction: column;
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

  handleNameChange = withEventInterception((event) => {
    this.setState({ name: event.target.value });
  });

  render() {
    const { handleNameChange, handleCommit, state: { name } } = this;

    return <StyledForm onSubmit={handleCommit}>
      <Field>
        <TextInput autoFocus onChange={handleNameChange} value={name}/>
        <Label>Your &quot;name&quot;</Label>
      </Field>
      <Actions>
        <Action>Continue</Action>
      </Actions>
    </StyledForm>;
  }
}

const DefaultRoute = ({ onCommit }) => <Screen>
  <Logo/>
  <Introduction>
    <p>It looks like this is your first time here.</p>
    <p><b>Relax.</b> I&apos;m getting a key ready for you now.</p>
    <p>In the meantime, what would you like to be called?</p>
  </Introduction>
  <Form onCommit={onCommit}/>
</Screen>;

const { func } = PropTypes;

DefaultRoute.propTypes = {
  onCommit: func.isRequired
};

export { DefaultRoute };

export default connect(null, (dispatch) => ({
  onCommit: ({ name }) => dispatch(setName(name))
}))(DefaultRoute);
