import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import initialize from '../actions/initialize';

class Initializer extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
      isInitialized: PropTypes.bool.isRequired,
      onMount: PropTypes.func.isRequired
    };
  }

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const { children, isInitialized } = this.props;
    return isInitialized ? children : null;
  }
}

export { Initializer };

export default connect((state) => ({
  isInitialized: Boolean(state.isInitialized)
}), (dispatch) => ({
  onMount: () => dispatch(initialize())
}))(Initializer);
