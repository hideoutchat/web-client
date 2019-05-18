import { Route, BrowserRouter as Router } from 'react-router-dom';

import DefaultRoute from './default';
import React from 'react';

const createRoutes = () => {
  const Routes = () => <Router>
    <Route component={DefaultRoute} exact path="/"/>
  </Router>;

  return Routes;
};

export default createRoutes;
