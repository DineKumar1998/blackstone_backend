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
  Checkbox,
  Button,
  Card,TimePicker,message,AutoComplete
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {branchRigister} from "../../appRedux/actions";
//import CircularProgress from "components/CircularProgress/index";
import CircularProgress from "../../components/CircularProgress/index";
const { MonthPicker, RangePicker } = TimePicker;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
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

    console.log('Received values of form: ', values.officeTiming);
    let startTime,endTime;
    let Id='';
    startTime=formatAMPM(values.officeTiming[0]['_d']);
    endTime=formatAMPM(values.officeTiming[1]['_d']);
    setIsLoading('yes');
    dispatch(branchRigister(values,Id,startTime,endTime));
  };
  const normFile = e => {
    //console.log('Upload event:', e.fileList[0].thumbUrl);
    setInputImage(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  useEffect(() => {
    if (Saved !== '') {
      setIsLoading('');
      message.success('Branch Added Successfully');
      props.history.push('/branchList');
    }
  }, [Saved]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="966">+966</Option>
        {/*<Option value="91">+91</Option>*/}
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);



  return (
    <Card className="gx-card" title="Branch Registration Form">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '966',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Branch Name"
        
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
        
        rules={[{ required: true, message: 'Please enter mobile number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Please enter branch official mobile number"  />
      </Form.Item>
      <Form.Item
        name="landLineNumber"
        label="Landline Number"
        
        rules={[{ required: true, message: 'Please enter landline number!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter branch official landline number"  />
      </Form.Item>
      <Form.Item
        name="email"
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
        <Input placeholder="Please enter branch official email id"/>
      </Form.Item>
      <Form.Item
        name="faxNumber"
        label="Fax Number"
        
        rules={[{ required: true, message: 'Please enter fax number!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter branch official fax number"  />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        
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
        <RangePicker className='gx-mb-3 gx-w-100' showTime={{ format: 'HH:mm a', use12Hours:true }} />
      </Form.Item>
      <Form.Item label="Number Of Rooms" >
        <Form.Item name="Rooms" noStyle rules={[
          
          {
            required: true,
            message: 'Please enter branch Rooms',
          },
        ]}>
          <InputNumber style={{color:'#000'}} min={1} max={25} />
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
        <Upload name="logo" action="/upload.do" listType="picture" multiple={false} beforeUpload={() => false} >
        {inputImage.length >= 1 ? null :  <Button style={{color:'#000'}}>
            <UploadOutlined /> Click to upload
          </Button>}
        </Upload>
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

      {/*<Form.Item
        name="nickname"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>*/}

      {/*<Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          { type: 'array', required: true, message: 'Please select your habitual residence!' },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>

     

    <Form.Item
        name="website"
        label="Website"
        rules={[{ required: true, message: 'Please input website!' }]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: 'Please input the captcha you got!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>*/}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    <InfoView/>
    {isLoading=='yes'?
    <div className="gx-loader-view gx-loader-position">
        <CircularProgress/>
  </div>:false}
    </Card>
  );
};

export  default Registration;

