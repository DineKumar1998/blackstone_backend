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
  message,
  Button,
  Card,TimePicker,Switch,Spin,Table,Popconfirm
} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfoView from "../../components/InfoView";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {newtimeSlot,getTimeList,deleteTimeslot,uploadUserManual} from "../../appRedux/actions";

//const { Option } = Select;

const {TextArea} = Input;
const Option = Select.Option;

const format = 'HH:mm a';
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
  const TimeListArray = useSelector(({auth}) => auth.Timelist);
  const serviceEdit = useSelector(({auth}) => auth.serviceEditData);
  const [loading, setLoading] = useState(false);
  const [inputImage, setInputImage] = useState('');
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    //console.log('fetching',isMounted);
   
  if(TimeListArray === ''){

      //dispatch(getTimeList(props.match.params.Id,'service'));
      console.log('called',TimeListArray)
     // setCount('called')
      return;
   }
  
  }, [TimeListArray]);

  
  const onFinish = values => {
    if(inputImage==''){
        alert('Please upload the file')
        return;
    }
    dispatch(uploadUserManual(values));
    setInputImage(' ');
    console.log('Received values of form: ', values);
    message.success('Uploaded Successfully');
  };
 
  useEffect(() => {
    if(serviceEdit ===''){
        //dispatch(serviceEditFetch(props.match.params.Id));
    }
    if (Saved !== '') {
      //props.history.push('/productList');
    }
  }, [Saved]);
  
  function cancel(e) {
    console.log(e);
    //message.error('Click on No');
  }
  

  const columns = [{
    title: 'Time Slot',
    dataIndex: 'Time',
    render: text => <span className="gx-link">{text}</span>,
  },{title:'Action',
  dataIndex: 'Id',
  key:'Id',
  render: (text, record) => (
    <Popconfirm title="Are you sure want to delete this Time Slot?" onConfirm={()=>onDelete(record.Id)} onCancel={cancel} okText="Yes"
                  cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
        <Button type="danger">Delete</Button>
      </Popconfirm>
    
  )}]

  const onDelete =(key) =>{
    setLoading(true);
   
    dispatch(deleteTimeslot(key));
   // setLoading(false);
   setTimeout(() => {
    setLoading(false);
   // message.success('Status Updated!');
    message.success({
      content: 'Time Slot Deleted!',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
        //backgroundColor:'black'
        color:'black'
      },
    });
   }, 1000);
  
  }

  const normFile = e => {
     console.log('Upload event:', e);
     setInputImage(e.fileList);
     if (Array.isArray(e)) {
       return e;
     }
 
     return e && e.fileList;
 }
  return (
     <div>
    <Card className="gx-card" title="User Manual">
       
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{}}
      scrollToFirstError
      layout="inline"
    >
      <Form.Item
        name="Image"
        label="User Manual"
        valuePropName="fileList"
        getValueFromEvent={normFile}
       
      >
        <Upload onDone='base64' name="Image" accept='.doc,.docx,application/pdf' listType="pdf" action="/upload.do"  multiple={false} beforeUpload={() => false} >
        {inputImage.length >= 1 ? null :  <Button style={{color:'#000'}}>
            <UploadOutlined /> Click to upload
          </Button>}
        </Upload>
      </Form.Item>
     
    
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Upload User Manual
        </Button>
      </Form.Item>
    </Form>
    <InfoView/>
    <h3 style={{textAlign:'center',color:'#DFC15E'}}>{(serviceEdit !=='')?serviceEdit.ServiceName:''}</h3>
    <Spin spinning={loading} tip="Loading...">
    <Table className="gx-table-responsive"
             columns={columns}
             dataSource={TimeListArray}
             bordered
             title={false}
             footer={false}
      />
      </Spin>
    </Card>
    
   
    </div> 
    
  );
};

export  default Registration;

