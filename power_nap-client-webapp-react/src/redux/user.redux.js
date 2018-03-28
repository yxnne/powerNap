// This is an redux file about User
import axios from 'axios';

// Define Actions
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const IN_ERROR = 'IN_ERROR';
const LOAD_DATA = 'LOAD_DATA';

// Initial State
const initState = {
  isAuth:false,
  msg:'',
  username:'',
};

// reducer
export function user(state=initState, action){
  switch (action.type){
    case LOGIN_SUCCESS:
      return { ...state, ...action.payload, redirectTo:action.redirectTo, isAuth:true };

    case LOAD_DATA:
      return { ...state, ...action.payload, isAuth:true };

    case IN_ERROR:
      return { ...state, msg:action.msg };

    default:
      return {...state};
  }
}

// Action Creators
// login success
function loginSuccess(data){
  return { type:LOGIN_SUCCESS, payload:data , redirectTo:'/plans'};
}

// in error
function inError(msg){
  return { type:IN_ERROR, msg:msg };
}

// export bussiness login
export function login({username, pwd}){

  return dispatch=>{
    axios.post('/user/login', {username, pwd})
    .then((res)=>{
      // console.log('data is => ', res)
      if (res.status === 200 ) {
        if (res.data.code === 1){
          // code 1 means error in response
          dispatch(inError(res.data.msg));
        } else {
          // success
          dispatch(loginSuccess(res.data.data));
        }
      }
    });
  };
}

// export bussiness loadData
// this function is for Authority component
// when there find a user by cookie info , set his infos here
export function loadData(userinfo){
  return { type:LOAD_DATA, payload:userinfo };

}
