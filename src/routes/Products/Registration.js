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
  Card,TimePicker,AutoComplete
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {newProduct} from "../../appRedux/actions";

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
  const [inputImage, setInputImage] = useState('');
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = values => {
    console.log('Received values of form: ', values);
    let Id='';
    dispatch(newProduct(values,Id));
  };
  const normFile = e => {
   // console.log('Upload event:', e.fileList[0].thumbUrl);
    setInputImage(e.fileList)
    if (Array.isArray(e)) {
      return e;
    }
  
    return e && e.fileList;
  };
  useEffect(() => {
    if (Saved !== '') {
      props.history.push('/productList');
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
    <Card className="gx-card" title="Product Registration">
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
        name="ProductName"
        label="Product Name"
        
        rules={[
          
          {
            required: true,
            message: 'Please enter Product name',
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
        name="Unit"
        label="Unit"
        rules={[{ required: true, message: 'Please Select Unit!' }]}
      >
        <Select
        showSearch
        style={{width: '100%'}}
        placeholder="Select a Unit"
        optionFilterProp="children"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="Pcs">Pcs</Option>
        <Option value="Kg">Kg</Option>
        <Option value="Box">Box</Option>
        <Option value="Littre">Littre</Option>
      </Select>
       
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
        label="Product Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
       
        
        //extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo"  listType="picture" multiple={false} beforeUpload={() => false} >
        {inputImage.length<1? <Button>
            <UploadOutlined /> Click to upload
          </Button>:false}
        </Upload>
      </Form.Item>
      
      <Form.Item
        name="Minimum_stock"
        label="Minimum stock"
        
        rules={[{ required: true, message: 'Please enter  Minimum stock!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter Minimum stock"  />
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
          Save Product
        </Button>
      </Form.Item>
    </Form>
    <InfoView/>
    </Card>
  );
};

export  default Registration;

