import {INIT_URL, SIGNOUT_USER_SUCCESS, UPDATE_LOAD_USER, USER_DATA, USER_TOKEN_SET,BRANCH_LIST,SAVED,PRODUCT_LIST,SERVICE_LIST,BRANCH_EDIT_DATA,PRODUCT_EDIT_DATA,SERVICE_EDIT_DATA,PACKAGE_EDIT_DATA,PACKAGE_LIST,SUPERADMIN_DASHBOARD_DATA,RECEIVE_OTP,BOOKING_LIST,NEWTIMESLOT,TIMESLOTLIST,SERVICE_PACKAGE_LIST,TIMESLOTS_DATA,BOOKING_LIST_COMPLETED,BOOKING_LIST_PLACED,BOOKING_LIST_ASSIGNED,BOOKING_LIST_CANCELLED,REPORT_LIST_COMPLETED,REPORT_LIST_CANCELLED,REPORT_BRANCH_WISE,SALES_REPORT} from "../../constants/ActionTypes";

const INIT_STATE = {
  token: localStorage.getItem('token'),
  initURL: '',
  authUser: null,
  loadingAuthUser: true,
  branchAll:'',
  Saved:'',
  productList:'',
  serviceList:'',
  packageList:'',
  branchEditData:'',
  productEditData:'',
  serviceEditData:'',
  packageEditData:'',
  superadminDashboardList:'',
  receivedOtp:'',
  customerbookings:'',
  completedBookings:'',
  completedReports:'',
  placedBookings:'',
  assignedBookings:'',
  cancelledBookings:'',
  cancelledReports:'',
  timeinsertdata:'',
  Timelist:'',
  servicePackageData:'',
  timeSlotsData:'',
  branchWiseReports:'',
  AllReports:''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        token: null,
        authUser: null,
        initURL: '',
       
      }
    }

    case USER_DATA: {
      return {
        ...state,
        authUser: action.payload,
        loadingAuthUser: false
      };
    }
    case REPORT_BRANCH_WISE: {
      return {
        ...state,
        branchWiseReports: action.payload,
        loadingAuthUser: false
      };
    }

    case SALES_REPORT: {
      return {
        ...state,
        AllReports: action.payload,
        loadingAuthUser: false
      };
    }

    case UPDATE_LOAD_USER: {
      return {
        ...state,
        loadingAuthUser: action.payload
      };
    }

    case USER_TOKEN_SET: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case BRANCH_LIST: {
      return {
        ...state,
        branchAll: action.payload,
      };
    }
    case BRANCH_EDIT_DATA: {
      return {
        ...state,
        branchEditData: action.payload,
      };
    }
    case PRODUCT_EDIT_DATA: {
      return {
        ...state,
        productEditData: action.payload,
      };
    }
    case SERVICE_EDIT_DATA: {
      return {
        ...state,
        serviceEditData: action.payload,
      };
    }
    case PACKAGE_EDIT_DATA: {
      return {
        ...state,
        packageEditData: action.payload,
      };
    }
    case PRODUCT_LIST: {
      return {
        ...state,
        productList: action.payload,
      };
    }
    case SERVICE_LIST: {
      return {
        ...state,
        serviceList: action.payload,
      };
    }
    case PACKAGE_LIST: {
      return {
        ...state,
        packageList: action.payload,
      };
    }
    case SUPERADMIN_DASHBOARD_DATA: {
      return {
        ...state,
        superadminDashboardList: action.payload,
      };
    }
    case SAVED: {
      //console.log('reducers',action.payload);
      return {
        ...state,
        Saved: action.payload,
        loadingAuthUser: false
      };
    }
    case BOOKING_LIST_COMPLETED: {
      return {
        ...state,
        completedBookings: action.payload,
        loadingAuthUser: false
      };
    }
    case REPORT_LIST_COMPLETED: {
      return {
        ...state,
        completedReports: action.payload,
        loadingAuthUser: false
      };
    }
    
    case BOOKING_LIST_PLACED: {
      return {
        ...state,
        placedBookings: action.payload,
        loadingAuthUser: false
      };
    }
    case BOOKING_LIST_ASSIGNED: {
      return {
        ...state,
        assignedBookings: action.payload,
        loadingAuthUser: false
      };
    }
    case BOOKING_LIST_CANCELLED: {
      return {
        ...state,
        cancelledBookings: action.payload,
        loadingAuthUser: false
      };
    }
    case REPORT_LIST_CANCELLED: {
      return {
        ...state,
        cancelledReports: action.payload,
        loadingAuthUser: false
      };
    }
    
    case RECEIVE_OTP: {
      //console.log('reducers',action.payload);
      return {
        ...state,
        receivedOtp: action.payload,
        loadingAuthUser: false
      };
    }
    case BOOKING_LIST: {
      return {
        ...state,
        customerbookings: action.payload,
       };
    }
    case NEWTIMESLOT: {
      return {
        ...state,
        timeinsertdata: action.payload,
       };
    }
    case TIMESLOTLIST: {
      return {
        ...state,
        Timelist: action.payload,
       };
    }
    case SERVICE_PACKAGE_LIST: {
      return {
        ...state,
        servicePackageData: action.payload,
       };
    }
    case TIMESLOTS_DATA: {
      return {
        ...state,
        timeSlotsData: action.payload,
       };
    }
     
    default:
      return state;
  }
}
