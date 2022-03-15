import React, {useEffect,useState} from "react";
import {Button, Checkbox, Form, Input,Select} from "antd";
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {sendOTP,userSignUp} from "../appRedux/actions";

import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";
import { number } from "prop-types";
import { values } from "lodash";

const FormItem = Form.Item;
const { Option } = Select;
const SignUp = (props) => {

  const dispatch = useDispatch();
  const authUser = useSelector(({auth}) => auth.authUser);
  const ReceivedOTP = useSelector(({auth}) => auth.receivedOtp);
  const [isLoading, setIsLoading] = useState('');

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = values => {
    console.log('value:', values);
    dispatch(sendOTP(values));
  };
const onFinishOtp =values =>{
  console.log('success:', ReceivedOTP.formOBJ);
  dispatch(userSignUp( ReceivedOTP.formOBJ));
  setIsLoading(true);
  setTimeout(() => {
    // dispatch(productFetchData(e));
   }, 1000);
}
  useEffect(() => {
    if (authUser !== null) {
      props.history.push('/');
    }
  }, [authUser,ReceivedOTP]);
  const prefixSelector = (
    <FormItem name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="966">+966</Option>
        {/*<Option value="91">+91</Option>*/}
      </Select>
    </FormItem>
  );
  return (
    <div className="gx-app-login-wrap" style={{paddingTop:20}}>
      
      <div className="gx-app-login-container">
      {(isLoading === '')?
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              
            </div>
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signUp"/></h1>
              <p><IntlMessages id="app.userAuth.bySigning"/></p>
              <p><IntlMessages id="app.userAuth.getAccount"/></p>
            </div>
            <div className="gx-app-logo">
            <img alt="example" src={process.env.PUBLIC_URL +"/assets/images/logo.png"}/>
            </div>
          </div>

          <div className="gx-app-login-content">
          {(ReceivedOTP === '')?
            <Form
              initialValues={{ remember: true, prefix: '966',Nationality:'Saudi Arabia'}}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">
              <FormItem rules={[{required: true, message: 'Please input your Name!'}]} name="customerName">
                <Input placeholder="Name"/>
              </FormItem>

              <FormItem
        name="mobileNumber"
       
        rules={[{ required: true, message: 'Please enter mobile number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Mobile Number"  />
      </FormItem>

        <FormItem
        name="Gender"
       
        rules={[{ required: true, message: 'Please Select Gender!' }]}
      >
        <Select
        showSearch
        style={{width: '100%'}}
        placeholder="Select  Gender"
        optionFilterProp="children"
       // onChange={handleChange}
        //onFocus={handleFocus}
        //onBlur={handleBlur}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
       
      </Select>
       
      </FormItem>

      <FormItem rules={[{required: true, message: 'Please input your Age!'}]} name="Age">
                <Input placeholder="Age"/>
              </FormItem>
              <FormItem rules={[{required: true, message: 'Please input your Blood Group!'}]} name="BloodGroup">
                <Input placeholder="Blood Group"/>
              </FormItem>
              <FormItem name="email_Id" rules={[{
                required: true, type: 'email', message: 'The input is not valid E-mail!',
              }]}>
                <Input placeholder="Email"/>
              </FormItem>
              <FormItem name="Nationality" rules={[{
                required: true, message: 'Please enter your Nationality',
              }]}>
               {/* <Input placeholder="Nationality"/> */}
                <Select
                showSearch
                style={{width: '100%'}}
                placeholder="Select  Nationality"
                optionFilterProp="children"
                // onChange={handleChange}
                //onFocus={handleFocus}
                //onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                <Option value="Saudi Arabia">Saudi Arabia</Option>
                <Option value="India">India</Option>

                </Select>
              </FormItem>
              <FormItem name="Iqama_Id" rules={[{
                required: true, message: 'Please enter your Nationality Id or Iqama Id',
              }]}>
                <Input placeholder="Nationality Id or Iqama Id"/>
              </FormItem>
              <FormItem name="City" rules={[{
                required: true, message: 'Please enter your City',
              }]}>
                <Input placeholder="City"/>
              </FormItem>
             {/* <FormItem name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}>
                <Input type="password" placeholder="Password"/>
            </FormItem>*/}
              <Form.Item>
                <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                <span className="gx-signup-form-forgot gx-link"><IntlMessages
                  id="appModule.termAndCondition"/></span>
              </Form.Item>
              <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signUp"/>
                </Button>
                <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signin"><IntlMessages
                id="app.userAuth.signIn"/></Link>
              </FormItem>
            </Form>:false}

            {(ReceivedOTP !== '')?


              <Form
              initialValues={{ remember: true, prefix: '966',}}
              name="basic"
              onFinish={onFinishOtp}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">
              
          <p>Kindly check your Email / Mobile and enter your OTP</p>
              <FormItem
        name="mobileNumber"
       
        rules={[{ required: true, message: 'Please enter your OTP', },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (parseInt(ReceivedOTP.result) == value) {
              return Promise.resolve();
            }
            return Promise.reject('Invalid OTP!');
          },
        }),]}
      >
        <Input  style={{ width: '100%' }} placeholder="Enter Your OTP" maxLength="4"  />
      </FormItem>

              <FormItem>
              <Button type="primary" className="gx-mb-0" htmlType="submit">
                OK
              </Button>
             
            </FormItem>
          </Form>:false
}


          </div>
          <InfoView/>
        </div>:<div className="gx-app-login-main-content">
        <div className="gx-app-logo-content">
            <div className="gx-app-logo-content">
              
            </div>
            
            <div className="gx-app-logo">
               <img alt="example" src={process.env.PUBLIC_URL +"/assets/images/logo.png"}/>
            </div>
          </div>

          <div className="gx-app-login-content">
          <p style={{color:'#808080'}}>Kindly check your Email / Mobile and login to continue.</p>
      <Link to="/signin"><IntlMessages
      id="app.userAuth.signIn"/></Link></div></div>}
      </div> 
    </div>
  );
};

export default SignUp;
