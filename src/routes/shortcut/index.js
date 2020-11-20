import PropTypes from 'prop-types';

import autoJoinNetwork from '/redux/actions/auto-join-network';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Shortcut = ({ onVisit }) => {
  useEffect(() => {
    onVisit();
  }, []);
  return null;
};

Shortcut.propTypes = {
  onVisit: PropTypes.func.isRequired
};

export default connect(undefined, (dispatch) => ({
  onVisit: () => {
    dispatch(autoJoinNetwork());
  }
}))(Shortcut);
