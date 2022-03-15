import React,{useEffect,useState}from "react";
import {Col, Row,Button,Spin,Radio,message,Modal,DatePicker,Form} from "antd";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {packageListData,branchEditReset,packageDelete,branchList,newBooking} from "../../appRedux/actions";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";
const RadioGroup = Radio.Group;
const Basic = (props) => {
  const dispatch = useDispatch();
  const packageAll = useSelector(({auth}) => auth.packageList);
  const packageEdit = useSelector(({auth}) => auth.packageEditData);
  const branchAll = useSelector(({auth}) => auth.branchAll);
  const Saved = useSelector(({auth}) => auth.Saved);
  const [modal1Visible, setModalVisible] = useState('');
  const [branchId, setBranchId] = useState('');
  const [packageId, setPackageId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [successAlert, setsuccessAlert] = useState(false);
  useEffect(() => {
    console.log(props);
    if(packageEdit !==''){
     dispatch(branchEditReset());
   }
    if(packageAll === ''){
       dispatch(packageListData());
       console.log('called')
    }
    if(branchAll === ''){
      dispatch(branchList());
      console.log('called')
   }
   if (Saved !== '') {
    setsuccessAlert(true);
  }
   
   }, [packageAll]);
   function confirm(e) {
    console.log(e);
   dispatch(packageDelete(e));
    //message.success('Record Deleted!');
  }

  function cancel(e) {
    console.log(e);
    //message.error('Click on No');
  }
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    color:'black'
  };
   const ServiceList = ({data}) => {
   
    return (
      data.map((product, index) => (
     
            <li>
              <i className="icon icon-message"/>
              <span>{product.Service}</span>
            </li>
      ))
    )
  };
  return (
    <div className="ant-card ant-card-bordered">
      <div class="ant-card-head">
        <div class="ant-card-head-wrapper">
          <div class="ant-card-head-title">PACKAGES LIST</div>
          </div>
          </div>
    <div className="gx-price-tables gx-pt-default ant-card-body">
      <Row>
      {(packageAll !=='')?
    packageAll.map((data, index) => (
        <Col xl={8} lg={24} md={8} xs={24}>
         {/* <ItemFirst
            styleName="gx-package"
            headerStyle="gx-package-header gx-bg-primary gx-text-white"
            itemStyle="gx-package-body"
            footerStyle=""
         />*/}
          <div className="gx-package">
        <div className="gx-package-header gx-bg-primary gx-text-white">
        {(data.Offer_Amount)?<del>{data.Amount} SAR</del>:false}
          <h2 className="gx-price">{(data.Offer_Amount)?(data.Amount - data.Offer_Amount):data.Amount} SAR</h2>
          {(data.Offer_Amount)?<p>{data.Offer_Amount} SAR Offer</p>:false}
          <p className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0">{data.PackageName}</p>
          {(data.OfferValid)?<p>({data.OfferValid})</p>:false}
        </div>

        <div className="gx-package-body">
       <img alt="..." src={data.Image} className="" style={{width:'70%'}}/>
      
           <h3 className="gx-price"><i className="icon icon-halfstar"/>Services</h3>
          <ul className="gx-package-items">
              <ServiceList key={index} grid data={data.Services}/>
          
          </ul>
          <p>{data.Short_Description}</p>
          <div className="gx-package-footer">
          <Button onClick={()=>setModal1Visible(data.Id)} type="primary">Book Now</Button>
    
          </div>
        </div>
        <Modal
          title="Create Booking"
          style={{top: 20}}
          visible={modal1Visible}
          onOk={() => createBooking(false)}
          onCancel={() => CloseVisible(false)}
          okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  
          cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}
        >
          <h3 style={{color:'black'}}>Select Your Branch</h3>
         <RadioGroup onChange={(e)=>onChange(e)} value={branchId}>
         {(branchAll !=='')?
         branchAll.map((item, i) =>
          <Radio style={radioStyle} value={item.Id}>{item.name}</Radio>
          ):false}
          
         {/* <Radio style={radioStyle} value={2}>Option B</Radio>
          <Radio style={radioStyle} value={3}>Option C</Radio>*/}
         </RadioGroup>
         <h3>Select Your Booking Date</h3>
         <DatePicker onChange={(e)=>setBookingDate(e)} name="BookingDate" className='gx-mb-3 gx-w-100'  format="DD-MM-YYYY" />
    
        </Modal>

      </div>
        </Col> )):<Spin/>}

        <SweetAlert show={successAlert} success title={'Booking has been placed Successfully!'}
                    onConfirm={()=>onConfirm()}>
          <p>The Time slot will be confirmed later</p>
        </SweetAlert>
      </Row>
    </div>
    </div>
  )
  function onChange (e){
     console.log('radio checked', e.target.value);
     setBranchId(e.target.value);
  };
  function onConfirm (e){
   
   setsuccessAlert(false);
   props.history.push('/user/bookings');
 };
  function createBooking(){
    if(branchId == ''){
      alert('Please Select your Branch');
      return;
    }
    if(bookingDate == ''){
      alert('Please Select your Booking Date');
      return;
    }
    
    //message.success('Booking Created Successfully!');
    setModalVisible(false);
    var BookingDay=formatAMPM(bookingDate['_d']);
    dispatch(newBooking(packageId,branchId,BookingDay));
    //setsuccessAlert(true)
  }
  function formatAMPM(date) {
    var CurrentDate = date.getDate();
    var CurrentMonth = date.getMonth();
    var CurrentYear = date.getFullYear();
    CurrentDate = CurrentDate < 10 ? '0'+CurrentDate : CurrentDate;
    CurrentMonth = CurrentMonth < 10 ? '0'+CurrentMonth : CurrentMonth;
    var bookingDate = CurrentDate + '-' + CurrentMonth+'-'+CurrentYear;
    return bookingDate;
  
   // var strTime = hours + ':' + minutes + ' ' + ampm;
    
  }

  function CloseVisible(){
    setModalVisible(false)
  }
  function setModal1Visible(Id){
    setModalVisible(true)
    setPackageId(Id);
  }
};

export default Basic;

