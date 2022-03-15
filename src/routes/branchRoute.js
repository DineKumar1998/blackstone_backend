import React from "react";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}Dashboard`} component={asyncComponent(() => import('./Dashboard/branchDashboard'))}/>
      {/*<Route path={`${match.url}staff/newStaff`} component={asyncComponent(() => import('./Staffs/Registration'))}/>
      <Route path={`${match.url}staff/staffList`} component={asyncComponent(() => import('./Staffs/staffsList'))}/>
<Route path={`${match.url}staff/editStaff/:Id`} component={asyncComponent(() => import('./Staffs/editStaff'))}/>*/}
      <Route path={`${match.url}customers/newCustomer`} component={asyncComponent(() => import('./Branch/newCustomer'))}/>
      <Route path={`${match.url}customers/customersList`} component={asyncComponent(() => import('./Branch/customersList'))}/>
      <Route path={`${match.url}room/newRoom`} component={asyncComponent(() => import('./Branch/newRoom'))}/>
      <Route path={`${match.url}room/index`} component={asyncComponent(() => import('./Branch/RoomList'))}/>
      <Route path={`${match.url}room/editRoom/:Id`} component={asyncComponent(() => import('./Branch/editRoom'))}/>
      <Route path={`${match.url}vacation/index`} component={asyncComponent(() => import('./Branch/leaveList'))}/>
      <Route path={`${match.url}branch/bookings`} component={asyncComponent(() => import('./Branch/bookings'))}/>
      <Route path={`${match.url}branch/completedBookings`} component={asyncComponent(() => import('./Branch/completedBookings'))}/>
      <Route path={`${match.url}branch/placedBookings`} component={asyncComponent(() => import('./Branch/placedBookings'))}/>
      <Route path={`${match.url}branch/assignedBookings`} component={asyncComponent(() => import('./Branch/assignedBookins'))}/>
      <Route path={`${match.url}branch/cancelledBookings`} component={asyncComponent(() => import('./Branch/cancelledBookings'))}/>
      <Route path={`${match.url}newBooking`} component={asyncComponent(() => import('./Branch/newBooking'))}/>


      <Route path={`${match.url}branch/completedReports`} component={asyncComponent(() => import('./Branch/completedReports'))}/>
      <Route path={`${match.url}branch/cancelledReports`} component={asyncComponent(() => import('./Branch/cancelledReports'))}/>
      <Route path={`${match.url}branch/LastWeekReports`} component={asyncComponent(() => import('./Branch/lastWeekSales'))}/>
      <Route path={`${match.url}branch/TodaySalesReports`} component={asyncComponent(() => import('./Branch/todaySales'))}/>
      <Route path={`${match.url}branch/CurrentMonthReports`} component={asyncComponent(() => import('./Branch/currentMonthSales'))}/>
      <Route path={`${match.url}branch/LastMonthReports`} component={asyncComponent(() => import('./Branch/lastMonthSales'))}/>
      <Route path={`${match.url}branch/LastSixMonthReports`} component={asyncComponent(() => import('./Branch/lastSixMonthSales'))}/>
      <Route path={`${match.url}branch/CurrentYearSales`} component={asyncComponent(() => import('./Branch/currentYearSales'))}/>
      <Route path={`${match.url}branch/StaffWiseReports`} component={asyncComponent(() => import('./Branch/staffWiseReport'))}/>
      <Route path={`${match.url}branch/ServiceWiseReports`} component={asyncComponent(() => import('./Branch/serviceWiseReport'))}/>
      <Route path={`${match.url}branch/PackageWiseReports`} component={asyncComponent(() => import('./Branch/packageWiseReport'))}/>
      <Route path={`${match.url}branch/CustomerWiseReports`} component={asyncComponent(() => import('./Branch/customerWiseReports'))}/>


    </Switch>
  </div>
);

export default App;
