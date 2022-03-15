import React,{useEffect,useState} from "react";
import {Col, Row,Button,message,Popconfirm,Spin,Modal,Form,Input,Menu,Select,Card} from "antd";
import {DownOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {productFetchData,branchEditReset,productDelete,addStock,resetProduct} from "../../appRedux/actions";
const { Option } = Select;


const ProductsGrid =(props)=> {
  const dispatch = useDispatch();
  const [stockModal, setStockModal] = useState('');
  const [stockProductId, setStockProductId] = useState('');
  const [sortFilter, setSortFilter] = useState('all');
  const [stockQty, setStockQty] = useState('');
  const productAll = useSelector(({auth}) => auth.productList);
  const productEdit = useSelector(({auth}) => auth.productEditData);
  const [form] = Form.useForm();
 // let sortFilter='all'
  function handleChangeFilter(e){
     console.log('ayyappa',e)
    //sortFilter=e;
    setSortFilter(e);
    // dispatch(resetProduct());
     setTimeout(() => {
     // dispatch(productFetchData(e));
    }, 1000);
     
    // productAll = [];
   }
  useEffect(() => {
  // alert(sortFilter);
   if(productEdit !==''){
    dispatch(branchEditReset());
  }
   if(productAll === ''){
    console.log('getValue',sortFilter)
      dispatch(productFetchData(sortFilter));
      
   }
  
  }, [productAll,sortFilter]);

  function confirm(e) {
    console.log(e);
    
    dispatch(productDelete(e));
   // message.success('Record Deleted!');
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
   message.error({
    content: 'Click on No',
    className: 'custom-class',
    style: {
      marginTop: '20vh',
      //backgroundColor:'black'
      color:'black'
    },
  });
  }
  function ShowModal(id){
    setStockModal(true);
    setStockProductId(id)
  }
  function handleCancel(){
    setStockQty('');
    setStockProductId('');
    setStockModal('');
    
  }
  function handleOk(){
    if(stockQty ===''){
      alert('Please Enter the Stock')
      return;
    }
    dispatch(addStock(stockProductId,stockQty))
    console.log(stockProductId)
  }
 function handleChange(e){
   // this.setState({value:e.target.value})
   console.log(e.target.value)
   setStockQty(e.target.value);
  }
 
  
  return (
    <div>
      {/*<p>{sortFilter}</p>*/}
      <div style={{flex:1,alignItems:'flex-end',justifyContent:'flex-end',flexDirection:'row'}}>
      <Col lg={12} md={12} sm={24} xs={24}>
       <Select
        showSearch
        style={{width: '100%'}}
        placeholder="Sort Filter"
        optionFilterProp="children"
        onChange={handleChangeFilter}
        //onFocus={handleFocus}
        //onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="all">All</Option>
        <Option value="lower">Lower than minimum qty</Option>
       
       
      </Select></Col></div>
       
    <Row style={{paddingTop:10}}>
       
    {(productAll!=='' && sortFilter == 'all')?
    productAll.result.map((product, index) => (
    <Col key={index} xl={6} md={8} sm={12} xs={24}>
        {/*<ProductItem key={index} grid product={product}/>*/}
        <div className="gx-product-item  gx-product-vertical">
    <div className="gx-product-image">
      <div className="gx-grid-thumb-equal">
        <span className="gx-link gx-grid-thumb-cover" style={{}} >
          <img alt="Remy Sharp" src={product.Image}/>
        </span>
      </div>
    </div>

    <div className="gx-product-body">
      <h3 className="gx-product-title">{product.ProductName}
        
      </h3>
      <div className="ant-row-flex">
        <h4 className="gx-text-success">{product.Amount} SAR</h4>
        <h5 className="gx-text-muted gx-px-2">
          <del>{product.mrp}</del>
        </h5>
        <h5 className="gx-text-success"></h5>
      </div>
     {/* <div className="ant-row-flex gx-mb-1">
         <strong className="gx-d-inline-block gx-ml-2">{"Unit : " + product.Unit}</strong>
    </div>*/}
      <p>Unit : <strong className="gx-d-inline-block gx-ml-2">{product.Unit}</strong></p>
      <p>Stock In : {(parseInt(product.Minimum_stock) > parseInt(product.stockInHand))?<span className="gx-text-danger">{product.stockInHand}</span>:<span className="gx-text-success">{product.stockInHand}</span>}</p>
      <p>Minimun Stock : <span className="gx-text-success">{product.Minimum_stock}</span></p>
     
      <p>{product.Short_Description}</p>
    </div>

    <div className="gx-product-footer">
    <div className="ant-row-flex gx-mb-1">
   
      </div>
      <Button style={{backgroundColor:'#000'}} variant="raised" onClick={()=>ShowModal(product.Id)}>Add Stock</Button>
      <Button type="primary"><Link to={"/editProduct/"+product.Id+""}>Edit Product</Link></Button>
      <Popconfirm title="Are you sure want to delete this Product?" onConfirm={()=>confirm(product.Id)} onCancel={cancel} okText="Yes"
                  cancelText="No" okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
        <Button type="danger">Delete</Button>
      </Popconfirm>
    </div>
  </div>
      </Col>
    )):false}


{(productAll!=='' && sortFilter == 'lower')?
    productAll.lower.map((product, index) => (
    <Col key={index} xl={6} md={8} sm={12} xs={24}>
        {/*<ProductItem key={index} grid product={product}/>*/}
        <div className="gx-product-item  gx-product-vertical">
    <div className="gx-product-image">
      <div className="gx-grid-thumb-equal">
        <span className="gx-link gx-grid-thumb-cover" style={{}} >
          <img alt="Remy Sharp" src={product.Image}/>
        </span>
      </div>
    </div>

    <div className="gx-product-body">
      <h3 className="gx-product-title">{product.ProductName}
        
      </h3>
      <div className="ant-row-flex">
        <h4 className="gx-text-success">{product.Amount} SAR</h4>
        <h5 className="gx-text-muted gx-px-2">
          <del>{product.mrp}</del>
        </h5>
        <h5 className="gx-text-success"></h5>
      </div>
     {/* <div className="ant-row-flex gx-mb-1">
         <strong className="gx-d-inline-block gx-ml-2">{"Unit : " + product.Unit}</strong>
    </div>*/}
      <p>Unit : <strong className="gx-d-inline-block gx-ml-2">{product.Unit}</strong></p>
      <p>Stock In : {(parseInt(product.Minimum_stock) > parseInt(product.stockInHand))?<span className="gx-text-danger">{product.stockInHand}</span>:<span className="gx-text-success">{product.stockInHand}</span>}</p>
      <p>Minimun Stock : <span className="gx-text-success">{product.Minimum_stock}</span></p>
     
      <p>{product.Short_Description}</p>
    </div>

    <div className="gx-product-footer">
    <div className="ant-row-flex gx-mb-1">
   
      </div>
      <Button variant="raised" onClick={()=>ShowModal(product.Id)}>Add Stock</Button>
      <Button type="primary"><Link to={"/editProduct/"+product.Id+""}>Edit Product</Link></Button>
      <Popconfirm title="Are you sure want to delete this Product?" onConfirm={()=>confirm(product.Id)} onCancel={cancel} okText="Yes"
                  cancelText="No"  okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#000'}}}  cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}>
        <Button type="danger">Delete</Button>
      </Popconfirm>
    </div>
  </div>
      </Col>
    )):false}
     <Modal
          title="Add Stock"
          visible={stockModal}
          onOk={()=>handleOk()}
          onCancel={()=>handleCancel()}
          okButtonProps={{type: 'default',style:{backgroundColor:'#A2A08A4D',color:'#fff'}}}  
          cancelButtonProps={{type: 'default',style:{backgroundColor:'red',color:'#fff'}}}
        >
           <Input type="number" value={stockQty}  style={{ width: '100%' }} placeholder="Please enter stock" onChange={(e)=>handleChange(e)}  />
        </Modal>
  </Row>
  </div>
  );
}

export default ProductsGrid;
