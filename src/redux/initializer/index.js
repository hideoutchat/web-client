import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import initialize from '../actions/initialize';

class Initializer extends React.Component {
  static get propTypes() {
    return {
      onMount: PropTypes.func.isRequired
    };
  }

  componentDidMount() {
    this.props.onMount();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }
}

export { Initializer };

export default connect(null, (dispatch) => ({
  onMount: () => dispatch(initialize())
}))(Initializer);
