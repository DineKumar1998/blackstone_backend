import React, { useState,useEffect} from 'react';
import {
  Form,
  Input,
  Tooltip,
  Switch,
  Select,
  InputNumber,
  Upload,
  Row,
  Col,
  Checkbox,
  Button,
  Card,DatePicker,AutoComplete
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {newPackage,serviceListData} from "../../appRedux/actions";
import moment from "moment";
const {MonthPicker, RangePicker} = DatePicker;
//const { Option } = Select;

const {TextArea} = Input;
const Option = Select.Option;


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
  const serviceAll = useSelector(({auth}) => auth.serviceList);
  const [inputImage, setInputImage] = useState('');
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
    let startDate=formatAMPM(values.OfferValid[0]['_d']);
    let endDate=formatAMPM(values.OfferValid[1]['_d']);
    var cars = [startDate, endDate];
    values.OfferValid=cars;
    dispatch(newPackage(values,Id));
  };
  const normFile = e => {
    //console.log('Upload event:', e.fileList[0].thumbUrl);
    setInputImage(e.fileList)
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  useEffect(() => {
    if(serviceAll === ''){
      dispatch(serviceListData());
      console.log('called')
   }
    if (Saved !== '') {
      props.history.push('/packageList');
    }
  }, [Saved]);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function handleBlur() {
    console.log('blur');
  }

  function handleFocus() {
    console.log('focus');
  }
  

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  


  return (
    <Card className="gx-card" title="Package Registration">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
     
      scrollToFirstError
    >
      <Form.Item
        name="PackageName"
        label="Package Name"
        
        rules={[
          
          {
            required: true,
            message: 'Please enter Package Name',
          },
        ]}
      >
        <Input placeholder="Please enter Product name" />
      </Form.Item>
      <Form.Item
        name="Amount"
        label="Amount"
        
        rules={[{ required: true, message: 'Please enter the Amount!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter the Amount"  />
      </Form.Item>
      <Form.Item
        name="OfferAmount"
        label="Offer Amount"
        
        rules={[{ required: true, message: 'Please enter the Offer Amount!' }, ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value ||   value < parseInt(getFieldValue('Amount'))) {
              return Promise.resolve();
            }else{
            return Promise.reject('Offer Amount greater then Amount!');
            }
          },
        })]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter the Offer Amount"  />
      </Form.Item>
      <Form.Item
        name="OfferValid"
        label="Offer Valid"
       // initialValue={packageEdit.OfferValid?[moment(packageEdit.OfferValid[0], "DD-MM-YYYY"), moment(packageEdit.OfferValid[1], "DD-MM-YYYY")]:''}
        rules={[{ required: true, message: 'Please enter the Offer valid date!' }]}
      >
        <RangePicker  className="gx-w-100"  format="DD-MM-YYYY"/>
      </Form.Item>
      <Form.Item
        name="Services"
        label="Services"
        rules={[{ required: true, message: 'Please Select Services!' }]}
      >
        <Select
        showSearch
        mode="multiple"
        style={{width: '100%'}}
        placeholder="Select a Service"
        optionFilterProp="children"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
       {(serviceAll!=='')?
    serviceAll.map((service, index) => (
        <Option value={service.Id}>{service.ServiceName}</Option>
    )):false}
      </Select>
       
      </Form.Item>
     
      <Form.Item
        name="Duration"
        label="Service Duration"
        
        rules={[{ required: true, message: 'Please enter the Duration of this service!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter the Duration of this service!"  />
      </Form.Item>
      <Form.Item name="Room"  label="Room needed" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item
        name="Short_Description"
        label="Short Description"
        rules={[{ required: true, message: 'Short Description!' }]}
       >
      <TextArea rows={4}  style={{ width: '100%' }} placeholder="Please enter Long Description"  />
      </Form.Item>
      <Form.Item
        name="Long_Description"
        label="Long Description"
       >
        <TextArea rows={4}  style={{ width: '100%' }} placeholder="Please enter Long Description"  />
      </Form.Item>
      <Form.Item
        name="Image"
        label="Package Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
       
        
        //extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo"  listType="picture" multiple={false} beforeUpload={() => false} >
        {inputImage.length<1? <Button style={{color:'#000'}}>
            <UploadOutlined /> Click to upload
          </Button>:false}
        </Upload>
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
          Save Package
        </Button>
      </Form.Item>
    </Form>
    <InfoView/>
    </Card>
  );
};

export  default Registration;

