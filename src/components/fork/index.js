import PropTypes from 'prop-types';

const { bool, func } = PropTypes;

const Fork = ({ condition, whenFalse, whenTrue }) => {
  if (condition) {
    return whenTrue();
  }
  return whenFalse();
};

Fork.propTypes = {
  condition: bool.isRequired,
  whenFalse: func,
  whenTrue: func
};

export default Fork;
