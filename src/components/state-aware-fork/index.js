import Fork from '/components/fork';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const StateAwareFork = connect((state, props) => ({ condition: props.condition(state) }))(Fork);

StateAwareFork.propTypes = {
  ...Fork.propTypes,
  condition: PropTypes.func.isRequired
};

export default StateAwareFork;
