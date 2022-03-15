import React,{useEffect,useState,useRef}  from "react";
import {Card, Table,Switch,message,Spin,Popconfirm,Button,Tag,Tooltip} from "antd";
import {getVacationListBranch,LeaveApprove} from "../../appRedux/actions/Staff";
import {useDispatch, useSelector} from "react-redux";

//render:text=><div className="gx-mb-3"><Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={(text === 'Yes'?true:false)}/>{text}</div>}];



const Title = () => {
  const dispatch = useDispatch();
  const VacationList = useSelector(({staff}) => staff.vacationList);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: 'Staff Name',
      dataIndex: 'staff_name',
      render: text => <span className="gx-link">{text}</span>,
    },{
    title: 'Vacation Type',
    dataIndex: 'Leave_Type',
    render: text => <span className="gx-link">{text}</span>,
  }, {
    title: 'Vacation Date',
    dataIndex: 'Leave_Date',
  }, {
    title: 'Description',
    dataIndex: 'Description',
  },
   
  {title:'Approval',
  dataIndex: 'isApproved',
  key:'Id',
  render: (text, record) => (
    (text === 'No')?
        <Popconfirm title="Are you sure want to approve this Vacation?" onConfirm={()=>onApprove(record.Id)} onCancel={cancel} okText="Yes"
        cancelText="No">
        <Tag color="#f50">No</Tag>
        </Popconfirm>: 
        
        <Tag color="#87d068">Approved</Tag>
        
  )}]
  const onApprove =(key) =>{
    setLoading(true);
    //const dispatchAction = useDispatch();
   // console.log(key,val);
    
    dispatch(LeaveApprove(key));
   // setLoading(false);
   setTimeout(() => {
    setLoading(false);
    message.success('Vacation is Approved!');
   }, 1000);
  
  }
  useEffect(() => {
    //console.log('fetching',isMounted);
   
  if(VacationList === ''){

      dispatch(getVacationListBranch());
      console.log('called',VacationList)
     // setCount('called')
      return;
   }
  
  }, [VacationList]);

  function cancel(e) {
    console.log(e);
   // message.error('Click on No');
  }
  return (
    (VacationList !=='')?
    <Card title="VACATION LIST">
      <Spin spinning={loading} tip="Loading...">
      <Table className="gx-table-responsive"
             columns={columns}
             dataSource={VacationList}
             bordered
             title={false}
             footer={false}
      />
      </Spin>
    </Card>:false
  );
};

export default Title;
