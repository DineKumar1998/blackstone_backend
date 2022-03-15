import React, {useEffect} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {userSignIn} from "../appRedux/actions";
import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";


const SignIn = (props) => {
  const dispatch = useDispatch();
  const authUser = useSelector(({auth}) => auth.authUser);

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = values => {
    console.log("finish",values)
    dispatch(userSignIn(values));
  };

  useEffect(() => {
    if (authUser !== null) {
        if(authUser.Role === 'Customer'){
          props.history.push('/user/dashboard');
        }
        else if(authUser.Role === 'Staff'){
          props.history.push('/staff/dashboard');
        }else{
           props.history.push('/Dashboard');
        }
    }
  }, [authUser]);

  return (
    <div className="gx-app-login-wrap" style={{backgroundColor:'#000'}}>
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
           
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signIn"/></h1>
              <p><IntlMessages id="app.userAuth.bySigning"/></p>
              <img alt="example" src={process.env.PUBLIC_URL +"/assets/images/logo_white.png"}/>
            </div>
           
          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">

              <Form.Item
               // initialValue="demo@example.com"
                rules={[{ required: true, message: 'Please input your username!' }]} name="email">
                <Input placeholder="Username / Mobile Number" style={{color:'#000000'}}/>
              </Form.Item>
              <Form.Item
              
               // initialValue="demo#123"
                rules= {[{required: true, message: 'Please input your Password!'}]}  name="password">
                <Input type="password" placeholder="Password" style={{color:'#000000'}}/>
              </Form.Item>
              {/*<Form.Item>
                <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                <span className="gx-signup-form-forgot gx-link"><IntlMessages
                  id="appModule.termAndCondition"/></span>
              </Form.Item>*/}
              <Form.Item>
                <Button  style={{backgroundColor:'rgba(52, 52, 52, 0.8)'}} className="gx-mb-0" htmlType="submit">
                  <span style={{color:'#fff'}}><IntlMessages  id="app.userAuth.signIn"/></span>
                </Button>
                {/*<span><IntlMessages id="app.userAuth.or"/></span> <Link to="/user/signup"><IntlMessages
                id="app.userAuth.signUp"/></Link>*/}
              </Form.Item>
              {/*<span
                className="gx-text-light gx-fs-sm"> demo user email: 'demo@example.com' and password: 'demo#123'</span>*/}
            </Form>
          </div>
          <InfoView/>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
