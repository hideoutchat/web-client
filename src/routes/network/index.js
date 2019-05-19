import Fork from '/components/fork';
import Logo from '/components/logo';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Screen from '/components/screen';

import { connect } from 'react-redux';

const NetworkRoute = ({ name }) => <Fork
  condition={Boolean(name)}
  whenFalse={() => <Redirect to="/"/>}
  whenTrue={() => <Screen>
    <Logo/>
    <div>
      <p>This is the network.</p>
    </div>
  </Screen>}
/>;

const { string } = PropTypes;

NetworkRoute.propTypes = {
  name: string
};

export { NetworkRoute };

export default connect((state) => ({
  name: state.name
}))(NetworkRoute);
