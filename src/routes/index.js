import { Route, BrowserRouter as Router } from 'react-router-dom';

import DialogRoute from './dialog';
import NetworkRoute from './network';
import PrivateChatRoute from './private-chat';
import React from 'react';
import RequestNameRoute from './request-name';
import WelcomeByNameRoute from './welcome-by-name';

const createRoutes = () => {
  const Routes = () => <Router>
    <Route component={RequestNameRoute} exact path="/"/>
    <Route component={WelcomeByNameRoute} exact path="/welcome"/>
    <Route component={NetworkRoute} exact path="/network"/>
    <Route component={PrivateChatRoute} exact path="/topics/:id"/>
    <Route component={DialogRoute} path="/"/>
  </Router>;

  return Routes;
};

export default createRoutes;
