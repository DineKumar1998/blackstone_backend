import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}Dashboard`} component={asyncComponent(() => import('./Dashboard'))}/>
     
      <Route path={`${match.url}newBranch`} component={asyncComponent(() => import('./SamplePage/Registration'))}/>
      <Route path={`${match.url}branchList`} component={asyncComponent(() => import('./SamplePage/branchList'))}/>
      <Route path={`${match.url}editBranch/:Id`} component={asyncComponent(() => import('./SamplePage/editBranch'))}/>
      
      <Route path={`${match.url}newProduct`} component={asyncComponent(() => import('./Products/Registration'))}/>
      <Route path={`${match.url}editProduct/:Id`} component={asyncComponent(() => import('./Products/editProduct'))}/>
      <Route path={`${match.url}productList`} component={asyncComponent(() => import('./Products'))}/>
     
      <Route path={`${match.url}newService`} component={asyncComponent(() => import('./Service/Registration'))}/>
      <Route path={`${match.url}editService/:Id`} component={asyncComponent(() => import('./Service/editService'))}/>
      <Route path={`${match.url}serviceList`} component={asyncComponent(() => import('./Service'))}/>
      <Route path={`${match.url}serviceTimeSlot/:Id`} component={asyncComponent(() => import('./Service/serviceTimeSlot'))}/>
      <Route path={`${match.url}userManual`} component={asyncComponent(() => import('./superadmin/userManual'))}/>

      <Route path={`${match.url}newPackage`} component={asyncComponent(() => import('./Packages/Registration'))}/>
      <Route path={`${match.url}packageList`} component={asyncComponent(() => import('./Packages'))}/>
      <Route path={`${match.url}editPackage/:Id`} component={asyncComponent(() => import('./Packages/editPackage'))}/>
      <Route path={`${match.url}packageTimeSlot/:Id`} component={asyncComponent(() => import('./Packages/packageTimeslot'))}/>
      
      <Route path={`${match.url}staff/newStaff`} component={asyncComponent(() => import('./Staffs/Registration'))}/>
      <Route path={`${match.url}staff/editStaff/:Id`} component={asyncComponent(() => import('./Staffs/editStaff'))}/>
      <Route path={`${match.url}staff/staffList`} component={asyncComponent(() => import('./superadmin/staffsList'))}/>
      <Route path={`${match.url}customers/customersList`} component={asyncComponent(() => import('./superadmin/customersList'))}/>

      <Route path={`${match.url}superadmin/bookings`} component={asyncComponent(() => import('./superadmin/bookings'))}/>

      <Route path={`${match.url}superadmin/completedReports`} component={asyncComponent(() => import('./superadmin/completedReports'))}/>
      <Route path={`${match.url}superadmin/cancelledReports`} component={asyncComponent(() => import('./superadmin/cancelledReports'))}/>
      <Route path={`${match.url}superadmin/BranchWiseReports`} component={asyncComponent(() => import('./superadmin/branchWiseReports'))}/>
      <Route path={`${match.url}superadmin/LastWeekReports`} component={asyncComponent(() => import('./superadmin/lastWeekSales'))}/>
      <Route path={`${match.url}superadmin/TodaySalesReports`} component={asyncComponent(() => import('./superadmin/todaySales'))}/>
      <Route path={`${match.url}superadmin/CurrentMonthReports`} component={asyncComponent(() => import('./superadmin/currentMonthSales'))}/>
      <Route path={`${match.url}superadmin/LastMonthReports`} component={asyncComponent(() => import('./superadmin/lastMonthSales'))}/>
      <Route path={`${match.url}superadmin/LastSixMonthReports`} component={asyncComponent(() => import('./superadmin/lastSixMonthSales'))}/>
      <Route path={`${match.url}superadmin/CurrentYearSales`} component={asyncComponent(() => import('./superadmin/currentYearSales'))}/>
      <Route path={`${match.url}superadmin/StaffWiseReports`} component={asyncComponent(() => import('./superadmin/staffWiseReport'))}/>
      <Route path={`${match.url}superadmin/ServiceWiseReports`} component={asyncComponent(() => import('./superadmin/serviceWiseReport'))}/>
      <Route path={`${match.url}superadmin/PackageWiseReports`} component={asyncComponent(() => import('./superadmin/packageWiseReport'))}/>
      <Route path={`${match.url}superadmin/CustomerWiseReports`} component={asyncComponent(() => import('./superadmin/customerWiseReports'))}/>

      <Route path={`${match.url}superadmin/completedBookings`} component={asyncComponent(() => import('./superadmin/completedBookings'))}/>
      <Route path={`${match.url}superadmin/placedBookings`} component={asyncComponent(() => import('./superadmin/placedBookings'))}/>
      <Route path={`${match.url}superadmin/assignedBookings`} component={asyncComponent(() => import('./superadmin/assignedBookins'))}/>
      <Route path={`${match.url}superadmin/cancelledBookings`} component={asyncComponent(() => import('./superadmin/cancelledBookings'))}/>
      <Route path={`${match.url}superadmin/sendPromotion`} component={asyncComponent(() => import('./superadmin/sendMessage'))}/>
    </Switch>
  </div>
);

{/*const App = (props) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route history={props.history} path="/sample" component={asyncComponent(() => import('./SamplePage'))}/>
      <Route history={props.history} path="/newBranch" component={asyncComponent(() => import('./SamplePage/Registration'))}/>
      <Route history={props.history} path="/branchList" component={asyncComponent(() => import('./SamplePage/branchList'))}/>
    </Switch>
  </div>
);*/}

export default App;
