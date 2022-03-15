import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS, UPDATE_LOAD_USER,
  USER_DATA,
  USER_TOKEN_SET,BRANCH_LIST,SAVED,PRODUCT_LIST,SERVICE_LIST,
  BRANCH_EDIT_DATA,PRODUCT_EDIT_DATA,SERVICE_EDIT_DATA,PACKAGE_LIST,PACKAGE_EDIT_DATA,SUPERADMIN_DASHBOARD_DATA,STAFF_LIST,RECEIVE_OTP, CUSTOMER_LIST,BOOKING_LIST,NEWTIMESLOT
 ,TIMESLOTLIST,SERVICE_PACKAGE_LIST,TIMESLOTS_DATA,BOOKING_LIST_COMPLETED,BOOKING_LIST_PLACED,BOOKING_LIST_ASSIGNED,BOOKING_LIST_CANCELLED,REPORT_LIST_COMPLETED,REPORT_LIST_CANCELLED,REPORT_BRANCH_WISE,SALES_REPORT} from "../../constants/ActionTypes";
//import axios from 'util/Api'
import axios from 'axios';
const BaseUrl="https://www.blackstones-spa.com/api/api/";
//https://www.cluemediator.com/api-call-in-react-with-redux-using-redux-thunk
export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};

export const sendOTP = (values) => {
  console.log(values);
  return async (dispatch) => {
  dispatch({type: FETCH_START});
  fetch(BaseUrl+"sendotp",{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({form:values})
      })
  .then(res => res.json())
  .then(
    (data) => {
      console.log(data);
      if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
         // localStorage.setItem("signupData",values);
         localStorage.setItem("otp", data.result);
          //data.formOBJ=values;
          //dispatch({type: RECEIVE_OTP,payload:data});
        }else{
          dispatch({type: FETCH_ERROR, payload: 'Mobile Number already Exist'});
      }
    },
    
    (error) => {
      
    }
  )
    }
 
};
export const checkOTP = (otpdata,serviceId,bookingDate,timeslot,name,mobile,email,description) => {
  console.log('serviceId',serviceId);
  return async (dispatch) => {
    const otp =localStorage.getItem('otp');
    const token =localStorage.getItem('token');
    if(otp !=otpdata){
      dispatch({type: FETCH_ERROR, payload: 'Invalid Otp'});
    }else{
  dispatch({type: FETCH_START});
  fetch(BaseUrl+"newbookingbybranch",{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({serviceId:serviceId,Booking_Date:bookingDate,Time_Slot:timeslot,name:name,Emailaddress:email,Mobilenumber:mobile,description:description,token:token})
      })
  .then(res => res.json())
  .then(
    (data) => {
      console.log(data);
      if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SAVED,payload:'success'});
          dispatch({type: BOOKING_LIST,payload:''});
          
        }else{
          
      }
    },
    
    (error) => {
      
    }
  )
  }
    }
 
};

export const ResetSaved = (values) => {

   return async (dispatch) => {
    dispatch({type: TIMESLOTS_DATA,payload:''});
    dispatch({type: SAVED,payload:''});
   }
  }

export const userSignUp = (values) => {
  // console.log(email, password);
 
 // console.log('signupData', signupData);
   return async (dispatch) => {
   dispatch({type: FETCH_START});
   fetch(BaseUrl+"usersignup",{
     method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/x-www-form-urlencoded'
         },
           body: JSON.stringify({form:values})
       })
   .then(res => res.json())
   .then(
     (data) => {
       console.log(data);
       if (data.errorCode==0) {
           dispatch({type: FETCH_SUCCESS});
           //localStorage.setItem("signupData",values);
           dispatch({type: RECEIVE_OTP,payload:''});
         }else{
           dispatch({type: FETCH_ERROR, payload: 'Unable to Save'});
       }
     },
     
     (error) => {
       
     }
   )
     }
  
 };

 export const userSignUpAdmin = (values) => {
  // console.log(email, password);
 
 // console.log('signupData', signupData);
 
   return async (dispatch) => {
    const token =localStorage.getItem('token');
    console.log('token', token);
   dispatch({type: FETCH_START});
   fetch(BaseUrl+"usersignupadmin",{
     method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/x-www-form-urlencoded'
         },
           body: JSON.stringify({form:values,token:token})
       })
   .then(res => res.json())
   .then(
     (data) => {
       console.log(data);
       if (data.errorCode==0) {
           dispatch({type: FETCH_SUCCESS});
           dispatch({type: CUSTOMER_LIST, payload:''});
           //localStorage.setItem("signupData",values);
           dispatch({type: RECEIVE_OTP,payload:''});
         }else{
           dispatch({type: FETCH_ERROR, payload: 'Unable to Save'});
       }
     },
     
     (error) => {
       
     }
   )
     }
  
 };

export const userSignUpOld = ({email, password, name}) => {
  console.log(email, password);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    axios.post('auth/register', {
        email: email,
        password: password,
        name: name
      }
    ).then(({data}) => {
      console.log("data:", data);
      if (data.result) {
        localStorage.setItem("token", data.token.access_token);
        axios.defaults.headers.common['authorization'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
        dispatch({type: USER_DATA, payload: data.user});
      } else {
        console.log("payload: data.error", data.error);
        dispatch({type: FETCH_ERROR, payload: "Network Error"});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }
};

export const userSignIn =   ({email, password}) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    var url = BaseUrl+"userlogin";
 // console.log('baseUrlll',url)
  const response = await fetch(url,{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({userName:email,password:password})
      });
     // dispatch({type: FETCH_SUCCESS});
     // dispatch({type: FETCH_ERROR, payload: "ayyappa"});
  const data = await response.json();
  console.log('from Saga',data)
  if (data.errorCode==0) {
    //dispatch({type: FETCH_ERROR, payload:data.result.token});
    console.log('token',data.result.token)
    localStorage.setItem("token",data.result.token);
    dispatch({type: FETCH_SUCCESS,payload:'loggedin Success'});
    dispatch({type: USER_TOKEN_SET, payload: data.result.token});
    dispatch(getUser(data.result.token));
  }else{
    dispatch({type: FETCH_ERROR, payload: 'Invalid Username/password'});
  }
       
    }

  //return data;


  
  /*return (dispatch) => {
    
    dispatch({type: FETCH_START});
   // axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
    axios.post('/userlogin', {userName: 'admin',password:'1234'}
    ).then(({data}) => {
      console.log("userSignIn: ", data);
      if (data.result) {
        localStorage.setItem("userlogin",data.token.access_token);
        axios.defaults.headers.common['Authorization'] = "Bearer " + data.token.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_TOKEN_SET, payload: data.token.access_token});
        dispatch(getUser(data.token.access_token));
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });
  }*/
};
export const branchRigister = (values,Id,startTime,endTime) => {
  //https://stackoverflow.com/questions/15153776/convert-base64-string-to-an-image-file#:~:text=Using%20following%20code%20to%20convert,jpg'%20)%3B
  console.log('formData',startTime);
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    var url = BaseUrl+"branchregister";
 // console.log('baseUrlll',url)
  const response = await fetch(url,{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({form:values,Id:Id,startTime:startTime,endTime:endTime})
      });
     
  const data = await response.json();
  console.log('from Saga',data)
  if (data.errorCode==0) {
    
    dispatch({type: FETCH_SUCCESS});
    dispatch({type: SAVED,payload:'success'});
    dispatch({type: BRANCH_LIST,payload:''});
    dispatch({type: BRANCH_EDIT_DATA,payload:''});
    
    
   }else{
   // dispatch({type: FETCH_SUCCESS});
    dispatch({type: FETCH_ERROR, payload: 'Email id already exist'});
  }
       
    }

}
export const branchEditReset = () => {
  return (dispatch) => {
    dispatch({type: BRANCH_EDIT_DATA,payload:''});
    dispatch({type: PRODUCT_EDIT_DATA,payload:''});
    dispatch({type: SERVICE_EDIT_DATA,payload:''});
    dispatch({type: PACKAGE_EDIT_DATA,payload:''});
    dispatch({type: SUPERADMIN_DASHBOARD_DATA,payload:''});
    dispatch({type: STAFF_LIST,payload:''});
    dispatch({type: TIMESLOTLIST,payload:''});
  }
}
export const bookingRest = () => {
  return (dispatch) => {
    dispatch({type: BOOKING_LIST,payload:''});
   
  }
}
export const branchDelete = (value) => {
  
    return async (dispatch) => {
      fetch(BaseUrl+"deletebranch",{
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
            dispatch({type: BRANCH_LIST,payload:''});
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
export const productDelete = (value) => {
  return async (dispatch) => {
    fetch(BaseUrl+"deleteproduct",{
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
          dispatch({type: PRODUCT_LIST,payload:''});
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

export const branchList = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});  
  fetch(BaseUrl+"branchlist")
  .then(res => res.json())
  .then(
    (data) => {
      console.log('branList',data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: BRANCH_LIST,payload:data.result});
        dispatch({type: SAVED,payload:''});
        dispatch({type: BRANCH_EDIT_DATA,payload:''});
       }else{
        dispatch({type: FETCH_ERROR, payload: 'Not Found'});
      }
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
     // setIsLoaded(true);
     // setError(error);
    }
  )
  }
 
}

export const ServicePackageList = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});  
  fetch(BaseUrl+"servicepackage")
  .then(res => res.json())
  .then(
    (data) => {
      console.log('servicepackage',data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SERVICE_PACKAGE_LIST,payload:data.result});
        dispatch({type: SAVED,payload:''});
        
       }else{
        dispatch({type: FETCH_ERROR, payload: 'Not Found'});
      }
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
     // setIsLoaded(true);
     // setError(error);
    }
  )
  }
 
}
export const resetProduct=() =>{
  
  return (dispatch) => {
    dispatch({type: PRODUCT_LIST,payload:''});
  }
}
export const productFetchData = (type) => {
  //https://stackoverflow.com/questions/15153776/convert-base64-string-to-an-image-file#:~:text=Using%20following%20code%20to%20convert,jpg'%20)%3B
  console.log('formData');
  
  return async (dispatch) => {
    dispatch({type: FETCH_START});
   // dispatch({type: PRODUCT_LIST,payload:''});
    
  fetch(BaseUrl+"productall?Type="+type)
  .then(res => res.json())
  .then(
    (data) => {
      //console.log('formData',data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: PRODUCT_LIST,payload:data});
        dispatch({type: PRODUCT_EDIT_DATA,payload:''});
        dispatch({type: SAVED,payload:''});
        
       }else{
        dispatch({type: FETCH_ERROR, payload: 'Not Found'});
      }
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
     // setIsLoaded(true);
     // setError(error);
    }
  )
  }
 
}

export const newProduct = (values,Id) => {
 
  console.log('formData');
  return async (dispatch) => {
  fetch(BaseUrl+"newproduct",{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({form:values,Id:Id})
      })
  .then(res => res.json())
  .then(
    (data) => {
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SAVED,payload:'success'});
        dispatch({type: PRODUCT_LIST,payload:''});
        dispatch({type: PRODUCT_EDIT_DATA,payload:''});
        
        
       }else{
       // dispatch({type: FETCH_SUCCESS});
        dispatch({type: FETCH_ERROR, payload: 'Product already Exist'});
      }
    },
    
    (error) => {
     // setIsLoaded(true);
     // setError(error);
    }
  )
  }
 
}

export const newService = (values,products,Id) => {
 
  console.log('formData');
  return async (dispatch) => {
  fetch(BaseUrl+"newservice",{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({form:values,products:products,Id:Id})
      })
  .then(res => res.json())
  .then(
    (data) => {
      console.log(data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SAVED,payload:'success'});
        dispatch({type: SERVICE_LIST,payload:''});
        dispatch({type: SERVICE_EDIT_DATA,payload:''});
        
       }else{
      
        dispatch({type: FETCH_ERROR, payload: 'Product already Exist'});
      }
    },
    
    (error) => {
     // setIsLoaded(true);
     // setError(error);
    }
  )
  }
 
}

export const serviceDelete = (value) => {
  return async (dispatch) => {
    fetch(BaseUrl+"deleteservice",{
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
          dispatch({type: SERVICE_LIST,payload:''});
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

export const branchEditFetch = (values) => {
 
  console.log('formData');
  return async (dispatch) => {
  fetch(BaseUrl+"branchedit",{
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
      console.log(data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        //dispatch({type: FETCHED,payload:'success'});
        dispatch({type: BRANCH_EDIT_DATA,payload:data.result});
        
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

export const productEditFetch = (values) => {
 
  console.log('formData');
  return async (dispatch) => {
  fetch(BaseUrl+"productedit",{
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
      console.log(data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        //dispatch({type: FETCHED,payload:'success'});
        dispatch({type: PRODUCT_EDIT_DATA,payload:data.result});
        
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

export const serviceEditFetch = (values) => {
 
  console.log('formData');
  return async (dispatch) => {
  fetch(BaseUrl+"serviceedit",{
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
      console.log(data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        //dispatch({type: FETCHED,payload:'success'});
        dispatch({type: SERVICE_EDIT_DATA,payload:data.result});
        
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
export const getUser = (token) => {
  //alert(token);
  return async (dispatch) => {
    const token =localStorage.getItem('token');
    dispatch({type: FETCH_START});
    var url = BaseUrl+"authuser";
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
    dispatch({type: USER_DATA, payload: data.result});
  }else{
    dispatch({type: FETCH_SUCCESS});
      dispatch({type: UPDATE_LOAD_USER, payload: false});
      console.log("Error****:");
  }
       
    }
  
};
export const serviceListData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});  
  fetch(BaseUrl+"serviceall")
  .then(res => res.json())
  .then(
    (data) => {
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SERVICE_LIST,payload:data.result});
        dispatch({type: SAVED,payload:''});
        dispatch({type: SERVICE_EDIT_DATA,payload:''});
       }else{
        dispatch({type: FETCH_ERROR, payload: 'Not Found'});
      }
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
     // setIsLoaded(true);
     // setError(error);
    }
  )
  }
 
}


export const newPackage = (values,Id) => {
 
  console.log('formData');
  return async (dispatch) => {
  fetch(BaseUrl+"newpackage",{
    method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: JSON.stringify({form:values,Id:Id})
      })
  .then(res => res.json())
  .then(
    (data) => {
      console.log(data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SAVED,payload:'success'});
        dispatch({type: PACKAGE_LIST,payload:''});
        dispatch({type: PACKAGE_EDIT_DATA,payload:''});
        
       }else{
      
        dispatch({type: FETCH_ERROR, payload: 'Package already Exist'});
      }
    },
    
    (error) => {
     // setIsLoaded(true);
     // setError(error);
    }
  )
  }
 
}

export const packageListData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});  
  fetch(BaseUrl+"packageall")
  .then(res => res.json())
  .then(
    (data) => {
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: PACKAGE_LIST,payload:data.result});
        dispatch({type: SAVED,payload:''});
        dispatch({type: PACKAGE_EDIT_DATA,payload:''});
       }else{
        dispatch({type: FETCH_ERROR, payload: 'Not Found'});
      }
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
     // setIsLoaded(true);
     // setError(error);
    }
  )
  }
 
}

export const packageEditFetch = (values) => {
 
  console.log('formData'+values);
  return async (dispatch) => {
  fetch(BaseUrl+"packageedit",{
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
      console.log(data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        //dispatch({type: FETCHED,payload:'success'});
        dispatch({type: PACKAGE_EDIT_DATA,payload:data.result});
        
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

export const packageDelete = (value) => {
  return async (dispatch) => {
    fetch(BaseUrl+"deletepackage",{
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
          dispatch({type: PACKAGE_LIST,payload:''});
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
export const addStock = (Id,Qty) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    fetch(BaseUrl+"newstock",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({Product_Id:Id,Quantity:Qty})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: PRODUCT_LIST,payload:''});
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

export const newBooking = (packageId,branchId,BookingDay) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"newbooking",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({Package_Id:packageId,Branch_Id:branchId,Booking_Date:BookingDay,token:token})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SAVED,payload:'success'});
          dispatch({type: BOOKING_LIST,payload:''});
         }else{
         // dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to insert'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}

export const serachBranchWiseBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
  // dispatch({type: BOOKING_LIST,payload:''});
    const token =localStorage.getItem('token');
    console.log(BaseUrl+"superadminbookingsbranchwise");
    fetch(BaseUrl+"superadminbookingsbranchwise",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}

export const superAdminBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
  // dispatch({type: BOOKING_LIST,payload:''});
    const token =localStorage.getItem('token');
    console.log(BaseUrl+"superadminbookings");
    fetch(BaseUrl+"superadminbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}
export const branchBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
  // dispatch({type: BOOKING_LIST,payload:''});
    const token =localStorage.getItem('token');
    console.log(BaseUrl+"branchbookings");
    fetch(BaseUrl+"branchbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}
export const customerBookings = () =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"customerbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}

export const CompletedBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"completedbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST_COMPLETED,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}

export const CompletedBookingsDatewise = (startDate,endDate) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"completedbookingsdatewise",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,startDate:startDate,endDate:endDate})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log('data',data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: REPORT_LIST_COMPLETED,payload:data});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}
export const CompletedBookingStaffReport = (startDate,endDate) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"completedbookingstaffreport",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,startDate:startDate,endDate:endDate})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log('data',data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: REPORT_LIST_COMPLETED,payload:data});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}




export const PlacedBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"placedbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST_PLACED,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}

export const AssignedStaffBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"staffassignedbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST_ASSIGNED,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}
export const CompletedStaffBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"staffcompletedbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST_COMPLETED,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}
export const CancelledStaffBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"staffcancelledbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST_CANCELLED,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}


export const AssignedBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"assignedbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST_ASSIGNED,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}

export const CancelledBookings = (search) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"cancelledbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,search:search})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST_CANCELLED,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}

export const cancelledReport = (startDate,endDate) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    console.log('params',startDate)
    fetch(BaseUrl+"cancelledreports",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify({token:token,startDate:startDate,endDate:endDate})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log('data',data)
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: REPORT_LIST_CANCELLED,payload:data});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}


export const cancelledStaffReport = (startDate,endDate) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    console.log('params',startDate)
    fetch(BaseUrl+"cancelledstaffreports",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify({token:token,startDate:startDate,endDate:endDate})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log('data',data)
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: REPORT_LIST_CANCELLED,payload:data});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}
export const staffBookings = () =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"staffbookings",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token})
        })
    .then(res => res.json())
    .then(
      (data) => {
        
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST,payload:data.result});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}


export const deleteBooking = (value) => {
  return async (dispatch) => {
    fetch(BaseUrl+"deletebooking",{
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
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: BOOKING_LIST,payload:''});
         
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

export const newtimeSlot = (value,Id,type) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
   

    fetch(BaseUrl+"createtimeslot",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({data:value,serviceId:Id,type:type})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: TIMESLOTLIST,payload:''});
         
         }else{
          console.log(data);
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Time slot already exist'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
 
}

export const getTimeList = (Id,type) => {
  return async (dispatch) => {
    dispatch({type: FETCH_START});
    fetch(BaseUrl+"timeslotlist",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({Id:Id,type:type})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        if (data.errorCode==0) {
          //dispatch({type: FETCH_SUCCESS});
          dispatch({type: TIMESLOTLIST,payload:data.result});
         
         }else{
         // dispatch({type: FETCH_SUCCESS});
         // dispatch({type: FETCH_ERROR, payload: 'Unable to Delete'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
 
}


export const deleteTimeslot = (value) => {
  return async (dispatch) => {
    fetch(BaseUrl+"deletetimeslot",{
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
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: TIMESLOTLIST,payload:''});
         
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

export const uploadUserManual = (value) => {
  return async (dispatch) => {
    fetch(BaseUrl+"createmanual",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({form:value})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          //dispatch({type: TIMESLOTLIST,payload:''});
         
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


export const superadminDashboardData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});  
  fetch(BaseUrl+"superadmindashboard")
  .then(res => res.json())
  .then(
    (data) => {
      console.log(data);
      if (data.errorCode==0) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SUPERADMIN_DASHBOARD_DATA,payload:data});
        
       }else{
        dispatch({type: FETCH_ERROR, payload: 'Not Found'});
      }
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
     // setIsLoaded(true);
     // setError(error);
    }
  )
  }
 
}

export const userSignOut = () => {

  return (dispatch) => {
    dispatch({type: FETCH_START});
    localStorage.removeItem("token");
    dispatch({type: FETCH_SUCCESS});
    dispatch({type: SIGNOUT_USER_SUCCESS});
    dispatch({type: STAFF_LIST,payload:''});
    dispatch({type: CUSTOMER_LIST,payload:''});
    dispatch({type: STAFF_LIST,payload:''});
    dispatch({type: SUPERADMIN_DASHBOARD_DATA,payload:''});
    dispatch({type: BOOKING_LIST,payload:''});
    dispatch({type: REPORT_LIST_CANCELLED,payload:''});
    dispatch({type: REPORT_LIST_COMPLETED,payload:''});
    dispatch({type: BOOKING_LIST_COMPLETED,payload:''});
    dispatch({type: BOOKING_LIST_ASSIGNED,payload:''});
    dispatch({type: BOOKING_LIST_PLACED,payload:''});
    dispatch({type: BOOKING_LIST_CANCELLED,payload:''});
    dispatch({type: SALES_REPORT,payload:''});
    
    /*
    axios.post('auth/logout').then(({data}) => {
      console.log("log out",data)
      if (data.result) {
        localStorage.removeItem("token");
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: SIGNOUT_USER_SUCCESS});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      console.log("Error****:", error.message);
    });*/
  }
};

export const getTimeslots = (Id,bookingDate,name,mobile,email,description) => {

  return (dispatch) => {
    dispatch({type: FETCH_START});  
    const token =localStorage.getItem('token');
    //console(BaseUrl+"timeslotsbyadmin")
    fetch(BaseUrl+"timeslotsbyadmin",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({Id:Id,bookingDate:bookingDate,token:token})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        if (data.errorCode==0) {
          data['service_Id']=Id;
          data['bookingDate']=bookingDate;
          data['name']=name;
          data['mobile']=mobile;
          data['email']=email;
          data['description']=description;
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: TIMESLOTS_DATA,payload:data});
          
         }else{
          data['service_Id']=Id;
          data['bookingDate']=bookingDate;
          data['name']=name;
          data['mobile']=mobile;
          data['email']=email;
          data['description']=description;
          dispatch({type: TIMESLOTS_DATA,payload:data});
          dispatch({type: FETCH_ERROR, payload: 'Not Found'});
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
  }
};

export const BranchDashboardData = () => {

  return (dispatch) => {
    dispatch({type: FETCH_START});  
    const token =localStorage.getItem('token');
    //console(BaseUrl+"timeslotsbyadmin")
    fetch(BaseUrl+"branchdashboard",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SUPERADMIN_DASHBOARD_DATA,payload:data});
          
         }else{
          
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
  }
};
export const StaffDashboardData = () => {

  return (dispatch) => {
    dispatch({type: FETCH_START});  
    const token =localStorage.getItem('token');
    //console(BaseUrl+"timeslotsbyadmin")
    fetch(BaseUrl+"staffdashboard",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SUPERADMIN_DASHBOARD_DATA,payload:data});
          
         }else{
          
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
  }
};

export const BranchWiseReport = (startDate,endDate) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"brancheswisesales",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,startDate:startDate,endDate:endDate})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log('data',data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: REPORT_BRANCH_WISE,payload:data});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}
export const salesReports = (startDate,endDate) =>{
  return (dispatch) => {
    dispatch({type: FETCH_START}); 
    const token =localStorage.getItem('token');
    fetch(BaseUrl+"salesreportadmin",{
      method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
            body: JSON.stringify({token:token,startDate:startDate,endDate:endDate})
        })
    .then(res => res.json())
    .then(
      (data) => {
        console.log('data',data);
        if (data.errorCode==0) {
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: SALES_REPORT,payload:data});
         }else{
          dispatch({type: FETCH_SUCCESS});
          dispatch({type: FETCH_ERROR, payload: 'Unable to Load Bookings'});
        }
      },
      
      (error) => {
       // setIsLoaded(true);
       // setError(error);
      }
    )
    }
}
