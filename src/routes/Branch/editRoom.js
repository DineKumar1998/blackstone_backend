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
import {saveRoom,roomEditFetch} from "../../appRedux/actions/Staff";
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
  const roomEditData = useSelector(({staff}) => staff.roomEditData);
  const [inputImage, setInputImage] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
   
   if(roomEditData ===''){
    dispatch(roomEditFetch(props.match.params.Id));
}
    if (Saved !== '') {
        message.success('Room Updated Successfully');
      props.history.push('/room/index');
    }
  }, [Saved]);
  const onFinish = values => {
    console.log('value:', values);
    var Id=props.match.params.Id;
    dispatch(saveRoom(values,Id));
  };

  const normFile = e => {
   // console.log('Upload event:', e.fileList[0].thumbUrl);
    setInputImage(e.fileList);
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
}
  

  
  

  
  return (
    <Card className="gx-card" title="Room Edit Form">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        RoomName: roomEditData.Room_name,
        Description: roomEditData.Description,
      }}
      scrollToFirstError
    >
     {/* <h4 style={{paddingLeft:50,fontWeight:'bold'}}>Personel Information</h4>*/}
      <Form.Item
        name="RoomName"
        label="Room Name"
        rules={[
          {
            required: true,
            message: 'Please enter Room Name',
          },
        ]}
      >
        <Input placeholder="Please enter Room Name" />
      </Form.Item>
      <Form.Item
        name="Description"
        label="Description"
        
      >
        <TextArea rows={4}  style={{ width: '100%' }} placeholder="Please enter Room Description" />
      </Form.Item>
      <Form.Item
        name="upload"
        label="Room Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
       
        
        //extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do" listType="picture" multiple={false} beforeUpload={() => false} >
        {inputImage.length >= 1 ? null :  <Button>
            <UploadOutlined /> Click to upload
          </Button>}
          {(roomEditData !=='' && inputImage === '')?<img alt="..." src={roomEditData.Image} style={{ width: '25%' }} className=""/>:false}
        </Upload>
      </Form.Item>
  
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Update Room
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

