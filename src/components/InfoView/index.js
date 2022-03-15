import React, {useEffect} from 'react';
import CircularProgress from "components/CircularProgress/index";
import Auxiliary from "util/Auxiliary";
import {useDispatch, useSelector} from "react-redux";
import {hideMessage} from "appRedux/actions/Common";
import {message} from "antd";

const InfoView = () => {

  const dispatch = useDispatch();

  const error = useSelector(({common}) => common.error);

  const loading = useSelector(({common}) => common.loading);

  const notification = useSelector(({common}) => common.message);

  const displayMessage = notification;

  useEffect(() => {
   /* setInterval(function(){ 
      message.success('hi')
  }, 10000);*/
    if (error || notification) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 3000);
    }
   
  }, [error, notification, dispatch]);


  return (
    <Auxiliary>
      {/*(loading )?
        <CircularProgress/>
      :false*/}
      {error &&  message.error(<span id="message-id" style={{color:"#000"}}>{error}</span>)}
      {displayMessage && message.info(<span id="message-id">{displayMessage}</span>)}
    </Auxiliary>
  );
};

export default InfoView;
