import React,{useEffect,useState,useRef}  from "react";

import {Col, Row,Button,message,Popconfirm,Spin} from "antd";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

import {useDispatch, useSelector} from "react-redux";
import {getRoomList} from "../../appRedux/actions/Staff";
import { Link } from 'react-router-dom';
const CardList = (props) => {
  const [count, setCount] = useState('');
  const dispatch = useDispatch();
  const roomList = useSelector(({staff}) => staff.roomList);
  //const branchEdit = useSelector(({auth}) => auth.branchEditData);
  const isMounted = useRef(false);
  useEffect(() => {
    console.log('fetching',isMounted);
    /*if(branchEdit !==''){
      dispatch(branchEditReset());
    }*/
   /* if (isMounted.current) {
      console.log('fetching');
      dispatch(branchList());
    } else {
      isMounted.current = true;
    }*/
  // console.log(props);
  if(roomList === ''){
      dispatch(getRoomList());
      console.log('called',roomList)
     // setCount('called')
      return;
   }
  
  }, [roomList]);

  function confirm(e) {
    console.log(e);
    
   // dispatch(branchDelete(e));
    message.success('Record Deleted!');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
  return (
    <div className="gx-main-content gx-pb-sm-4">
      <Row>
        <Col span={24}>
          <ContainerHeader title={"Room List"} />
        </Col>
        <Col span={24}>
          {(roomList!=='')?
          roomList.map((data, index) => (
           
            <div className="gx-user-list gx-card-list">
                <img alt="..." src={data.logo} className="gx-avatar-img gx-border-0"/>
                <div className="gx-description">
                    <div className="gx-flex-row">
                    <h4>{data.Room_name}</h4>
                    </div>

                    <p className="gx-text-grey gx-mb-2">Description : {data.Description}</p>
                </div>
                <div className="gx-card-list-footer">
                <Button type="primary"><Link to={"/room/editRoom/"+data.Id+""}>Edit</Link></Button>
                    <Popconfirm title="Are you sure want to delete this Branch?" onConfirm={()=>confirm(data.Id)} onCancel={cancel} okText="Yes"
                            cancelText="No">
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
