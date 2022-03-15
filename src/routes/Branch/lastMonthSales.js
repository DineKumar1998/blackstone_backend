import React,{useEffect,useState,}  from "react";
import {Card,Radio,message,Spin,Popconfirm,DatePicker,Tag,Tooltip,Modal,Select,Form,Input,Button,Typography} from "antd";
import { Table ,} from "ant-table-extensions";
import {branchBookings,deleteBooking,bookingRest,serviceListData, ResetSaved, CompletedBookings,salesReports,superadminDashboardData} from "../../appRedux/actions";
import {useDispatch, useSelector} from "react-redux";
import {getStaffList,getRoomList,bookingAssign,bookingComplete} from "../../appRedux/actions/Staff";
import SweetAlert from "react-bootstrap-sweetalert";
import moment from "moment";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';
const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
  };
const RadioGroup = Radio.Group;
const { Option } = Select;
const Title = () => {
  const dispatch = useDispatch();
  const Saved = useSelector(({staff}) => staff.Saved);
  const BookingList = useSelector(({auth}) => auth.AllReports);
  const DashBoard = useSelector(({auth}) => auth.superadminDashboardList);
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
  },
  {
    title: 'Booking Date',
    dataIndex: 'Booking_Date',
    render:(text, record)=>(
    <p>{record.Booking_Date}<br></br><p style={{color:"#f9813a"}}>{record.Time}</p></p>
  )
  },
  {
    title: 'Service',
    dataIndex: 'Package',
    render:(text, record)=>(
    <p>{record.Package}</p>
  )
  }, {
    title: 'Customer',
    dataIndex: 'CustomerName',
    render:(text, record)=>(
    <p>{record.CustomerName}<br></br><p style={{color:"#f9813a"}}>{record.Mobile_Number}</p></p>
  )
  }, 
  {
    title: 'Branch',
    dataIndex: 'BranchName',
    render: text => <span >{text}</span>,
  },
  {
    title: 'Therapist Name',
    dataIndex: 'StaffName',
    render:(text, record)=>(
    <p>{record.StaffName}</p>
  )
  },
  {
    title: 'Room',
    dataIndex: 'Room_name',
    render:(text, record)=>(
    <p>{record.Room_name}</p>
  )
  },
 
  {
    title: 'Total_Amount',
    dataIndex: 'Amount',
    render:(data,record)=>(

      <p style={{color:"#fff"}}>{record.Amount} SAR</p>
     
    ),
   
  },
   
  {
  title:'Paid Type',
  dataIndex: 'Booking_Status',
  key:'Id',
  render: (text, record) => (
    <div>
        <p style={{color:"#27a031"}}>{record.Booking_Status}<br></br>
        <p style={{color:"#fff"}}>{record.Paid_Type}</p></p>
    </div>
  )},
 
 ]

 const pinnedData = [
  { Amount: <span style={{ fontWeight: 'bold' }}>Total: 8</span> }
];
  
  useEffect(() => {
   
  if(BookingList === ''){
      dispatch(salesReports(msearch));
      dispatch(superadminDashboardData(msearch));
      
      console.log('called',msearch);
      return;
   }
   

  
  }, [BookingList,staffAll,roomList,msearch]);

  function cancel(e) {
    console.log(e);
    
    //message.error('Click on No');
  }

  
  function refreshall(){
    dispatch(salesReports());
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
     //  dispatch(bookingRest());
     }, 1000);
    
  }
  
  return (
   
      <Card className="gx-card" title={"LAST MONTH SALES REPORT"}>
      
    
    {(BookingList !=='')?
    <Card title="">
      <Spin spinning={loading} tip="Loading...">
      <Table className="gx-table-responsive"
             columns={columns}
             dataSource={BookingList.last_month_sales}
             bordered
             title={false}
             
            // footer={false}
             exportableProps={{ showColumnPicker: false,fileName: "Black_Stones_LastMonth_Reports",btnProps: {
              type: "primary",
              icon:false,
              children: <span style={{color:'#000'}}> Export to CSV</span>,
            }}}
             searchable
             summary={pageData => {
              let totalBorrow = 0;
              
      
              pageData.forEach(({ Amount }) => {
                totalBorrow += Amount;
               
              });
              return (
              
             
                  <tr class="ant-table-row ant-table-row-level-0">
                  <td class="ant-table-cell"></td>
                  <td class="ant-table-cell"></td>
                  <td class="ant-table-cell"></td>
                  <td class="ant-table-cell"></td>
                  <td class="ant-table-cell"></td>
                  <td class="ant-table-cell"></td>
                  <td class="ant-table-cell"><p style={{color: "#fff"}}>Total</p></td>
                  <td class="ant-table-cell"><p style={{color:'#f9813a'}}>{(DashBoard!='')?DashBoard.last_month_sales:0} SAR</p></td>
                  <td class="ant-table-cell"></td>
                  <td class="ant-table-cell"></td>
    </tr>
                  
          
                  
                
              );
             
            }}
             
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
          width={1000}
        >
          <h3 style={{color:'#fff'}}>Select a Staff</h3>
<div>

  
</div>
          
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
  

  );
  function formatAMPM(date) {
        var curDate = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        curDate = curDate < 10 ? '0'+curDate : curDate;
        month = month < 10 ? '0'+month : month;
        var result = curDate + '-' + month + '-' + year;
        return result;
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
  function setModal1Visible(Id){
    window.open("https://blackstones-spa.com/api/booking/viewinvoice?Id="+Id);
   // setModalVisible(true)
   // setBookingId(Id);
    //setTime(timeSlot)
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
