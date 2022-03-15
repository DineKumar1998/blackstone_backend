import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {Avatar, Popover} from "antd";
import {userSignOut,getUser} from "../../appRedux/actions/Auth";

const UserProfile = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(({auth}) => auth.authUser);
  useEffect(() => {
    if(authUser === null){
    dispatch(getUser());
    }
  }, [authUser]);
  const userMenuOptions = (
    <ul className="gx-user-popover" >
      <li style={{color:'#000'}}>My Account</li>
      
      {(authUser !== null)?(authUser.Role === "Customer")?
      <li style={{color:'#000'}} onClick={() => dispatch(userSignOut())}>Logout</li>:
      <li style={{color:'#000'}} onClick={() => dispatch(userSignOut())}>Logout</li>:false}
    </ul>
  );

  return (

    <div className="gx-flex-row gx-align-items-center gx-mb-6 gx-avatar-row">
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click" style={{cursor:'pointer'}}>
       {/* <Avatar src='https://via.placeholder.com/150x150' className="gx-size-40 gx-pointer gx-mr-3" alt=""/>*/}
        <p style={{fontFamily:'Playfair display',fontSize:16,fontWeight:'bold',cursor:'pointer'}}>{(authUser !== null)?authUser.Name:''} <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></p>
      </Popover>
    </div>

  )
};

export default UserProfile;
