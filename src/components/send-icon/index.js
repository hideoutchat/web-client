import PropTypes from 'prop-types';
import React from 'react';
import VectorIcon from '/components/vector-icon';

const SendIcon = ({ style }) => <VectorIcon style={style}>
  <path d="M 16,128 224,24 176,256 98,180 204,48 86,170 Z"/>
</VectorIcon>;

const { object } = PropTypes;

SendIcon.propTypes = {
  style: object
};

export default SendIcon;
