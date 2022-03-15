import React,{useEffect,useState,useRef}  from "react";

import {Col, Row,Button,message,Popconfirm,Spin} from "antd";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

import {useDispatch, useSelector} from "react-redux";
import {branchList,branchEditReset,branchDelete} from "../../appRedux/actions";
import { Link } from 'react-router-dom';
const CardList = (props) => {
  const [count, setCount] = useState('');
  const dispatch = useDispatch();
  const branchAll = useSelector(({auth}) => auth.branchAll);
  const branchEdit = useSelector(({auth}) => auth.branchEditData);
  const isMounted = useRef(false);
  useEffect(() => {
    console.log('fetching',isMounted);
    if(branchEdit !==''){
      dispatch(branchEditReset());
    }
   /* if (isMounted.current) {
      console.log('fetching');
      dispatch(branchList());
    } else {
      isMounted.current = true;
    }*/
  // console.log(props);
  if(branchAll === ''){
      dispatch(branchList());
      console.log('called',branchAll)
     // setCount('called')
      return;
   }
  
  }, [branchEdit,branchAll]);

  function confirm(e) {
    console.log(e);
    
    dispatch(branchDelete(e));
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
    //message.error('Click on No');
  }
  return (
    <div className="gx-main-content gx-pb-sm-4">
      <Row>
        <Col span={24}>
          <ContainerHeader title={"Branch List"} />
        </Col>
        <Col span={24}>
          {(branchAll!=='')?
          branchAll.map((data, index) => (
           
            <div className="gx-user-list gx-card-list">
      <img alt="..." src={data.logo} className="gx-avatar-img gx-border-0"/>
      <div className="gx-description">
        <div className="gx-flex-row">
          <h4>{data.name}</h4>
         
         
        </div>
       
        <p>
        
          <span>Mobile : {data.mobileNumber}</span>
          <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
          <span>Landline : {data.landLine}</span>
          <span className="gx-mr-3">Email : {data.emailId}</span>
          
          
        </p>
        <p> <span>Timing : {data.startTime} - {data.endTime}</span>
        <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
          <span className="gx-mr-3">Fax Number : {data.faxNumber}</span></p>
        
         
        <p>
          <span className="gx-mr-3">User Name : {data.emailId}</span>
          <span className="gx-d-inline-block gx-toolbar-separator">&nbsp;</span>
          <span className="gx-mr-3">Password : {data.password}</span>
          
        </p>
        <p className="gx-text-grey gx-mb-2">Address : {data.address}</p>
      </div>
      <div className="gx-card-list-footer">
       <Button type="primary"><Link to={"/editBranch/"+data.Id+""}>Edit</Link></Button>
        <Popconfirm title="Are you sure want to delete this Branch?" onConfirm={()=>confirm(data.Id)} onCancel={cancel} okText="Yes"
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
