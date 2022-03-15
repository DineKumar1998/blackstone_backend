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
  Card,Spin,AutoComplete
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {newProduct,productEditFetch} from "../../appRedux/actions";

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
  const [inputImage, setInputImage] = useState('');
  const Saved = useSelector(({auth}) => auth.Saved);
  const productEdit = useSelector(({auth}) => auth.productEditData);
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = values => {
    console.log('Received values of form: ', values);
    const Id=props.match.params.Id;
    dispatch(newProduct(values,Id));
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
    if(productEdit ===''){
        dispatch(productEditFetch(props.match.params.Id));
        }
    if (Saved !== '') {
      props.history.push('/productList');
    }
  }, [inputImage,Saved,productEdit]);
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
    
    <Card className="gx-card" title="Product Update Form">
      {(productEdit!=='')?
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
        initialValue={(productEdit!=='')?productEdit.ProductName:''}
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
        initialValue={(productEdit!=='')?productEdit.Amount:''}
        rules={[{ required: true, message: 'Please enter the Amount!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter the Amount"  />
      </Form.Item>
      <Form.Item
        name="Unit"
        label="Unit"
        
        rules={[{required:false, message: 'Please Select Unit!' }]}
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
        defaultValue={(productEdit!=='')?productEdit.Unit:''}
        value={(productEdit!=='')?productEdit.Unit:''}
      >
        <Option  value="Kg">Kg</Option>
        <Option value="Box">Box</Option>
        <Option value="Littre">Littre</Option>
      </Select>
       
      </Form.Item>
    
    
      <Form.Item
        name="Short_Description"
        label="Short Description"
        initialValue={(productEdit!=='')?productEdit.Short_Description:''}
        rules={[{ required: true, message: 'Short Description!' }]}
       >
      <TextArea rows={4}  style={{ width: '100%' }} placeholder="Please enter Long Description"  />
      </Form.Item>
      <Form.Item
        name="Long_Description"
        label="Long Description"
        initialValue={(productEdit!=='')?productEdit.Long_Description:''}
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
        <Upload name="logo" action="/upload.do" listType="picture" multiple={false} beforeUpload={() => false} >
        {inputImage.length >= 1 ? null : <Button>
            <UploadOutlined /> Click to upload
          </Button>}
          {(productEdit !=='' && inputImage === '')?<img alt="..." src={productEdit.Image} className=""/>:false}
        </Upload>
       
      </Form.Item>
      <Form.Item
        name="Minimum_stock"
        label="Minimum stock"
        initialValue={(productEdit!=='')?productEdit.Minimum_stock:''}
        rules={[{ required: true, message: 'Please enter  Minimum stock!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter Minimum stock"  />
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

