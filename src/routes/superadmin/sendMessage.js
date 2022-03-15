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
import {sendMessage} from "../../appRedux/actions/Staff";
//import CircularProgress from "components/CircularProgress/index";
import CircularProgress from "../../components/CircularProgress/index";
const { MonthPicker, RangePicker } = TimePicker;
const { Option } = Select;

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
  
  const [inputImage, setInputImage] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  const onFinish = values => {
    console.log('value:', values);

    //return;
    setIsLoading('yes')
    dispatch(sendMessage(values));
    setTimeout(() => {
    setIsLoading('');
    message.success('message sent Successfully');
    props.history.push('/superadmin/sendPromotion');
}, 4000);
  };

  const normFile = e => {
   // console.log('Upload event:', e.fileList[0].thumbUrl);
    setInputImage(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
}
  

  
  useEffect(() => {
    if (Saved !== '') {
    //  setIsLoading('');
    //message.success('Room Added Successfully');
     // props.history.push('/room/index');
    }
  }, [Saved]);

  
  return (
    <Card className="gx-card" title="Send Promotion">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
     
      scrollToFirstError
    >
     {/* <h4 style={{paddingLeft:50,fontWeight:'bold'}}>Personel Information</h4>*/}
      <Form.Item
        name="Subject"
        label="Subject"
        rules={[
          {
            required: true,
            message: 'Please enter Subject',
          },
        ]}
      >
        <Input placeholder="Please enter Subject" />
      </Form.Item>
      <Form.Item
        name="Message"
        label="Message"
        rules={[
            {
              required: true,
              message: 'Please enter Message',
            },
          ]}
      >
        <TextArea rows={4}  style={{ width: '100%' }} placeholder="Please enter Message" />
      </Form.Item>
     
  
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
         SEND MESSAGE
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
}

export  default Registration;

