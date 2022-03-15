import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      
      <Route path={`${match.url}staff/dashboard`} component={asyncComponent(() => import('./Dashboard/staffDashboard'))}/>
      <Route path={`${match.url}vacation/apply`} component={asyncComponent(() => import('./Staffs/newLeave'))}/>
      <Route path={`${match.url}vacation/index`} component={asyncComponent(() => import('./Staffs/leaveList'))}/>
      <Route path={`${match.url}staff/bookings`} component={asyncComponent(() => import('./Staffs/bookings'))}/>
      
      <Route path={`${match.url}staff/completedBookings`} component={asyncComponent(() => import('./Staffs/completedBookings'))}/>
      <Route path={`${match.url}staff/assignedBookings`} component={asyncComponent(() => import('./Staffs/assignedBookins'))}/>
      <Route path={`${match.url}staff/cancelledBookings`} component={asyncComponent(() => import('./Staffs/cancelledBookings'))}/>
      <Route path={`${match.url}staff/completedReports`} component={asyncComponent(() => import('./Staffs/completedReports'))}/>
      <Route path={`${match.url}staff/cancelledReports`} component={asyncComponent(() => import('./Staffs/cancelledReports'))}/>
    </Switch>
  </div>
);



export default App;
