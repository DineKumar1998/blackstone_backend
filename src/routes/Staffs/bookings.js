import React,{useEffect,useState,}  from "react";
import {Card, Table,Radio,message,Spin,Popconfirm,TimePicker,Tag,Tooltip,Modal,Select,Input,Button} from "antd";
import {staffBookings,deleteBooking,serviceListData} from "../../appRedux/actions";
import {useDispatch, useSelector} from "react-redux";
import {getStaffList,getRoomList,bookingComplete} from "../../appRedux/actions/Staff";
import SweetAlert from "react-bootstrap-sweetalert";
const { MonthPicker, RangePicker } = TimePicker;

const RadioGroup = Radio.Group;
const { Option } = Select;
const {TextArea} = Input;
const Title = () => {
  const dispatch = useDispatch();
  const BookingList = useSelector(({auth}) => auth.customerbookings);
  const staffAll = useSelector(({staff}) => staff.staffList);
  const serviceAll = useSelector(({auth}) => auth.serviceList);
  const roomList = useSelector(({staff}) => staff.roomList);
  //const roomList = useSelector(({staff}) => staff.roomList);
  const [loading, setLoading] = useState(false);
  const [modal1Visible, setModalVisible] = useState('');
  const [description, setDescription] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [serviceId, setServiceId] = useState('');
  
  const [bookingId, setBookingId] = useState('');
  const [confirmLoading, setconfirmLoading] = useState('');
  const [roomId, setRoomId] = useState('');
  const [staffId, setStaffId] = useState('');
  const [successAlert, setsuccessAlert] = useState(false);
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  const columns = [
  {
    title: 'Id',
    dataIndex: 'Booking_Id',
    render: text => <span className="gx-link">{text}</span>,
  },
  {
    title: 'Booking Date',
    dataIndex: 'Booking_Date',
    render:(text, record)=>(
    <p>{record.Booking_Date}<br></br><p style={{color:"#f9813a"}}>{record.Time}</p></p>
  )
  },{
    title: 'Service',
    dataIndex: 'Package',
    render:(text, record)=>(
    <p>{record.Package}</p>
  )
  },
    {
    title: 'Customer',
    dataIndex: 'CustomerName',
    render:(text, record)=>(
    <p>{record.CustomerName}<br></br><p style={{color:"#f9813a"}}>{record.Mobile_Number}</p></p>
  )
  }, 
  {
    title: 'Total Amount',
    dataIndex: 'Amount',
    render:(text, record)=>(
      <p style={{color:"#fff"}}>{record.Amount} SAR</p>
    )
  },
  {
    title: 'Room',
    dataIndex: 'Room_name',
  
  },
  
  {title:'Booking Status',
  dataIndex: 'Booking_Status',
  key:'Id',
  render: (text, record) => (
    <div>
   <p style={{color:(text === 'Accepted')?"#DFC15E":"#27a031"}}>{text}</p>
   {(text === 'Accepted')?
   <Popconfirm title="Are you sure want to Complete this booking?" onConfirm={()=>setModal1Visible(record.Id)} onCancel={cancel} okText="Yes"
   cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
       <Button size='small' style={{color:"#fff",backgroundColor:"gray"}}>Complete</Button>
   </Popconfirm>: false}
   </div>
    
  )},
 
  ]
  const onDelete =(key,val) =>{
    setLoading(true);
    //const dispatchAction = useDispatch();
    console.log(key,val);
    let status='No';
    if(val==true){
      status='Yes';
    }
    dispatch(deleteBooking(key,status));
   // setLoading(false);
   setTimeout(() => {
    setLoading(false);
    message.success('Booking is Cancelled!');
   }, 1000);
  
  }
  useEffect(() => {
    if(serviceAll === ''){
      dispatch(serviceListData());
      console.log('called')
   }
  if(BookingList === ''){
      dispatch(staffBookings());
      console.log('called',BookingList);
      return;
   }
   if(staffAll === ''){
    dispatch(getStaffList());
    console.log('called',staffAll)
   // setCount('called')
    return;
 }
 if(roomList === ''){
  dispatch(getRoomList());
  console.log('called',roomList)
 // setCount('called')
  return;
}
  
  }, [BookingList,staffAll,roomList]);

  function cancel(e) {
    console.log(e);
    //message.error('Click on No');
  }
  return (
    <div className="ant-card ant-card-bordered">
   
    {(BookingList !=='')?
    <Card title="BOOKING LIST">
      <Spin spinning={loading} tip="Loading...">
      <Table className="gx-table-responsive"
             columns={columns}
             dataSource={BookingList}
             bordered
             title={false}
             footer={false}
             
      />
      </Spin>
      

    </Card>:false}
    <div  className="gx-card">
      <Modal
          title="Complete Booking"
          style={{top: 20}}
          visible={modal1Visible}
          onOk={() => confirm(false)}
          onCancel={() => CloseVisible(false)}
          confirmLoading={confirmLoading}
          okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#fff'}}}  
          cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}
        >
          <h3 style={{color:'#fff'}}>Any other extra Services</h3>
          <Select
          showSearch
          mode="multiple"
          style={{width: '100%'}}
          placeholder="Select Service"
          optionFilterProp="children"
          onChange={(val)=>setServiceId(val)}
         // onChange={handleChange}
          //onFocus={handleFocus}
          //onBlur={handleBlur}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
         {(serviceAll!=='')?
    serviceAll.map((service, index) => (
        <Option value={service.Id}>{service.ServiceName}</Option>
    )):false}

          </Select>
          <p></p>
          <div></div>
          <TextArea rows={4}  onChange={(val)=>setDescription(val)} style={{ width: '100%' }} placeholder="Please enter Description"  />
        </Modal>
        <SweetAlert show={successAlert} success title={'Booking Completed Successfully!'}
                    onConfirm={()=>onConfirm()}>
       
        </SweetAlert>
      </div>
   
    </div>
  );
  
  function confirm(e) {
    console.log(bookingId);
    //return;
    if(description == ''){
      alert('Please enter the description');
      return;
    }
   
   //alert(description.target.value);
    setconfirmLoading(true)
  //return;
    dispatch(bookingComplete(bookingId,serviceId,description.target.value));
    dispatch(staffBookings());
    
    //message.success('Record Deleted!');
  }
  function onChange (e){
   // console.log('radio checked', e.target.value);
    setRoomId(e.target.value);
 };
  function CloseVisible(e) {
    console.log(e);
    setModalVisible(false)
    //message.error('Click on No');
  }
  function setModal1Visible(Id){
    setModalVisible(true)
    setBookingId(Id);
  }
  function onConfirm (e){
    setsuccessAlert(false);
    
  };
};

export default Title;
