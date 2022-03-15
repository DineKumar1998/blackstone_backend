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
import {createVacation} from "../../appRedux/actions/Staff";
//import CircularProgress from "components/CircularProgress/index";
import CircularProgress from "../../components/CircularProgress/index";
const {MonthPicker, RangePicker} = DatePicker;
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
  
  function formatAMPM(date) {
    var curDate = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    curDate = curDate < 10 ? '0'+curDate : curDate;
    month = month < 10 ? '0'+month : month;
    var result = curDate + '-' + month + '-' + year;
    return result;
  }
  const onFinish = values => {
    console.log('Received values of form: ', values);
    let Id='';
    let startDate=formatAMPM(values.Leave_Date[0]['_d']);
    let endDate=formatAMPM(values.Leave_Date[1]['_d']);
    var vacationDate = [startDate, endDate];
    values.Leave_Date=vacationDate;
    dispatch(createVacation(values,Id));
  };

  
  
  useEffect(() => {
    if (Saved !== '') {
      //  setIsLoading('');
      message.success('Vacation Applied Successfully!');
      props.history.push('/vacation/index');
    }
  }, [Saved]);

  
  return (
    <Card className="gx-card" title="Create Vacation">
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
        name="Leave_Type"
        label="Vacation Type"
        rules={[
          {
            required: true,
            message: 'Please Select Vacation Type',
          },
        ]}
      >
         <Select
            showSearch
            style={{width: '100%'}}
            placeholder="Select Vacation Type"
            optionFilterProp="children"
            // onChange={handleChange}
            //onFocus={handleFocus}
            //onBlur={handleBlur}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            <Option value="Test Type1">Test Type1</Option>
            <Option value="Test Type2">Test Type2</Option>
            <Option value="Test Type3">Test Type3</Option>

            </Select>
      </Form.Item>
      <Form.Item
        name="Leave_Date"
        label="Vacation Date"
        rules={[{ required: true, message: 'Please Select valid date!' }]}
      >
        <RangePicker className="gx-w-100"  format="DD-MM-YYYY"/>
      </Form.Item>
      <Form.Item
        name="Description"
        label="Description"
        
      >
        <TextArea rows={4}  style={{ width: '100%' }} placeholder="Please enter Room Description" />
      </Form.Item>
     
  
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Apply
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

