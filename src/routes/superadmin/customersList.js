import React,{useEffect,useState,useRef}  from "react";
import {Card, Table,Switch,message,Spin} from "antd";
import {getCustomerListAdmin,StatusUpdate} from "../../appRedux/actions/Staff";
import {useDispatch, useSelector} from "react-redux";

//render:text=><div className="gx-mb-3"><Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={(text === 'Yes'?true:false)}/>{text}</div>}];



const Title = () => {
  const dispatch = useDispatch();
  const customerAll = useSelector(({staff}) => staff.customersList);
  const [loading, setLoading] = useState(false);
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <span className="gx-link">{text}</span>,
  }, {
    title: 'Email',
    dataIndex: 'email_Id',
  }, {
    title: 'Mobile Number',
    dataIndex: 'mobileNumber',
  }, {
    title: 'Gender',
    dataIndex: 'Gender',
  }, {
    title: 'Type',
    dataIndex: 'CustomerType',
  }, {
    title: 'City',
    dataIndex: 'City',
  },{title:'isActive',
  dataIndex: 'isActive',
  key:'Id',
  render: (text, record) => (
    
    <Switch
    checkedChildren="Yes" unCheckedChildren="No" defaultChecked={(text === 'Yes'?true:false)}
      onClick={(e) =>onDelete(record.Id, e) }
    />
    
  )}]
  const onDelete =(key,val) =>{
    setLoading(true);
    //const dispatchAction = useDispatch();
    console.log(key,val);
    let status='No';
    if(val==true){
      status='Yes';
    }
    dispatch(StatusUpdate(key,status));
   // setLoading(false);
   setTimeout(() => {
    setLoading(false);
   // message.success('Status Updated!');
    message.success({
      content: 'Status Updated!',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
        //backgroundColor:'black'
        color:'black'
      },
    });
   }, 1000);
  
  }
  useEffect(() => {
    //console.log('fetching',isMounted);
   
  if(customerAll === ''){

      dispatch(getCustomerListAdmin());
      console.log('called',customerAll)
     // setCount('called')
      return;
   }
  
  }, [customerAll]);

 
  return (
    (customerAll !=='')?
    <Card title="Customers List">
      <Spin spinning={loading} tip="Loading...">
      <Table className="gx-table-responsive"
             columns={columns}
             dataSource={customerAll}
             bordered
             title={false}
             footer={false}
      />
      </Spin>
    </Card>:false
  );
};

export default Title;
