import React,{useEffect,useState,}  from "react";
import {Card, Table,Radio,message,Spin,Popconfirm,TimePicker,Tag,Tooltip,Modal,Select,Form,Input,Button} from "antd";
import {branchBookings,deleteBooking,bookingRest,serviceListData, ResetSaved} from "../../appRedux/actions";
import {useDispatch, useSelector} from "react-redux";
import {getStaffList,getRoomList,bookingAssign,bookingComplete} from "../../appRedux/actions/Staff";
import SweetAlert from "react-bootstrap-sweetalert";
const { MonthPicker, RangePicker } = TimePicker;

const RadioGroup = Radio.Group;
const { Option } = Select;
const Title = () => {
  const dispatch = useDispatch();
  const Saved = useSelector(({staff}) => staff.Saved);
  const BookingList = useSelector(({auth}) => auth.customerbookings);
  const staffAll = useSelector(({staff}) => staff.staffList);
  const roomList = useSelector(({staff}) => staff.roomList);
  const serviceAll = useSelector(({auth}) => auth.serviceList);
  const [loading, setLoading] = useState(false);
  const [modal1Visible, setModalVisible] = useState('');
  const [modalCompleteVisible, setModalCompleteVisible] = useState('');
  const [description, setDescription] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [time, setTime] = useState('');
  const [msearch, setMsearch] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [confirmLoading, setconfirmLoading] = useState('');
  const [roomId, setRoomId] = useState('');
  const [staffId, setStaffId] = useState('');
  const [successAlert, setsuccessAlert] = useState(false);
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    color:'#fff'
    
  };
  const [form] = Form.useForm();
  const {TextArea} = Input;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const columns = [
  {
    title: 'Booking Id',
    dataIndex: 'Booking_Id',
    render: text => <span className="gx-link">{text}</span>,
  }, {
    title: 'Service',
    dataIndex: 'Package',
    render:(text, record)=>(
    <p>{record.Package}<br></br><Tag color="#f9813a">{record.Amount} SAR</Tag></p>
  )
  }, {
    title: 'Customer',
    dataIndex: 'CustomerName',
    render:(text, record)=>(
    <p>{record.CustomerName}<br></br><Tag color="#f9813a">{record.Mobile_Number}</Tag></p>
  )
  }, 
  , {
    title: 'Time slot',
    dataIndex: 'Time',
  }, 
  /*{
    title: 'Booking Status',
    dataIndex: 'Booking_Status',
    render:(text, record)=>(
        (text === 'Placed')?<Tag color="#87d068">Placed</Tag>:<Tag color="#87d068">Accepted</Tag>
    )
  }*/,
   {
    title: 'Booking Date',
    dataIndex: 'Booking_Date',
    render: text => <span className="gx-link">{text}</span>,
  },
  {title:'Assign',
  dataIndex: 'Booking_Status',
  key:'Id',
  render: (text, record) => (
    <div>
   {(text === 'Placed')?
        <Popconfirm style={{cursor:'pointer'}} title="Are you sure want to Assign this booking?" onConfirm={()=>setModal1Visible(record.Id,record.Time)} onCancel={cancel} okText="Yes"
        cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
            <Tag color="#000" style={{cursor:'pointer'}}>Assign</Tag>
        </Popconfirm>: 
        <Tooltip placement="topLeft" title={(text === 'Placed')?'Placed':text}><p style={{color:"#fff"}} >{(text === 'Placed')?'Placed':text}</p></Tooltip>}
       
        {(text === 'Accepted')?
        <Popconfirm title="Are you sure want to Complete this booking?" onConfirm={()=>setModal2Visible(record.Id)} onCancel={cancel} okText="Yes"
        cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
            <Button size='small' style={{color:"#fff",backgroundColor:"gray"}}>Complete</Button>
        </Popconfirm>: false}
        </div>
  )},
  {title:'Reject',
  dataIndex: 'Booking_Status',
  key:'Id',
  render: (text, record) => (
    (text === 'Placed' || text === 'Accepted')?
        <Popconfirm title="Are you sure want to Accept this booking?" onConfirm={()=>onDelete(record.Id)} onCancel={cancel} okText="Yes"
        cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
            <Tag color="#f50">Reject</Tag>
        </Popconfirm>: 
        (text === 'Rejected')?<Tooltip placement="topLeft" title="Accepted"><Tag color="#f50">Rejected</Tag></Tooltip>:false
    
  )},]
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
    if (Saved !== '') {
      dispatch(ResetSaved());
    }
    if(serviceAll === ''){
      dispatch(serviceListData());
      console.log('called')
   }
  if(BookingList === ''){
      dispatch(branchBookings(msearch));
      console.log('called',msearch);
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

  
  }, [BookingList,staffAll,roomList,msearch]);

  function cancel(e) {
    console.log(e);
    
    //message.error('Click on No');
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = values => {
   // setMsearch(values.mobilenumber)
   setLoading(true);
   dispatch(branchBookings(values.mobilenumber));
    setTimeout(() => {
      setLoading(false);
     //  dispatch(bookingRest());
     }, 1000);
    

    
  }
  function refreshall(){
    dispatch(branchBookings());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
     //  dispatch(bookingRest());
     }, 1000);
    
  }
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="966">+966</Option>
        {/*<Option value="91">+91</Option>*/}
      </Select>
    </Form.Item>
  );
  return (
    <div className="ant-card ant-card-bordered" >
      <Card className="gx-card" title={msearch}>
       <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{prefix: '966'}}
      scrollToFirstError
      layout="inline"
    >
      <Form.Item
        name="mobilenumber"
        label='Mobile number'
      
        rules={[
          
          {
            required: true,
            message: 'Please Enter the customer mobile number',
          },
        ]}
      >
       <Input  style={{ width: '100%' }} placeholder="customer mobile number"  />
      </Form.Item>
     
    
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={()=>refreshall()}>
          All
        </Button>
      </Form.Item>
    </Form>
    {(BookingList !=='')?
    <Card title="">
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
          title="Assign Booking"
          style={{top: 20}}
          visible={modal1Visible}
          onOk={() => confirm(false)}
          onCancel={() => CloseVisible(false)}
          confirmLoading={confirmLoading}
          cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}
          okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#fff'}}}
        >
          <h3 style={{color:'#fff'}}>Select a Staff</h3>
          <Select
          showSearch
          style={{width: '100%'}}
          placeholder="Select Staff"
          optionFilterProp="children"
           onChange={(val)=>setStaffId(val)}
          //onFocus={handleFocus}
          //onBlur={handleBlur}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
          {(staffAll !=='')?
          staffAll.map((item, i) =>
          <Option value={item.Id}>{item.staffName}</Option>
          ):false}

          </Select>
        <h3 style={{color:'#fff',paddingTop:20}}>Select a Room</h3>
         <RadioGroup onChange={(e)=>onChange(e)} value={roomId}>
         {(roomList !=='')?
         roomList.map((item, i) =>
          <Radio style={radioStyle} value={item.Id}>{item.Room_name}</Radio>
          ):false}
          
         {/* <Radio style={radioStyle} value={2}>Option B</Radio>
          <Radio style={radioStyle} value={3}>Option C</Radio>*/}
         </RadioGroup>
         <h3 style={{color:'#fff',paddingTop:20}}>Time Slot : {time}</h3>
         
         {/*<RangePicker onChange={(e)=>setTimeSlot(e)} className='gx-mb-3 gx-w-100' showTime={{ format: 'HH:mm a', use12Hours:true }} />*/}
        </Modal>
        <SweetAlert show={successAlert} success title={'Booking Assigned Successfully!'}
                    onConfirm={()=>onConfirm()}>
       
        </SweetAlert>
      </div>

      <div  className="gx-card">
      <Modal
          title="Complete Booking"
          style={{top: 20}}
          visible={modalCompleteVisible}
          onOk={() => bookingConfirm(false)}
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

      </Card>
    </div>

  );
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function bookingConfirm(e) {
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
    dispatch(branchBookings());
    
    //message.success('Record Deleted!');
  }
  function confirm(e) {
    //console.log(e);
    if(staffId == ''){
      alert('Please Select one staff');
      return;
    }
   
    if(roomId == ''){
      alert('Please Select the room');
      return;
    }
   /* if(timeSlot == ''){
      alert('Please Select the Time Slot');
      return;
    }*/
    setconfirmLoading(true)
    //let startTime=formatAMPM(timeSlot[0]['_d']);
    //let endTime=formatAMPM(timeSlot[1]['_d']);
    dispatch(bookingAssign(bookingId,staffId,roomId));
    
    //message.success('Record Deleted!');
  }
  function onChange (e){
   // console.log('radio checked', e.target.value);
    setRoomId(e.target.value);
 };
  function CloseVisible(e) {
    console.log(e);
    setModalVisible(false)
    setModalCompleteVisible(false)
    
    //message.error('Click on No');
  }
  function setModal1Visible(Id,timeSlot){
    setModalVisible(true)
    setBookingId(Id);
    setTime(timeSlot)
  }
  function setModal2Visible(Id,timeSlot){
    setModalCompleteVisible(true)
    setBookingId(Id);
   //setTime(timeSlot)
  }
  function onConfirm (e){
    setsuccessAlert(false);
    
  };
};

export default Title;
