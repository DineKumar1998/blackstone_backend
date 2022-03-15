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
  Col,
  Spin,
  Button,
  Card,TimePicker,message,AutoComplete,DatePicker
} from 'antd';
import moment from "moment";

import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {staffRigister,staffEditFetch} from "../../appRedux/actions/Staff";
import CircularProgress from "../../components/CircularProgress/index";

const { MonthPicker, RangePicker } = TimePicker;
const { Option } = Select;

const rangeConfig = {
  rules: [{ type: 'array', required: false, message: 'Please select time!' }],
};
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

const Registration = (props) => {
  const dispatch = useDispatch();
  const Saved = useSelector(({auth}) => auth.Saved);
  const staffEdit = useSelector(({staff}) => staff.staffEditData);
  const [inputImage, setInputImage] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
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
  const onFinish = values => {
    //console.log('Received values of form: ', values.officeTiming[0]['_d'].getUTCHours()+' : '+values.officeTiming[0]['_d'].getUTCMinutes());
    console.log(values);
    //console.log(formatAMPM(values.officeTiming[0]['_d']));
    const Id=props.match.params.Id;
    let startTime,endTime;
    if (Array.isArray(values.officeTiming)) {
      console.log(values.officeTiming);
        startTime=formatAMPM(values.officeTiming[0]['_d']);
        endTime=formatAMPM(values.officeTiming[1]['_d']);
    }else{
        startTime=staffEdit.startTime;
        endTime=staffEdit.endTime;
    }
    dispatch(staffRigister(values,Id,startTime,endTime));
  };
  const normFile = e => {
    console.log('Upload event:', e.fileList);
    setInputImage(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  
  useEffect(() => {
      
      if(staffEdit === ''){
        console.log('props',props.match.params.Id);
      dispatch(staffEditFetch(props.match.params.Id));
      }
    if (Saved !== '') {
      message.success('Staff data Updated Successfully');
      props.history.push('/staff/staffList');
    }
  }, [Saved,staffEdit]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="966">+966</Option>
        {/*<Option value="91">+91</Option>*/}
      </Select>
    </Form.Item>
  );

  
   

  return (
    
    <Card className="gx-card" title="Staff Edit Form">
      {(staffEdit !=='')?
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        prefix: '966',
        Experience:staffEdit.Experience,
        staffName:staffEdit.staffName,
        mobileNumber:staffEdit.mobileNumber,
        email_Id:staffEdit.email_Id,
        Nationality:staffEdit.Nationality,
        Iqama_Id:staffEdit.Iqama_Id,
        Gender:staffEdit.Gender,
        Education:staffEdit.Education,
        Designation:staffEdit.Designation,
        Salary:staffEdit.Salary,
        Age:staffEdit.Age,
        DateOfJoining:(staffEdit.DateOfJoining !== '')?moment(moment(staffEdit.DateOfJoining),"DD-MM-YYYY" ):'',
        Dob:(staffEdit.Dob !== '')?moment(moment(staffEdit.Dob),"DD-MM-YYYY" ):'',
        shiftTiming:(staffEdit.shiftTiming !== '')?[moment(staffEdit.startTime, "HH:mm a"), moment(staffEdit.endTime, "HH:mm a")]:'',
        password:staffEdit.password,
        confirm:staffEdit.password,

      }}
      scrollToFirstError
    >
      <h4 style={{paddingLeft:50,fontWeight:'bold'}}>Personel Information</h4>
      <Form.Item
        name="staffName"
        label="Staff Name"
        
        rules={[
          
          {
            required: true,
            message: 'Please enter staff name',
          },
        ]}
      >
        <Input placeholder="Please enter staff name" />
      </Form.Item>
      <Form.Item
        name="mobileNumber"
        label="Mobile Number / User Name"
        
        rules={[{ required: true, message: 'Please enter mobile number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Please enter  mobile number"  />
      </Form.Item>
      
      <Form.Item
        name="email_Id"
        label="E-mail"
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
        <Input placeholder="Please enter  email id"/>
      </Form.Item>
      <Form.Item
        name="Nationality"
        label="Nationality"
        
        rules={[{ required: true, message: 'Please enter Nationality!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter Nationality"  />
      </Form.Item>
      <Form.Item
        name="Iqama_Id"
        label="Nationality Id or Iqama Id"
        
        rules={[{ required: true, message: 'Please enter Nationality Id or Iqama Id' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter Nationality Id or Iqama Id"  />
      </Form.Item>
    
    
{/*<h4>Personel Information</h4>*/}

      <Form.Item
        name="Gender"
        label="Gender"
        rules={[{ required: true, message: 'Please Select Gender!' }]}
      >
        <Select
        showSearch
        style={{width: '100%'}}
        placeholder="Select  Gender"
        optionFilterProp="children"
       // onChange={handleChange}
        //onFocus={handleFocus}
        //onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
       
      </Select>
       
      </Form.Item>
      <Form.Item
        name="Education"
        label="Educational Qualification"
        
        rules={[{ required: true, message: 'Please enter Educational Qualification' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter Educational Qualification"  />
      </Form.Item>
    
      <Form.Item name="Dob" label="Date of birth" >
        <DatePicker className='gx-mb-3 gx-w-100'  format="DD-MM-YYYY" />
      </Form.Item>
        <Form.Item label="Age" name="Age"  rules={[
          
          {
            required: true,
            message: 'Please enter Age',
          },
        ]}>
          <InputNumber min={15} max={70} style={{color:'#000'}} />
        </Form.Item>
       
      <Form.Item
        name="Image"
        label="Profile Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
       
        
        //extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="Image" action="/upload.do" listType="picture" multiple={false} beforeUpload={() => false} >
        {inputImage.length >= 1 ? null :  <Button style={{color:'#000'}}>
            <UploadOutlined /> Click to upload
          </Button>}
          {(inputImage === '')?<img alt="..." src={staffEdit.Image} style={{width:'20%'}} className=""/>:false}
        </Upload>
      </Form.Item>
      <Form.Item label="Total Years of Experience" >
        <Form.Item name="Experience" noStyle  rules={[
          
          {
            required: false,
            message: 'Please enter Experience',
          },
        ]}>
          <InputNumber min={0} max={25} style={{color:'#000'}}/>
        </Form.Item>
        <span className="ant-form-text"> Years</span>
      </Form.Item>

   <h4 style={{paddingLeft:50,fontWeight:'bold'}}>Office Information</h4>

      <Form.Item
        name="Designation"
        label="Designation"
        rules={[{ required: true, message: 'Please Select Gender!' }]}
      >
        <Select
        showSearch
        style={{width: '100%'}}
        placeholder="Select  Designation"
        optionFilterProp="children"
       // onChange={handleChange}
        //onFocus={handleFocus}
        //onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="Accountant">Accountant</Option>
        <Option value="Executive">Executive</Option>
        <Option value="Manager">Manager</Option>
        <Option value="Receptionist">Receptionist</Option>
        <Option value="Team Leader">Team Leader</Option>
       
      </Select>
       
      </Form.Item>
      <Form.Item name="shiftTiming" label="Shift Timing" {...rangeConfig}>
        <RangePicker  className='gx-mb-3 gx-w-100' showTime={{ format: 'HH:mm a', use12Hours:true }}/>
      </Form.Item>
      <Form.Item
        name="Salary"
        label="Salary"
        
        rules={[{ required: true, message: 'Please enter Salary' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter Salary"  />
      </Form.Item>
      <Form.Item  name="DateOfJoining" label="Date of Joining" >
        <DatePicker className='gx-mb-3 gx-w-100'  format="DD-MM-YYYY" />
      </Form.Item>
      
     
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

     
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Staff Update
        </Button>
      </Form.Item>
    </Form>:false}
    <InfoView/>
    {isLoading=='yes'?
    <div className="gx-loader-view gx-loader-position">
        <CircularProgress/>
  </div>:false}
    </Card>
  );
};

export  default Registration;

