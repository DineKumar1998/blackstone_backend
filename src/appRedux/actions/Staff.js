import {FETCH_ERROR,FETCH_START,FETCH_SUCCESS,INIT_URL,STAFF_LIST,SAVED,STAFF_EDIT_DATA,CUSTOMER_LIST,ROOM_DATA,ROOM_EDIT_DATA,LEAVE_DATA,LEAVE_EDIT_DATA,BOOKING_LIST} from "../../constants/ActionTypes";
  const BaseUrl="https://www.blackstones-spa.com/api/api/";
export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const createVacation = (values,Id) => {
  //console.log('formData',startTime);
   
   return async (dispatch) => {
     dispatch({type: FETCH_START});
     var url = BaseUrl+"applyleave";
     const token =localStorage.getItem('token');
  // console.log('baseUrlll',url)
   const response = await fetch(url,{
     method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/x-www-form-urlencoded'
         },
           body: JSON.stringify({form:values,Id:Id,token:token})
       });
      
   const data = await response.json();
   console.log('from Saga',data)
   if (data.errorCode==0) {
     
     dispatch({type: FETCH_SUCCESS});
     dispatch({type: SAVED,payload:'success'});
     dispatch({type: LEAVE_DATA,payload:''});
     dispatch({type: LEAVE_EDIT_DATA,payload:''});
     
     
    }else{
    // dispatch({type: FETCH_SUCCESS});
     dispatch({type: FETCH_ERROR, payload: 'Unable to save / Alreay exist this user'});
   }
        
     }

 }
 
 
 export const sendMessage = (values) => {
  //console.log('formData',startTime);
   
   return async (dispatch) => {
     dispatch({type: FETCH_START});
     var url = BaseUrl+"sendmessage";
     const token =localStorage.getItem('token');
  // console.log('baseUrlll',url)
   const response = await fetch(url,{
     method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/x-www-form-urlencoded'
         },
           body: JSON.stringify({form:values,token:token})
       });
      
   const data = await response.json();
   console.log('message sent',data)
   if (data.errorCode==0) {
     
     dispatch({type: FETCH_SUCCESS});
     dispatch({type: SAVED,payload:'success'});
     dispatch({type: ROOM_DATA,payload:''});
     }else{
    // dispatch({type: FETCH_SUCCESS});
     dispatch({type: FETCH_ERROR, payload: 'Unable to save'});
   }
        
     }

 }

export const saveRoom = (values,Id) => {
  //console.log('formData',startTime);
   
   return async (dispatch) => {
     dispatch({type: FETCH_START});
     var url = BaseUrl+"addroom";
     const token =localStorage.getItem('token');
  // console.log('baseUrlll',url)
   const response = await fetch(url,{
     method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/x-www-form-urlencoded'
         },
           body: JSON.stringify({form:values,Id:Id,token:token})
       });
      
   const data = await response.json();
   console.log('from Saga',data)
   if (data.errorCode==0) {
     
     dispatch({type: FETCH_SUCCESS});
     dispatch({type: SAVED,payload:'success'});
     dispatch({type: ROOM_DATA,payload:''});
     dispatch({type: ROOM_EDIT_DATA,payload:''});
     
     
    }else{
    // dispatch({type: FETCH_SUCCESS});
     dispatch({type: FETCH_ERROR, payload: 'Unable to save / Alreay exist this user'});
   }
        
     }

 }

 export const getRoomList = (token) => {
  //alert(token);
  return async (dispatch) => {
    const token =localStorage.getItem('token');
    dispatch({type: FETCH_START});
    var url = BaseUrl+"roomall";
 // console.log('baseUrlll',url)
  const response = await fetch(url,{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({token:token})
      });
     // dispatch({type: FETCH_SUCCESS});
     // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
  const data = await response.json();
  console.log('from Saga',data)
  if (data.errorCode==0) {
    dispatch({type: FETCH_SUCCESS});
    dispatch({type: ROOM_DATA, payload: data.result});
    dispatch({type: ROOM_EDIT_DATA,payload:''});
    dispatch({type: SAVED,payload:''});
  }else{
    dispatch({type: FETCH_SUCCESS});
      dispatch({type: ROOM_DATA, payload: ''});
      console.log("Error****:");
  }
       
    }
  
};

export const getVacationList = (token) => {
  //alert(token);
  return async (dispatch) => {
    const token =localStorage.getItem('token');
    dispatch({type: FETCH_START});
    var url = BaseUrl+"leavelist";
 // console.log('baseUrlll',url)
  const response = await fetch(url,{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({token:token})
      });
     // dispatch({type: FETCH_SUCCESS});
     // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
  const data = await response.json();
  console.log('Redux Thunk',data)
  if (data.errorCode==0) {
    dispatch({type: FETCH_SUCCESS});
    dispatch({type: LEAVE_DATA, payload: data.result});
    dispatch({type: LEAVE_EDIT_DATA,payload:''});
    dispatch({type: SAVED,payload:''});
  }else{
    dispatch({type: FETCH_SUCCESS});
      dispatch({type: ROOM_DATA, payload: ''});
      console.log("Error****:");
  }
       
    }
  
};
export const getVacationListBranch = (token) => {
  //alert(token);
  return async (dispatch) => {
    const token =localStorage.getItem('token');
    dispatch({type: FETCH_START});
    var url = BaseUrl+"leavelistbranch";
 // console.log('baseUrlll',url)
  const response = await fetch(url,{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({token:token})
      });
     // dispatch({type: FETCH_SUCCESS});
     // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
  const data = await response.json();
  console.log('Redux Thunk',data)
  if (data.errorCode==0) {
    dispatch({type: FETCH_SUCCESS});
    dispatch({type: LEAVE_DATA, payload: data.result});
    dispatch({type: LEAVE_EDIT_DATA,payload:''});
    dispatch({type: SAVED,payload:''});
  }else{
    dispatch({type: FETCH_SUCCESS});
      dispatch({type: ROOM_DATA, payload: ''});
      console.log("Error****:");
  }
       
    }
  
};

export const roomEditFetch = (Id) => {
  //alert(token);
  return async (dispatch) => {
    const token =localStorage.getItem('token');
    dispatch({type: FETCH_START});
    var url = BaseUrl+"roomeditdata";
 // console.log('baseUrlll',url)
  const response = await fetch(url,{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({Id:Id})
      });
     // dispatch({type: FETCH_SUCCESS});
     // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
  const data = await response.json();
  console.log('from Saga',data)
  if (data.errorCode==0) {
    dispatch({type: FETCH_SUCCESS});
    dispatch({type: ROOM_DATA, payload:''});
    dispatch({type: ROOM_EDIT_DATA,payload:data.result});
    dispatch({type: SAVED,payload:''});
  }else{
    dispatch({type: FETCH_SUCCESS});
      dispatch({type: ROOM_DATA, payload: ''});
      console.log("Error****:");
  }
       
    }
  
};

export const staffRigister = (values,Id,startTime,endTime) => {
   console.log('formData',startTime);
    const token =localStorage.getItem('token');
    return async (dispatch) => {
      dispatch({type: FETCH_START});
      var url = BaseUrl+"staffcreate";
   // console.log('baseUrlll',url)
    const response = await fetch(url,{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({form:values,Id:Id,startTime:startTime,endTime:endTime,token:token})
        });
       
    const data = await response.json();
    console.log('from Saga',data)
    if (data.errorCode==0) {
      
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: SAVED,payload:'success'});
      dispatch({type: STAFF_LIST,payload:''});
      dispatch({type: STAFF_EDIT_DATA,payload:''});
      
      
     }else{
     // dispatch({type: FETCH_SUCCESS});
      dispatch({type: FETCH_ERROR, payload: 'Unable to save / Alreay exist this user'});
    }
         
      }

      
  
  }

  
  export const getStaffListadmin = (Branch_Id) => {
    //alert(token);
    return async (dispatch) => {
      const token =localStorage.getItem('token');
      dispatch({type: FETCH_START});
      var url = BaseUrl+"staffsalladmin";
   // console.log('baseUrlll',url)
    const response = await fetch(url,{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({Branch_Id:Branch_Id})
        });
       // dispatch({type: FETCH_SUCCESS});
       // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
    const data = await response.json();
    console.log('from Saga',data)
    if (data.errorCode==0) {
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: STAFF_LIST, payload: data.result});
      dispatch({type: STAFF_EDIT_DATA,payload:''});
      dispatch({type: SAVED,payload:''});
    }else{
      dispatch({type: FETCH_SUCCESS});
        dispatch({type: STAFF_LIST, payload: ''});
        console.log("Error****:");
    }
         
      }
    
  };

  export const getStaffList = (token) => {
    //alert(token);
    return async (dispatch) => {
      const token =localStorage.getItem('token');
      dispatch({type: FETCH_START});
      var url = BaseUrl+"staffsall";
   // console.log('baseUrlll',url)
    const response = await fetch(url,{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token})
        });
       // dispatch({type: FETCH_SUCCESS});
       // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
    const data = await response.json();
    console.log('from sttttttafffff Saga',data)
    if (data.errorCode==0) {
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: STAFF_LIST, payload: data.result});
      dispatch({type: STAFF_EDIT_DATA,payload:''});
      dispatch({type: SAVED,payload:''});
    }else{
      dispatch({type: FETCH_SUCCESS});
        dispatch({type: STAFF_LIST, payload: ''});
        console.log("Error****:");
    }
         
      }
    
  };

  export const staffEditFetch = (values) => {
 
    console.log('formData'+BaseUrl+"staffedit");
    return async (dispatch) => {
    fetch(BaseUrl+"staffedit",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({Id:values})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log('staffEdit',data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          //dispatch({type: FETCHED,payload:'success'});
          dispatch({type: STAFF_EDIT_DATA,payload:data.result});
          
         }else{
        
          dispatch({type: FETCH_ERROR, payload: 'branch Error'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
   
  }

  export const staffDelete = (value) => {
    return async (dispatch) => {
      fetch(BaseUrl+"deletestaff",{
        method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
              body: JSON.stringify({Id:value})
          })
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data);
          if (data.errorCode==0) {
            dispatch({type: STAFF_LIST,payload:''});
           }else{
           // dispatch({type: FETCH_SUCCESS});
            dispatch({type: FETCH_ERROR, payload: 'Unable to Delete'});
          }
        },
        
        (error) => {
         // setIsLoaded(true);
         // setError(error);
        }
      )
      }
   
  }

   

  export const LeaveApprove = (value) => {
    return async (dispatch) => {
      fetch(BaseUrl+"leaveapprove",{
        method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
              body: JSON.stringify({Id:value})
          })
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data);
          if (data.errorCode==0) {
            dispatch({type: LEAVE_DATA,payload:''});
            dispatch({type: LEAVE_EDIT_DATA,payload:''});
           }else{
           // dispatch({type: FETCH_SUCCESS});
            dispatch({type: FETCH_ERROR, payload: 'Unable to Delete'});
          }
        },
        
        (error) => {
         // setIsLoaded(true);
         // setError(error);
        }
      )
      }
   
  }

  export const LeaveDelete = (value) => {
    return async (dispatch) => {
      fetch(BaseUrl+"deleteleave",{
        method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
              body: JSON.stringify({Id:value})
          })
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data);
          if (data.errorCode==0) {
            dispatch({type: LEAVE_DATA,payload:''});
            dispatch({type: LEAVE_EDIT_DATA,payload:''});
           }else{
           // dispatch({type: FETCH_SUCCESS});
            dispatch({type: FETCH_ERROR, payload: 'Unable to Delete'});
          }
        },
        
        (error) => {
         // setIsLoaded(true);
         // setError(error);
        }
      )
      }
   
  }

  export const getCustomerListAdmin = (token) => {
    //alert(token);
    return async (dispatch) => {
      const token =localStorage.getItem('token');
      dispatch({type: FETCH_START});
      var url = BaseUrl+"users";
   // console.log('baseUrlll',url)
    const response = await fetch(url,{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token})
        });
       // dispatch({type: FETCH_SUCCESS});
       // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
    const data = await response.json();
    console.log('from Saga',data)
    if (data.errorCode==0) {
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: CUSTOMER_LIST, payload: data.result});
      dispatch({type: STAFF_EDIT_DATA,payload:''});
      dispatch({type: SAVED,payload:''});
    }else{
      dispatch({type: FETCH_SUCCESS});
        dispatch({type: CUSTOMER_LIST, payload: ''});
        console.log("Error****:");
    }
         
      }
    
  };

  export const getCustomerListBranch = (token) => {
    //alert(token);
    return async (dispatch) => {
      const token =localStorage.getItem('token');
      dispatch({type: FETCH_START});
      var url = BaseUrl+"usersbybranch";
    console.log('baseUrlll',token)
    const response = await fetch(url,{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token})
        });
       // dispatch({type: FETCH_SUCCESS});
       // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
    const data = await response.json();
    console.log('from Saga',data)
    if (data.errorCode==0) {
      dispatch({type: FETCH_SUCCESS});
      dispatch({type: CUSTOMER_LIST, payload: data.result});
      dispatch({type: STAFF_EDIT_DATA,payload:''});
      dispatch({type: SAVED,payload:''});
    }else{
      dispatch({type: FETCH_SUCCESS});
        dispatch({type: CUSTOMER_LIST, payload: ''});
        console.log("Error****:");
    }
         
      }
    
  };
  
  export const StatusUpdate = (Id,status) => {
    //alert(token);
    return async (dispatch) => {
      //const token =localStorage.getItem('token');
      dispatch({type: FETCH_START});
      var url = BaseUrl+"updatestatus";
   console.log('baseUrlll',Id)
    const response = await fetch(url,{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({Id:Id,Status:status})
        });
       // dispatch({type: FETCH_SUCCESS});
       // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
    const data = await response.json();
    console.log('from Saga',data)
    if (data.errorCode==0) {
     
    }else{
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: CUSTOMER_LIST, payload: ''});
        console.log("Error****:");
    }
         
      }
    
  };

  export const bookingAssign = (bookingId,Staff_Id,roomId) => {
    //alert(token);
    return async (dispatch) => {
      //const token =localStorage.getItem('token');
      dispatch({type: FETCH_START});
      var url = BaseUrl+"bookingassign";
  // console.log('baseUrlll',Id)
    const response = await fetch(url,{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({Id:bookingId,Staff_Id:Staff_Id,Room_Id:roomId})
        });
       // dispatch({type: FETCH_SUCCESS});
       // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
    const data = await response.json();
    console.log('from Saga',data)
    if (data.errorCode==0) {
        dispatch({type: BOOKING_LIST,payload:''});
    }else{
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: CUSTOMER_LIST, payload: ''});
        console.log("Error****:");
    }
         
      }
    
  };

  export const bookingComplete = (bookingId,serviceIds,Description,paymentType) => {
    //alert(token);
    return async (dispatch) => {
      //const token =localStorage.getItem('token');
      dispatch({type: FETCH_START});
      var url = BaseUrl+"bookingcomplete";
  // console.log('baseUrlll',Id)
    const response = await fetch(url,{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({Id:bookingId,serviceIds:serviceIds,Description:Description,paymentType:paymentType})
        });
       // dispatch({type: FETCH_SUCCESS});
       // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
    const data = await response.json();
    console.log('from Saga',data)
    if (data.errorCode==0) {
        dispatch({type: BOOKING_LIST,payload:''});
    }else{
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: CUSTOMER_LIST, payload: ''});
        console.log("Error****:");
    }
         
      }
    
  };

  
