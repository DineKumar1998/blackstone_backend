import React,{useEffect,useState,useRef}  from "react";

import {Col, Row,Button,message,Popconfirm,Spin} from "antd";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

import {useDispatch, useSelector} from "react-redux";
import {branchEditReset} from "../../appRedux/actions/Auth";
import {getStaffList,staffDelete} from "../../appRedux/actions/Staff";
import { Link } from 'react-router-dom';
const CardList = (props) => {
  const [count, setCount] = useState('');
  const dispatch = useDispatch();
  const staffAll = useSelector(({staff}) => staff.staffList);
  const staffEdit = useSelector(({staff}) => staff.staffEditData);
  const isMounted = useRef(false);
  useEffect(() => {
    console.log('fetching',isMounted);
    if(staffEdit !==''){
      dispatch(branchEditReset());
    }
 
  if(staffAll === ''){
      dispatch(getStaffList());
      console.log('called',staffAll)
     // setCount('called')
      return;
   }
  
  }, [staffAll]);

  function confirm(e) {
    console.log(e);
    
    dispatch(staffDelete(e));
   // message.success('Record Deleted!');
    message.success({
      content: 'Record Deleted!',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
        //backgroundColor:'black'
        color:'black'
      },
    });
  }

  function cancel(e) {
    console.log(e);
   // message.error('Click on No');
  }
  return (
    <div className="gx-main-content gx-pb-sm-4">
      <Row>
        <Col span={24}>
          <ContainerHeader title={"Staff List"} />
        </Col>
        {(staffAll !=='')?
               (staffAll.length>0)?'':
            <p className="gx-text-center">
       Staff list Not Found
      </p>:''}
        <Col span={24}>
          {(staffAll!=='')?

          staffAll.map((data, index) => (
           
            <div className="gx-user-list gx-card-list">
               
     {(data.Image)? <img alt="..." src={data.Image} className="gx-avatar-img gx-border-0"/>:<img alt="..." src='https://via.placeholder.com/150x150' className="gx-avatar-img gx-border-0"/>}
      <div className="gx-description">
        <div className="gx-flex-row">
          <h4>{data.staffName}</h4>
          <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
          <span>{data.Designation}</span>
          
        </div>
       
        <p>
          <span className="gx-mr-3">Email : {data.email_Id}</span>
          <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
          <span className="gx-mr-3">Mobile Number : {data.mobileNumber}</span>
          <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
          <span className="gx-mr-3">Education : {data.Education}</span>
          
        </p>
        <p> <span>Age : {data.startTime} - {data.Age}</span>
        <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
        <span className="gx-mr-3">Date Of Birth : {data.Dob}</span>
        <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
        <span className="gx-mr-3">Experince : {data.Experience} Years</span>
        </p>
        <p> <span>Shift Timing : {data.startTime} - {data.endTime}</span>
        <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
        <span className="gx-mr-3">Salary : {data.Salary}</span>
        <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
        <span className="gx-mr-3">Date of Joining : {data.DateOfJoining}</span>
        </p>
        <p>
          <span className="gx-mr-3">User Name : {data.mobileNumber}</span>
          <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
          <span className="gx-mr-3">Password : {data.Password}</span>
          
        </p>
       {/* <p className="gx-text-grey gx-mb-2">Date of Joining : {data.DateOfJoining}</p>*/}
        
      </div>
      <div className="gx-card-list-footer">
       <Button type="primary"><Link to={"/staff/editStaff/"+data.Id+""}>Edit</Link></Button>
        <Popconfirm title="Are you sure want to delete this Staff?" onConfirm={()=>confirm(data.Id)} onCancel={cancel} okText="Yes"
                  cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
        <Button type="danger">Delete</Button>
      </Popconfirm>
        
      </div>
    </div>
          )):<div style={{alignSelf:'center'}}><Spin/></div>}
        </Col>
      </Row>
    </div>
  )
};

export default CardList;
