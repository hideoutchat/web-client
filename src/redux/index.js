import { applyMiddleware, createStore } from 'redux';

import Initializer from './initializer';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import React from 'react';

import createMiddleware from './middleware';
import createReducer from './reducer';

const createRedux = (initialState = {}) => {
  const store = createStore(createReducer(initialState), applyMiddleware(...createMiddleware()));

  const Redux = ({ children }) => <Provider store={store}>
    <Initializer>{children}</Initializer>
  </Provider>;

  Redux.propTypes = { children: PropTypes.node };

  return Redux;
};

export default createRedux;
