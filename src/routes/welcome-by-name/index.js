import styled, { keyframes } from 'styled-components';

import Fork from '/components/fork';
import Logo from '/components/logo';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Screen from '/components/screen';

import { connect } from 'react-redux';
import joinNetwork from '/redux/actions/join-network';

const Door = styled.div`
  cursor: pointer;
  font-size: 128px;
  margin: 0;
  padding: 64px 0 0;
  text-align: center;
  transform: translateY(32px) scale(0.9, 0.9);
  ${(props) => props.theme.transition('transform')}

  :hover {
    transform: translateY(0) scale(1, 1);
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Message = styled.div`
  animation-duration: 1s;
  animation-name: ${FadeIn};
`;

const { func, string } = PropTypes;

const WelcomeByNameRoute = ({ name, onCommit }) => <Fork
  condition={Boolean(name)}
  whenFalse={() => <Redirect to="/"/>}
  whenTrue={() => <Screen>
    <Logo/>
    <div style={{ alignItems: 'center', display: 'flex', flex: '1' }}>
      <Message>
        <p>Ah, yes. Hello, <b style={{ color: '#cba6ff' }}>{name}</b>. Welcome to the Hideout.</p>
        <p>Your <b style={{ color: '#f0e060' }}>🔑 key</b> is ready. Head on through the door to get started.</p>
      </Message>
    </div>
    <Door onClick={onCommit}>🚪</Door>
  </Screen>}
/>;

WelcomeByNameRoute.propTypes = {
  name: string,
  onCommit: func.isRequired
};

export { WelcomeByNameRoute };

export default connect((state) => ({
  name: state.name
}), (dispatch, props) => ({
  onCommit: () => dispatch(joinNetwork({ history: props.history }))
}))(WelcomeByNameRoute);
