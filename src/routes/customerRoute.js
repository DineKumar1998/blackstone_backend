import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}user/dashboard`} component={asyncComponent(() => import('./Customer/index'))}/>
      <Route path={`${match.url}user/packages`} component={asyncComponent(() => import('./Customer/packages'))}/>
      <Route path={`${match.url}user/bookings`} component={asyncComponent(() => import('./Customer/bookings'))}/>
    </Switch>
  </div>
);



export default App;
