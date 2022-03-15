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
  DatePicker,
  Button,
  Card,TimePicker,message,AutoComplete
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {staffRigister,branchList} from "../../appRedux/actions";
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
  const Saved = useSelector(({staff}) => staff.Saved);
  const branchAll = useSelector(({auth}) => auth.branchAll);
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
    console.log('Received values of form: ', values);
    //console.log('Received values of form: ', values.Dob['_d'].getDate());
   let startTime,endTime;
    let Id='';
    startTime=formatAMPM(values.shiftTiming[0]['_d']);
    endTime=formatAMPM(values.shiftTiming[1]['_d']);
    setIsLoading('yes');
     dispatch(staffRigister(values,Id,startTime,endTime));
     setTimeout(() => {
      setIsLoading('');
    }, 3000);
  };
  const normFile = e => {
    console.log('Upload event:', e.fileList[0].thumbUrl);
    setInputImage(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  useEffect(() => {
    if (Saved !== '') {
      setIsLoading('');
      message.success('Staff Created Successfully!');
      props.history.push('/staff/staffList');
    }
    if(branchAll === ''){
      dispatch(branchList());
      console.log('called',branchAll)
     // setCount('called')
      return;
   }
  }, [Saved,branchAll]);

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
    <Card className="gx-card" title="Staff Registration Form">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '966',
        Experience:0
      }}
      scrollToFirstError
    >
      <h4 style={{paddingLeft:50,fontWeight:'bold'}}>Personel Information</h4>

      <Form.Item
        name="Branch"
        label="Branch"
        rules={[{ required: true, message: 'Please Select Services!' }]}
      >
        <Select
        showSearch
       // mode="multiple"
        style={{width: '100%'}}
        placeholder="Select Branch"
        optionFilterProp="children"
        //onChange={handleChange}
        //onFocus={handleFocus}
        //onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
       {(branchAll!=='')?
    branchAll.map((service, index) => (
        <Option value={service.userId}>{service.name}</Option>
    )):false}
      </Select>
       
      </Form.Item>
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
      <Form.Item name="DateOfJoining" label="Date of Joining" >
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
          Staff Register
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

