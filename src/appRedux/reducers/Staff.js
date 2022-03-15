import {INIT_URL,STAFF_LIST,SAVED,STAFF_EDIT_DATA,CUSTOMER_LIST,ROOM_DATA,ROOM_EDIT_DATA,LEAVE_DATA,LEAVE_EDIT_DATA} from "../../constants/ActionTypes";
const INIT_STATE = {
  token: localStorage.getItem('token'),
  initURL: '',
  authUser: null,
  staffList:'',
  staffEditData:'',
  Saved:'',
  loadingAuthUser:'',
  customersList:'',
  roomList:'',
  roomEditData:'',
  vacationList:''
 
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case INIT_URL: {
      return {...state, initURL: action.payload};
    }

    
    case CUSTOMER_LIST: {
      return {
        ...state,
        customersList: action.payload,
      };
    }
    case STAFF_LIST: {
      return {
        ...state,
        staffList: action.payload,
      };
    }
    case STAFF_EDIT_DATA: {
      return {
        ...state,
        staffEditData: action.payload,
      };
    }
    case ROOM_DATA: {
      return {
        ...state,
        roomList: action.payload,
      };
    }
    case ROOM_EDIT_DATA: {
      return {
        ...state,
        roomEditData: action.payload,
      };
    }
    case LEAVE_DATA: {
      return {
        ...state,
        vacationList: action.payload,
      };
    }
    case LEAVE_EDIT_DATA: {
      return {
        ...state,
        vacationEditData: action.payload,
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
    
    default:
      return state;
  }
}
