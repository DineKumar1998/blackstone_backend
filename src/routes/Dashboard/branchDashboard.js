import React,{useEffect} from "react";
import {Col, Row} from "antd";
import {Area, AreaChart, Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";

import IconWithTextCard from "components/Metrics/IconWithTextCard";
import ChartCard from "components/Metrics/ChartCard";
import GrowthCard from "components/Metrics/GrowthCard";
import EcommerceStatus from "components/Metrics/EcommerceStatus";
import TrafficRaiseCard from "components/Metrics/TrafficRaiseCard";
//import TotalEncomeCard from "components/Metrics/TotalEncomeCard";
import QueriesCard from "components/Metrics/QueriesCard";
import Auxiliary from "util/Auxiliary";
import {growth2Data, increamentData, increamentRevenueData, lineData2, revenueData, trafficRaiseData} from "./data"
import {useDispatch, useSelector} from "react-redux";
import {BranchDashboardData} from "../../appRedux/actions";
import InfoView from "../../components/InfoView";
const Metrics = (props) => {
  const dispatch = useDispatch();
  const DashBoard = useSelector(({auth}) => auth.superadminDashboardList);
  useEffect(() => {
    console.log(props);
   
    if(DashBoard === ''){
       dispatch(BranchDashboardData());
       console.log('called')
    }
   
   }, [DashBoard]);
  return (
    <Auxiliary>
      <Row>
      <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/newBooking')}>
          <IconWithTextCard icon="hotel-booking"  title={'New Booking'} subTitle=""/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/completedReports')}>
          <IconWithTextCard icon="data-display"  title={(DashBoard!='')?DashBoard.TotalSales+' SAR':''} subTitle="Total Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/TodaySalesReports')}>
          <IconWithTextCard icon="data-display"  title= {(DashBoard!='')?DashBoard.TodaySales+' SAR':''} subTitle="Today Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/LastWeekReports')}>
          <IconWithTextCard icon="data-display"  title={(DashBoard!='')?DashBoard.last_week_sales+' SAR':''} subTitle="Last Week Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/CurrentMonthReports')}>
          <IconWithTextCard icon="data-display"  title={(DashBoard!='')?DashBoard.current_month_sales+' SAR':''} subTitle="This Month Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/LastMonthReports')}>
          <IconWithTextCard icon="data-display" title={(DashBoard!='')?DashBoard.last_month_sales+' SAR':''} subTitle="Last Month Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/LastSixMonthReports')}>
          <IconWithTextCard icon="data-display" title={(DashBoard!='')?DashBoard.last_six_month_sales+' SAR':''} subTitle="Last six Month Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/CurrentYearSales')}>
          <IconWithTextCard icon="data-display" title={(DashBoard!='')?DashBoard.current_year_sales+' SAR':''} subTitle="This Year Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="user" title={(DashBoard!='')?DashBoard.TotalSales+' SAR':''} subTitle="Staff Wise Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/ServiceWiseReports')}>
          <IconWithTextCard icon="card" title={(DashBoard!='')?DashBoard.ServiceWise+' SAR':''} subTitle="Service Wise Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/PackageWiseReports')}>
          <IconWithTextCard icon="card" title={(DashBoard!='')?DashBoard.PackageWise+' SAR':''} subTitle="Package Wise Sales"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/CustomerWiseReports')}>
          <IconWithTextCard icon="user" title={(DashBoard!='')?DashBoard.TotalSales+' SAR':''} subTitle="Customer Wise Sales"/>
        </Col>
       {/*<Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="apps"  title={(DashBoard!='')?DashBoard.Branches:''} subTitle="Number Of Branches"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="user"  title= {(DashBoard!='')?DashBoard.Staffs:''} subTitle="Number Of Staff List"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="product-list"  title={(DashBoard!='')?DashBoard.Product:''} subTitle="Number Of Products"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="product-grid"  title={(DashBoard!='')?DashBoard.Service:''} subTitle="Number Of Services"/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="card" title={(DashBoard!='')?DashBoard.Packages:''} subTitle="Number Of Packages"/>
  </Col>
       
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="user"  title= {(DashBoard!='')?DashBoard.Customers:''} subTitle="Number Of Customers"/>
        </Col>*/}
        <Col xl={8} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <IconWithTextCard icon="orders"  title= {(DashBoard!='')?DashBoard.TotalBookings:''} subTitle="Total Number Of Bookings"/>
        </Col>
        <Col xl={8} lg={12} md={12} sm={12} xs={12} className="gx-col-full" style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/placedBookings')}>
          <IconWithTextCard icon="orders"  title= {(DashBoard!='')?DashBoard.TodayBookings:''} subTitle="Today Bookings"/>
        </Col>
       
        <Col xl={8} lg={12} md={12} sm={12} xs={12} style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/placedBookings')}>
          <IconWithTextCard  icon="orders" title={(DashBoard!='')?DashBoard.PlacedBookings:''} 
                           subTitle="Current Bookings" colorSubTitle="grey"/>
        </Col>
        <Col xl={6} lg={12} md={8} sm={12} xs={24}  style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/assignedBookings')}>
          <EcommerceStatus  icon="orders" title={(DashBoard!='')?DashBoard.AcceptedBookings:''} 
                           subTitle="Assigned Bookings" colorSubTitle="grey"/>
        </Col>
        <Col xl={6} lg={12} md={8} sm={12} xs={24} style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/completedBookings')}>
          <EcommerceStatus  icon="orders" title={(DashBoard!='')?DashBoard.CompletedBookings:''}
                           subTitle="Completed Bookings" colorSubTitle="grey"/>
        </Col>
        <Col xl={6} lg={12} md={8} sm={12} xs={24} style={{cursor:'pointer'}} onClick={()=>props.history.push('/branch/cancelledBookings')}>
          <EcommerceStatus icon="orders" title={(DashBoard!='')?DashBoard.CancelledBookings:''}  subTitle="Cancelled Bookings"
                           colorSubTitle="grey"/>
        </Col>
       
      
      </Row>
      <InfoView/>
    </Auxiliary>
  );
};
export default Metrics;
