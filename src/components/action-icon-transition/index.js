import PropTypes from 'prop-types';
import React from 'react';
import { Transition } from 'react-transition-group';

const defaultStyle = {
  opacity: '0',
  transform: 'rotate(-90deg) scaleX(0) scaleY(0)',
  transitionDuration: '100ms',
  transitionProperty: 'opacity, transform',
  transitionTimingFunction: 'ease-in-out'
};

const transitionStyle = {
  entered: { opacity: '1', transform: 'rotate(0deg) scaleX(1) scaleY(1)' },
  entering: { opacity: '0', transform: 'rotate(0deg) scaleX(1) scaleY(1)' },
  exited: { opacity: '0', transform: 'rotate(90deg) scaleX(0) scaleY(0)' },
  exiting: { opacity: '0', transform: 'rotate(90deg) scaleX(0) scaleY(0)' }
};

const ActionIconTransition = ({ isActive, render }) => <Transition in={isActive} timeout={100}>
  {(state) => render({ ...defaultStyle, ...transitionStyle[state] })}
</Transition>;

const { bool, func } = PropTypes;

ActionIconTransition.propTypes = {
  isActive: bool.isRequired,
  render: func.isRequired
};

export default ActionIconTransition;
