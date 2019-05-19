import Form from './form';
import Logo from '/components/logo';
import PropTypes from 'prop-types';
import React from 'react';
import Screen from '/components/screen';

import { connect } from 'react-redux';
import setName from '/redux/actions/set-name';

const RequestNameRoute = ({ onCommit }) => <Screen>
  <Logo/>
  <Form onCommit={onCommit}/>
</Screen>;

const { func } = PropTypes;

RequestNameRoute.propTypes = {
  onCommit: func.isRequired
};

export { RequestNameRoute };

export default connect(null, (dispatch, props) => ({
  onCommit: ({ name }) => dispatch(setName({ history: props.history, name }))
}))(RequestNameRoute);
