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
  Card,TimePicker,AutoComplete
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined,MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import {newService,productFetchData} from "../../appRedux/actions";
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
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const Registration = (props) => {
  const dispatch = useDispatch();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [inputList, setInputList] = useState([{ Product: "", Unit: "" }]);
  const [inputImage, setInputImage] = useState('');
  const Saved = useSelector(({auth}) => auth.Saved);
  const productAll = useSelector(({auth}) => auth.productList);
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = values => {
    console.log('Received values of form: ', values);
    let Id='';
    dispatch(newService(values,inputList,Id));
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
    console.log(props)
    if(productAll === ''){
      dispatch(productFetchData());
      console.log('called')
   }
    if (Saved !== '') {
         props.history.push('/serviceList');
    }
  }, [productAll,Saved]);
  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function handleBlur() {
    console.log('blur');
  }

  function handleFocus() {
    console.log('focus');
  }
  

  
  const handleInputChange = (e, index,name) => {
    const list = [...inputList];
    if(name === "Product"){
    list[index]['Product'] = e;
   }
    else{
    const { name, value } = e.target;
    list[index][name] = value;
    }
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { Product: "", Unit: "" }]);
  };


  return (
    <Card className="gx-card" title="Service Registration">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      
      scrollToFirstError
    >
      <Form.Item
        name="ServiceName"
        label="Service Name"
        
        rules={[
          
          {
            required: true,
            message: 'Please enter Service name',
          },
        ]}
      >
        <Input placeholder="Please enter Service name" />
      </Form.Item>

      {inputList.map((x, i) => {
        return (
          <div>
           

                  <Form.Item
                  //style={{flexDirection:'row'}}
                  required={true}
                  label={i === 0 ? 'Select Product' : ' '}
                  >
                    
 <Select
        showSearch
        style={{width: '60%'}}
        placeholder="Select a Product"
        optionFilterProp="children"
        onChange={e => handleInputChange(e, i,"Product")}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="Product"
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {(productAll!=='')?
    productAll.result.map((product, index) => (
        <Option value={product.Id}>{product.ProductName}</Option>
    )):false}
       
      </Select>
             
            <Input
              name="Unit"
              placeholder="Enter Quantity"
              style={{ width: '30%',left:10 }}
              value={x.Unit}
              onChange={e => handleInputChange(e, i,"Unit")}
            />
            {(inputList.length !== 1)?
             <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 12px'}}
                      onClick={() => {
                        handleRemoveClick(i);
                      }}
                    />:false}
            </Form.Item>
         
            
            <div className="btn-box" style={{textAlign:'center',paddingLeft:120}}>
              {/*inputList.length !== 1 && <button
                className="mr10"
              onClick={() => handleRemoveClick(i)}>Remove</button>*/}
              {inputList.length - 1 === i && 
             
              <Button
                type="dashed"
                onClick={handleAddClick}
                style={{ width: '50%'}}
              >
                <PlusOutlined /> Add Product
              </Button>
           
              }
            </div>
          </div>
        );
      })}
      <Form.Item
        name="Amount"
        label="Amount"
        
        rules={[{ required: true, message: 'Please enter the Amount!' }]}
      >
        <Input  style={{ width: '100%' }} placeholder="Please enter the Amount"  />
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
        label="Product Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
       
        
        //extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo"  listType="picture" multiple={false} beforeUpload={() => false} >
        {inputImage.length<1?
          <Button>
            <UploadOutlined /> Click to upload
          </Button>:false}
        </Upload>
      </Form.Item>


 {/*
      <Form.List name="test">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field,field2, index) => (
                <Form.Item
               // name="ayya"
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Passengers' : ''}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input  placeholder="passenger name" style={{ width: '60%' }} />
                    
                    
                   
                  </Form.Item>
                  <Form.Item
                    {...field2}
                  //  validateTrigger={['onChange', 'onBlur']}
                    name={"ayyyappa_"+field.key}
                    key={field2.key}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                     <Input  placeholder="passenger name" style={{ width: '60%' }} />
                     </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

     
      <Form.List name="names[]">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Product' : 'Product'}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                   
                   <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    name="products[]"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Select
        showSearch
        style={{width: '60%'}}
        placeholder="Select a Product"
        optionFilterProp="children"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="Kg">Kg</Option>
        <Option value="Box">Box</Option>
        <Option value="Littre">Littre</Option>
      </Select>
      </Form.Item>
      <Form.Item
                  //  {...field}
                   // validateTrigger={['onChange', 'onBlur']}
                    name="Quantity[]"
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field.",
                      },
                    ]}
                    noStyle
                  >
      <Input type="number"  min={1} max={20} placeholder="Enter Quantity" style={{ width: '30%' }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
                </Form.Item>
              ))}
              <Form.Item label="Select Product">
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> Add Product
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>*/}

      
      <div style={{ marginTop: 20 }}>{/*JSON.stringify(inputList)*/}</div>
    

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    <InfoView/>
    </Card>
  );
};

export  default Registration;

