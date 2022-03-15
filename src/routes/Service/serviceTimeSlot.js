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
import {newtimeSlot,getTimeList,deleteTimeslot,serviceEditFetch} from "../../appRedux/actions";

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
  const [form] = Form.useForm();
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    //console.log('fetching',isMounted);
   
  if(TimeListArray === ''){

      dispatch(getTimeList(props.match.params.Id,'service'));
      console.log('called',TimeListArray)
     // setCount('called')
      return;
   }
  
  }, [TimeListArray]);

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
    let Id=props.match.params.Id;
    let Time;
    Time=formatAMPM(values.Time['_d']);

    dispatch(newtimeSlot(Time,Id,'service'));
    console.log('Received values of form: ', Time);
    message.success('Timeslot Successfully');
  };
 
  useEffect(() => {
    if(serviceEdit ===''){
        dispatch(serviceEditFetch(props.match.params.Id));
    }
    if (Saved !== '') {
      //props.history.push('/productList');
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
  
  function cancel(e) {
    console.log(e);
    //message.error('Click on No');
  }
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

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
        <Button type="danger" size="small">Delete</Button>
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


  return (
     <div>
    <Card className="gx-card" title="Timeslot Management">
       
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
        name="Time"
        label="Time Slot"
      
        rules={[
          
          {
            required: true,
            message: 'Please select Time Slot',
          },
        ]}
      >
        <TimePicker className="gx-mr-2 gx-mb-2" use12Hours format="hh:mm a" />
      </Form.Item>
     
    
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Save Time
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

