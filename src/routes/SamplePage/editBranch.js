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
  Card,TimePicker,message,AutoComplete
} from 'antd';
import moment from "moment";

import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {branchRigister,branchEditFetch} from "../../appRedux/actions";
const dateFormat = 'HH:mm a';
const { MonthPicker, RangePicker } = TimePicker;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};
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
  const branchEdit = useSelector(({auth}) => auth.branchEditData);
  const [inputImage, setInputImage] = useState('');
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
        startTime=branchEdit.startTime;
        endTime=branchEdit.endTime;
    }
    dispatch(branchRigister(values,Id,startTime,endTime));
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
      console.log('props',props.match.params.Id);
      if(branchEdit ===''){
      dispatch(branchEditFetch(props.match.params.Id));
      }
    if (Saved !== '') {
      message.success('Branch Updated Successfully');
      props.history.push('/branchList');
    }
  }, [Saved,branchEdit]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="966">+966</Option>
        {/*<Option value="91">+91</Option>*/}
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    //let currentDate=year+':'+month+':'+

  return (
    <Card className="gx-card" title="Branch Edit Form">
   {(branchEdit!=='')?
   <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        
        prefix: '966',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Branch Name"
        initialValue={(branchEdit!=='')?branchEdit.name:''}
        rules={[
          
          {
            required: true,
            message: 'Please enter branch name',
          },
        ]}
      >
        <Input placeholder="Please enter branch name" />
      </Form.Item>
      <Form.Item
        name="mobileNumber"
        label="Mobile Number"
        initialValue={(branchEdit!=='')?branchEdit.mobileNumber:''}
        rules={[{ required: true, message: 'Please enter mobile number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Please enter branch official mobile number"  />
      </Form.Item>
      <Form.Item
        name="landLineNumber"
        label="Landline Number"
        initialValue={(branchEdit!=='')?branchEdit.landLine:''}
        rules={[{ required: true, message: 'Please enter landline number!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter branch official landline number"  />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        initialValue={(branchEdit!=='')?branchEdit.emailId:''}
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
        <Input placeholder="Please enter branch official email id"/>
      </Form.Item>
      <Form.Item
        name="faxNumber"
        label="Fax Number"
        initialValue={(branchEdit!=='')?branchEdit.faxNumber:''}
        rules={[{ required: true, message: 'Please enter fax number!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter branch official fax number"  />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        initialValue={(branchEdit!=='')?branchEdit.address:''}
        rules={[{ required: true, message: 'Please enter branch Address!' }]}
      >
        <TextArea rows={4}  style={{ width: '100%' }} placeholder="Please enter branch Address"  />
      </Form.Item>
    
     {/* <Form.Item name="openingTime" label="Opening Time" {...config}>
        <TimePicker className='gx-mb-3 gx-w-100' placeholder="Please enter branch official fax number"/>
      </Form.Item>
      <Form.Item name="closingTime" label="Closing Time" {...config}>
        <TimePicker className='gx-mb-3 gx-w-100' />
      </Form.Item>*/}
      <Form.Item name="officeTiming" label="Office Timing" {...rangeConfig}>
        <RangePicker className='gx-mb-3 gx-w-100' showTime={{ format: 'HH:mm a', use12Hours:true }} defaultValue={[moment((branchEdit!=='')?branchEdit.startTime:false, dateFormat), moment((branchEdit!=='')?branchEdit.endTime:false, dateFormat)]}/>
      </Form.Item>
      <Form.Item label="Number Of Rooms" >
        <Form.Item name="Rooms" noStyle 
          initialValue={(branchEdit!=='')?branchEdit.rooms:''}

        rules={[
          {
            required: true,
            message: 'Please enter branch Rooms',
          },
        ]}>
          <InputNumber min={1} max={25} style={{color:'#000'}} />
        </Form.Item>
        <span className="ant-form-text"> Rooms</span>
      </Form.Item>
      <Form.Item
        name="upload"
        label="Branch Logo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
       
        
        //extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do"  listType="picture" multiple={false} beforeUpload={() => false}  >
    {inputImage.length >= 1 ? null : 
          <Button style={{color:'#000'}}>
            <UploadOutlined /> Click to upload
          </Button>}
        </Upload>
        {(branchEdit!=='')? <img alt="..." src={(branchEdit!=='')?branchEdit.logo:''} className="gx-avatar-img gx-border-0"/>:false}
      </Form.Item>
     
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>:<Spin/>}
    <InfoView/>
    </Card>
  );
};

export  default Registration;

