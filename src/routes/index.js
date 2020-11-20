import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import DialogRoute from './dialog';
import NetworkRoute from './network';
import PrivateChatRoute from './private-chat';
import React from 'react';
import ShortcutRoute from './shortcut';
import StateAwareFork from '/components/state-aware-fork';

const createRoutes = () => {
  const Routes = () => <Router>
    <Route component={ShortcutRoute} exact path="/"/>
    <StateAwareFork
      condition={(state) => Boolean(state.connection)}
      whenFalse={() => <Redirect to="/"/>}
      whenTrue={() => <Switch>
        <Route component={NetworkRoute} exact path="/network"/>
        <Route component={PrivateChatRoute} exact path="/topics/:id"/>
        <Redirect to="/network"/>
      </Switch>}
    />
    <Route component={DialogRoute} path="/"/>
  </Router>;

  return Routes;
};

export default createRoutes;
