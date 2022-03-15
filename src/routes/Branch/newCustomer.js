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
//import {staffRigister} from "../../appRedux/actions";
import {sendOTP,userSignUpAdmin} from "../../appRedux/actions";
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
  const ReceivedOTP = useSelector(({auth}) => auth.receivedOtp);
  const [inputImage, setInputImage] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  const onFinish = values => {
    console.log('value:', values);
    dispatch(sendOTP(values));
  };

  const onFinishOtp =values =>{
    console.log('success:', ReceivedOTP.formOBJ);
    dispatch(userSignUpAdmin( ReceivedOTP.formOBJ));
    //setIsLoading(true);
    message.success('Customer Created Successfully!');
    setTimeout(() => {
      props.history.push('/customers/customersList');
     }, 1000);
  }
  
  useEffect(() => {
    if (Saved !== '') {
    //  setIsLoading('');
      
      //props.history.push('/staff/staffList');
    }
  }, [Saved,ReceivedOTP]);

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
    <Card className="gx-card" title="Customer Registration Form">
    {(ReceivedOTP === '')?<Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '966',
        Nationality:'Saudi Arabia',
        CustomerType:'Normal'
      }}
      scrollToFirstError
    >
     {/* <h4 style={{paddingLeft:50,fontWeight:'bold'}}>Personel Information</h4>*/}
      <Form.Item
        name="customerName"
        label="Customer Name"
        
        rules={[
          
          {
            required: true,
            message: 'Please enter Customer Name',
          },
        ]}
      >
        <Input placeholder="Please enter Customer Name" />
      </Form.Item>
      <Form.Item name="CustomerType" label="Customer Type" rules={[{ required: true, message: 'Please enter Customer Type!' }]} >
            <Select
            showSearch
            style={{width: '100%'}}
            placeholder="Select  Customer Type"
            optionFilterProp="children"
            // onChange={handleChange}
            //onFocus={handleFocus}
            //onBlur={handleBlur}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            <Option value="VIP">VIP</Option>
            <Option value="MEMBER">MEMBER</Option>
            <Option value="Normal">Normal</Option>

            </Select>
      </Form.Item>
      <Form.Item
        name="mobileNumber"
        label="Mobile Number / User Name"
        
        rules={[{ required: true, message: 'Please enter mobile number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} maxLength="12"  placeholder="Please enter  mobile number"  />
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

      <Form.Item label="Blood Group" rules={[{required: true, message: 'Please input your Blood Group!'}]} name="BloodGroup">
                <Input placeholder="Blood Group"/>
      </Form.Item>
      <Form.Item name="Nationality" label="Nationality" rules={[{ required: true, message: 'Please enter Nationality!' }]} >
            <Select
            showSearch
            style={{width: '100%'}}
            placeholder="Select  Nationality"
            optionFilterProp="children"
            // onChange={handleChange}
            //onFocus={handleFocus}
            //onBlur={handleBlur}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            <Option value="Saudi Arabia">Saudi Arabia</Option>
            <Option value="India">India</Option>

            </Select>
      </Form.Item>
      <Form.Item
        name="Iqama_Id"
        label="Nationality Id or Iqama Id"
        
        rules={[{ required: true, message: 'Please enter Nationality Id or Iqama Id' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter Nationality Id or Iqama Id"  />
      </Form.Item>
    
      <Form.Item name="City" label="City" rules={[{required: true, message: 'Please enter your City', }]}>
                <Input placeholder="City"/>
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
      
     
        <Form.Item label="Age" name="Age"  rules={[
          
          {
            required: true,
            message: 'Please enter Age',
          },
        ]}>
          <InputNumber min={15} max={70} />
        </Form.Item>
       
     
   
  
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Customer Register
        </Button>
      </Form.Item>
    </Form>:false}

    {(ReceivedOTP !== '')?


<Form
initialValues={{ remember: true, prefix: '966',}}
name="basic"
onFinish={onFinishOtp}
onFinishFailed={onFinishFailed}
className="gx-signin-form gx-form-row0">

<p>Kindly check Customer Email / Mobile Number and enter your the OTP</p>
<Form.Item
name="mobileNumber"

rules={[{ required: true, message: 'Please enter your OTP', },
({ getFieldValue }) => ({
validator(rule, value) {
if (parseInt(ReceivedOTP.result) == value) {
return Promise.resolve();
}
return Promise.reject('Invalid OTP!');
},
}),]}
>
<Input  style={{ width: '100%' }} placeholder="Enter Your OTP" maxLength="4"  />
</Form.Item>

<Form.Item>
<Button type="primary" className="gx-mb-0" htmlType="submit">
  OK
</Button>

</Form.Item>
</Form>:false
}
    <InfoView/>
    {isLoading=='yes'?
    <div className="gx-loader-view gx-loader-position">
        <CircularProgress/>
  </div>:false}
    </Card>
  );
};

export  default Registration;

