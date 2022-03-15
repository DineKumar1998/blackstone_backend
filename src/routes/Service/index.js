import React,{useEffect} from "react";
import {Col, Row,Button,Popconfirm,message,Spin} from "antd";
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {serviceListData,branchEditReset,serviceDelete} from "../../appRedux/actions";
const ProductsGrid =(props)=> {
  const dispatch = useDispatch();
  const productAll = useSelector(({auth}) => auth.serviceList);
  const serviceEdit = useSelector(({auth}) => auth.serviceEditData);
  const TimeListArray = useSelector(({auth}) => auth.Timelist);
  useEffect(() => {
   console.log(props);
   if(serviceEdit !==''){
    dispatch(branchEditReset());
  }
  if(TimeListArray !==''){
    dispatch(branchEditReset());
  }
   if(productAll === ''){
      dispatch(serviceListData());
      console.log('called')
   }
  
  }, [productAll]);
  const ProductList = ({data}) => {
    //console.log('datas',data);
    //const { Product, Unit} = data;
    return (
      data.map((product, index) => (
      <strong className="gx-ml-2">{index+1} ) {product.Product} : {product.Unit} Qty</strong>
      ))
    )
  };

  function confirm(e) {
    console.log(e);
    dispatch(serviceDelete(e));
    //message.success('Record Deleted!');
    message.success({
      content: 'Record Deleted!',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
        //backgroundColor:'black'
        color:'black'
      },
    });
  }

  function cancel(e) {
    console.log(e);
    //message.error('Click on No');
  }
  return (
    <div className="gx-main-content">
    <Row>
    {(productAll!=='')?
    productAll.map((product, index) => (
      <Col key={index} span={24}>
        {/*<ProductItem key={index} grid product={product}/>*/}
  <div className="gx-product-item  gx-product-horizontal">
    <div className="gx-product-image">
      <div className="gx-grid-thumb-equal">
        <span className="gx-link" style={{alignSelf: 'center',padding:20,borderRadius: 10}} >
          <img alt="Product Image" style={{resizeMode:'cover'}} src={product.Image}  />
        </span>
      </div>
    </div>

    <div className="gx-product-body">
      <h3 className="gx-product-title">{product.ServiceName}</h3>
      <div className="ant-row-flex">
        <h4 className="gx-text-success">{product.Amount} SAR</h4>
      </div>

      <div className="ant-row-flex gx-mb-1" style={{paddingTop:10}}>
      <p>Duration : </p>
        
         <strong className="gx-d-inline-block gx-ml-2">{product.Duration}</strong>
      </div>
      
      <div className="ant-row-flex gx-mb-1" style={{paddingTop:5}}>
      <p>Product List : </p>
         <ProductList key={index} grid data={product.Product}/>
         {/* <strong className="gx-d-inline-block gx-ml-2">{product.rating}</strong>*/}
      </div>
      <div>
      <p style={{color:'#808080'}}>{product.Short_Description}</p></div>
    </div>
    
    <div className="gx-product-footer">
    <Button type="primary"><Link to={"/editService/"+product.Id+""}>Edit</Link></Button>
      <Popconfirm title="Are you sure want to delete this Service?" onConfirm={()=>confirm(product.Id)} onCancel={cancel} okText="Yes"
                  cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
        <Button type="danger">Delete</Button>
      </Popconfirm>
      <Button type="primary"><Link to={"/serviceTimeSlot/"+product.Id+""}>Time slot</Link></Button>
    </div>
  </div>
      </Col>
    )):<Spin/>}
  </Row>
  </div>
  );
}

export default ProductsGrid;
