import PropTypes from 'prop-types';
import React from 'react';
import VectorIcon from '/components/vector-icon';

const AddAttachmentIcon = ({ style }) => <VectorIcon style={style}>
  <path d="M 120 4 h 16 v 116 h 116 v 16 h -116 v 116 h -16 v -116 h -116 v -16 h 116 z"/>
</VectorIcon>;

const { object } = PropTypes;

AddAttachmentIcon.propTypes = {
  style: object
};

export default AddAttachmentIcon;
