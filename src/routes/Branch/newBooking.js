import React, { useState,useEffect} from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  InputNumber,
  Upload,
  Row,
  Modal,
  DatePicker,
  Button,
  Card,TimePicker,message,AutoComplete,Tag
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {staffRigister,branchList,ServicePackageList,getTimeslots,sendOTP,checkOTP,PlacedBookings,ResetSaved} from "../../appRedux/actions";
//import CircularProgress from "components/CircularProgress/index";
import CircularProgress from "../../components/CircularProgress/index";
import {getCustomerListAdmin,getCustomerListBranch} from "../../appRedux/actions/Staff";

import moment from 'moment';
const { MonthPicker, RangePicker } = TimePicker;
//const { Option } = Select;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const CheckableTag = Tag.CheckableTag
const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};
const {TextArea} = Input;

const preventDefault = (e) => {
  e.preventDefault();
};

function log(e) {
  console.log(e);
}
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

const Registration = (props) => {
  const dispatch = useDispatch();
  const Saved = useSelector(({staff}) => staff.Saved);
  const branchAll = useSelector(({auth}) => auth.branchAll);
  const serviceAll = useSelector(({auth}) => auth.servicePackageData);
  const TimeSlots = useSelector(({auth}) => auth.timeSlotsData);
  const receivedOtp = useSelector(({auth}) => auth.receivedOtp);
  const customerAll = useSelector(({staff}) => staff.customersList);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeslot, setTimeslot] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [customerArray, setCustomerArray] = useState([]);
  //const [emailId, setEmailId] = useState('');
  
  const [confirmLoading, setconfirmLoading] = useState('');
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1 //January is 0!
  dd = dd < 10 ? '0'+dd : dd;
  mm = mm < 10 ? '0'+mm : mm;
  var yyyy = today.getFullYear();
  var curDate=dd+'-'+mm+'-'+yyyy;
  const [bookingDate, setBookingDate] = useState(curDate);
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
  };
  
  const onFinish = values => {
    values['bookingDate']=bookingDate;
    console.log('Received values of form: ', values);
    console.log(values)
    //console.log('Received values of form: ', values.Dob['_d'].getDate());
    setModalVisible(true);
   
    dispatch(sendOTP(values));
    
  };
  

function handleChange(e) {
  //e.preventDefault();
  console.log('appa',mobile);
  //return;
  console.log(e);
  setServiceId(e);
  dispatch(getTimeslots(e,bookingDate,name,mobile,email,description));
}
function formatAMPM(date) {
  var curDate = date.getDate();
  var month = date.getMonth()+1;
  var year = date.getFullYear();
  curDate = curDate < 10 ? '0'+curDate : curDate;
  month = month < 10 ? '0'+month : month;
  var result = curDate + '-' + month + '-' + year;
  return result;
}
function handleChangeDate(e){
  var bookDate=formatAMPM(e['_d'])
  setBookingDate(bookDate);
 // dispatch(getTimeslots(serviceId,bookDate,name,mobile,email,description));
}

  useEffect(() => {
    if(customerAll === ''){

      dispatch(getCustomerListAdmin());
      console.log('called',customerAll)
    
   }
   if(customerAll != ''){
    //var rows = [];
    for (var i = 0; i < customerAll.length; i++) {
      customerArray.push(customerAll[i]['mobileNumber']);
    }
   }
    if (Saved !== '') {
      setIsLoading('');
      message.success('Booking Created Successfully!');
      
      setTimeout(() => {
        dispatch(getCustomerListAdmin());
        dispatch(getCustomerListBranch());
        dispatch(PlacedBookings());
        dispatch(ResetSaved());
        props.history.push('/branch/placedBookings');
      }, 2000);
     
    }
    if(branchAll === ''){
      dispatch(branchList());
      console.log('called',branchAll)
     // setCount('called')
      //return;
   }
   if(serviceAll === ''){
    dispatch(ServicePackageList());
    console.log('called',serviceAll)
   // setCount('called')
    //return;
 }
 if(TimeSlots != ''){
  console.log('getting timeslots',TimeSlots);
  setServiceId(TimeSlots.service_Id);
  setBookingDate(TimeSlots.bookingDate);
  setMobile(TimeSlots.mobile);
  setEmail(TimeSlots.email);
  setName(TimeSlots.name);
  setDescription(TimeSlots.description);
  form.setFieldsValue({service:TimeSlots.service_Id,email_Id: TimeSlots.email,name:TimeSlots.name,mobileNumber:TimeSlots.mobile,Message:TimeSlots.description});
  
}
  }, [Saved,branchAll,serviceAll,customerAll]);
  const dataSource=['8778522458','9994996019','87785','666666666']
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option style={{color:'#191717'}} value="966">+966</Option>
        {/*<Option value="91">+91</Option>*/}
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

function checkTime(){
 // alert('hi');
 if(serviceId == ''){
   alert('Please select any service');
   return;
 }
  dispatch(getTimeslots(serviceId,bookingDate,name,mobile,email,description));
}
function handlesetTime(val){
 // alert(val);
  setTimeslot(val)
}
function confirm (e){
  console.log('confirmation data',(TimeSlots!='')?TimeSlots.bookingDate:bookingDate);
  
  dispatch(checkOTP(otp,(TimeSlots!='')?TimeSlots.service_Id:serviceId,(TimeSlots!='')?TimeSlots.bookingDate:bookingDate,timeslot,name,mobile,email,description));
 
};
function CloseVisible(e) {
  console.log(e);
  setModalVisible(false)
  //message.error('Click on No');
}
function handleSearch(value){
  //alert(value)
 /* setCustomerArray( customerArray : !value ? [] : [
    value,
    value + value,
    value + value + value,
  ])*/
 
 
}

function onSelect(value) {
 //var res= customerArray.filter(p => p.mobileNumber === value);
 setMobile(value);
 var row=[]
    if(customerAll!=''){
    for (var i = 0; i < customerAll.length; i++) {
      if(customerAll[i]['mobileNumber'] == value){
       row.push(customerAll[i])
      }
     // customerArray.push(customerAll[i]['mobileNumber']);
    }
    setMobile(value);
    setEmail(row[0]['email_Id']);
    setName(row[0]['name']);
    form.setFieldsValue({email_Id: row[0]['email_Id'],name:row[0]['name'],});
 }
 
  
}

function onSetMobile(value){
  //console.log(value);
  setMobile(value);

}
  return (
    <Card className="gx-card" title="New Boooking">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        service: (TimeSlots!='')?TimeSlots.service_Id:'',
        prefix:'966'
       // bookingDate: (TimeSlots!='')?moment(TimeSlots.bookingDate, 'DD-MM-YYYY'):moment(),
        
      }}
      scrollToFirstError
    >
      
      <h3>Customer Information</h3>
      <Form.Item
        name="mobileNumber"
        label="Mobile Number"
        
        rules={[{ required: true, message: 'Please enter mobile number!' }]}
      >
        {/*<Input onInput={e => setMobile(e.target.value)} addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Please enter  mobile number"  />*/}

        <AutoComplete
          dataSource={customerArray}
          defaultValue={mobile}
          //style={{width: 200}}
          onSelect={onSelect}
          onChange={onSetMobile}
          //onSearch={(val)=>handleSearch(val)}
          placeholder="Please enter mobile number"
          filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        />
      </Form.Item>
      
    <Form.Item
        name="name"
        label="Customer Name"
        
        rules={[
          
          {
            required: true,
            message: 'Please enter customer name',
          },
        ]}
      >
        <Input onInput={e => setName(e.target.value)} placeholder="Please enter customer name" />
      </Form.Item>
  
      <Form.Item
        name="email_Id"
        label="E-mail"
        value={email}
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input  value={email} onInput={e => setEmail(e.target.value)} placeholder="Please enter email id"/>
      </Form.Item>
      
      <Form.Item
        name="Message"
        label="Message"
      
      >
        <Input  onInput={e => setDescription(e.target.value)} placeholder="Message" />
      </Form.Item>
      <h3>Booking Details</h3>
      <Form.Item
        name="service"
        label="Select Service Or Package"
        rules={[{ required: true, message: 'Please Select Service!' }]}
      >
        <Select
        showSearch
       // mode="multiple"
        style={{width: '100%'}}
        placeholder="Select Service Or Package"
        optionFilterProp="children"
        onChange={handleChange}
        //onFocus={handleFocus}
        //onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
       {(serviceAll!=='')?
    serviceAll.map((service, index) => (
        <Option value={service.Type+'_'+service.Id}>{service.name}</Option>
    )):false}
      </Select>
       
      </Form.Item>
      <Form.Item name="bookingDate" label="Booking Date" value={bookingDate}>
        <DatePicker defaultValue={(TimeSlots!='')?moment(TimeSlots.bookingDate, 'DD-MM-YYYY'):moment()} onChange={handleChangeDate} className='gx-mb-3 gx-w-100'  format="DD-MM-YYYY" />
      </Form.Item>

      {/*<Form.Item  style={{textAlign:'center'}}>
        <Button type="primary" onClick={()=>checkTime()} >
         Check Available Timeslots
        </Button>
    </Form.Item>*/}
      {(TimeSlots !=='')?
      <Card title="" className="gx-card">
        <h3 style={{textAlign:'center'}}>Available TimeSlots</h3>
        <div style={{textAlign:'center'}}>
        {TimeSlots.result.map((slots, index) => (
          
     <Tag onClick={()=>handlesetTime(slots.Time)} style={{color:(timeslot == slots.Time)?'#000':'#fff',cursor:'pointer',backgroundColor:(timeslot == slots.Time)?'#fff':'#000'}}>{slots.Time}</Tag>))}
     </div>
      {/*<Tag><a href="#">Link</a></Tag>
      <Tag closable onClose={log}>Tag 2</Tag>
    <Tag closable onClose={preventDefault}>Prevent Default</Tag>*/}
    </Card>:false}
    {(TimeSlots !=='')?
    (TimeSlots.errorCode==0)?
    <div>
   
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Confirm booking
        </Button>
      </Form.Item>
      </div>:false:false}
    </Form>
    <InfoView/>
    {isLoading=='yes'?
    <div className="gx-loader-view gx-loader-position">
        <CircularProgress/>
  </div>:false}
  <Modal
          title="Complete Booking"
          style={{top: 20}}
          visible={modalVisible}
          onOk={() => confirm(false)}
          onCancel={() => CloseVisible(false)}
          confirmLoading={confirmLoading}
          okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#fff'}}}  
          cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}
        >
          <h3 style={{color:'#fff'}}>Check Customer mobile or email and enter the OTP here</h3>
          <Input onInput={e => setOtp(e.target.value)}  placeholder="Please enter OTP"/>
         </Modal>

    </Card>
    
  );
};

export  default Registration;

