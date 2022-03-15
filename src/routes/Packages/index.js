import React,{useEffect}from "react";
import {Col, Row,Button,Spin,Popconfirm,message} from "antd";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {packageListData,branchEditReset,packageDelete} from "../../appRedux/actions";

import IntlMessages from "util/IntlMessages";
const Basic = (props) => {
  const dispatch = useDispatch();
  const packageAll = useSelector(({auth}) => auth.packageList);
  const packageEdit = useSelector(({auth}) => auth.packageEditData);
  const TimeListArray = useSelector(({auth}) => auth.Timelist);
  useEffect(() => {
    console.log(props);
    if(packageEdit !==''){
     dispatch(branchEditReset());
   }
   if(TimeListArray !==''){
    dispatch(branchEditReset());
  }
    if(packageAll === ''){
       dispatch(packageListData());
       console.log('called')
    }
   
   }, [packageAll]);
   function confirm(e) {
    console.log(e);
   dispatch(packageDelete(e));
    message.success('Record Deleted!');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
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
          <div className="gx-package" style={{border: '0.5px solid #fff',borderColor:'#fff'}}>
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
          <Button type="primary"><Link to={"/editPackage/"+data.Id+""}>Edit</Link></Button>
      <Popconfirm title="Are you sure want to delete this Package?" onConfirm={()=>confirm(data.Id)} onCancel={cancel} okText="Yes"
                  cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
        <Button type="danger">Delete</Button>
      </Popconfirm>

     
           
          </div>
          <div style={{paddingTop:10}}>
          <Button type="primary" ><Link to={"/packageTimeSlot/"+data.Id+""}>Time slot</Link></Button></div>
        </div>


      </div>
        </Col> )):<Spin/>}

      
      </Row>
    </div>
    </div>
  )
};

export default Basic;

