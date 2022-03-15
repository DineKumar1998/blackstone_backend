import React,{useEffect,useState,useRef}  from "react";
import {Card, Table,Switch,message,Spin,Popconfirm,Button,Tag,Tooltip} from "antd";
import {customerBookings,deleteBooking} from "../../appRedux/actions";
import {useDispatch, useSelector} from "react-redux";

//render:text=><div className="gx-mb-3"><Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={(text === 'Yes'?true:false)}/>{text}</div>}];



const Title = () => {
  const dispatch = useDispatch();
  const BookingList = useSelector(({auth}) => auth.customerbookings);
  const [loading, setLoading] = useState(false);
  const columns = [
  {
    title: 'Booking Id',
    dataIndex: 'Booking_Id',
    render: text => <span className="gx-link">{text}</span>,
  }, {
    title: 'Package',
    dataIndex: 'Package',
    render:(text, record)=>(
      <p>{record.Package}<br></br><Tag color="#87d068">{record.Amount} SAR</Tag></p>
    )
  }, {
    title: 'Branch Name',
    dataIndex: 'BranchName',
  }, {
    title: 'Booking Status',
    dataIndex: 'Booking_Status',
    render:(text, record)=>(
        (text === 'Placed')?<Tag color="#87d068">Placed</Tag>:<Tag color="#87d068">Accepted</Tag>
    )
  },
   {
    title: 'Booking Date',
    dataIndex: 'Booking_Date',
    render: (text, record) => (<span className="gx-link">{text}<br></br>{record.Start_Time} - {record.End_Time}</span>
    )
  },
  {title:'Delete',
  dataIndex: 'Booking_Status',
  key:'Id',
  render: (text, record) => (
    (text === 'Placed')?
        <Popconfirm title="Are you sure want to delete this Booking?" onConfirm={()=>onDelete(record.Id)} onCancel={cancel} okText="Yes"
        cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
        <Tag color="#f50">Delete</Tag>
        </Popconfirm>: <Tooltip placement="topLeft" title="Branch is already approved"><Tag color="#f50">Delete</Tag></Tooltip>
   
    
  )}]
  const onDelete =(key,val) =>{
    setLoading(true);
    //const dispatchAction = useDispatch();
    console.log(key,val);
    let status='No';
    if(val==true){
      status='Yes';
    }
    dispatch(deleteBooking(key,status));
   // setLoading(false);
   setTimeout(() => {
    setLoading(false);
   // message.success('Booking is Cancelled!');
    message.success({
      content: 'Booking is Cancelled!',
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
  if(BookingList === ''){
      dispatch(customerBookings());
      console.log('called',BookingList);
      return;
   }
  
  }, [BookingList]);

  function cancel(e) {
    console.log(e);
    //message.error('Click on No');
  }
  return (
    (BookingList !=='')?
    <Card title="BOOKING LIST">
      <Spin spinning={loading} tip="Loading...">
      <Table className="gx-table-responsive"
             columns={columns}
             dataSource={BookingList}
             bordered
             title={false}
             footer={false}
      />
      </Spin>
    </Card>:false
  );
};

export default Title;
