import GroupsDialog from '/dialogs/groups-dialog';
import PropTypes from 'prop-types';
import React from 'react';

const Dialogs = {
  groups: GroupsDialog
};

const DialogRoute = ({ history, location, match }) => {
  const key = location.hash.replace(/^#!\/dialogs\/(.+)$/g, '$1');
  const { [key]: Dialog } = Dialogs;

  if (Dialog) {
    return <Dialog history={history} location={location} match={match}/>;
  }

  return null;
};

const { func, objectOf, shape, string } = PropTypes;

DialogRoute.propTypes = {
  history: shape({
    goBack: func.isRequired,
    push: func.isRequired
  }).isRequired,
  location: shape({
    hash: string.isRequired
  }).isRequired,
  match: shape({
    params: objectOf(string).isRequired
  })
};

export default DialogRoute;
