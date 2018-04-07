// This is an redux file about Plans
import axios from 'axios';
import { Toast } from 'antd-mobile';

// Define Actions
const ADD_ONE = 'ADD_ONE_PLAN';
const UPDATE_ONE = 'UPDATE_ONE_PLAN';
const DELETE_ONE = 'DELETE_ONE_PLAN';
const GET_USER_PLANS = 'GET_USER_PLANS';
const IN_ERROR = 'IN_ERROR';

// Initial State
const initState = {
  msg:'',
  plans:[],
};

// reducer
export function plans(state=initState, action){
  switch (action.type) {
    case ADD_ONE:
      return {...state, plans:[...state.plans, action.payload], okBack:true};

    case DELETE_ONE:
      // Toast.success('Note Saved Success ', 1);
      const index = state.plans.findIndex(i=>i._id === action.deletedPlanId);
      state.plans.splice(index, 1)
      return {...state,  };

    case UPDATE_ONE:
      Toast.success('Note Saved Success ', 1);
      return {...state, okBack:true };

    case IN_ERROR:
      Toast.fail(action.msg, 2);
      return {...state, msg:action.msg };

    case GET_USER_PLANS:
      return {...state, plans:[...plans, ...action.payload] };

    default:
      return {...state};
  }
}

// Action Creator
// get plans belong to one user
function getUserNotes(data){
  return {type:GET_USER_PLANS, payload:data};
}

// add one plan
function addOne(data){
  return {type:ADD_ONE, payload:data};
}

// delete a plan
function deleteOne(deletedPlanId){
  return {type:DELETE_ONE, deletedPlanId:deletedPlanId};
}

// update a note
function updateOne(data){
  return {type:UPDATE_ONE, payload:data};
}

// in error
function inError(msg){
  return { type:IN_ERROR, msg:msg };
}

// Export Logic Function
// add one plan
export function addOnePlan({userid, name, target_desc, desc, isPublic, start_time, plan_time, state}){

  return dispatch => {
    // not empty
    if (name.trim() === '' || start_time === null  || plan_time === null){
      dispatch(inError('Name or Start/Plan Time Not Allow Empty!'))
      return;
    }

    // start Time should not after plan time
    if (start_time > plan_time) {
      dispatch(inError('Start Time should Not After than Plan Time!'))
      return;
    }

    // console.log('data', {userid, name, target_desc, desc, isPublic, start_time, plan_time, state});
    axios.post('/plan/new', {userid, name, target_desc, desc, isPublic, start_time, plan_time, state})
    .then(res => {
      // console.log(res);
      if (res.status === 200 ) {
        if (res.data.code === 1){
          // code 1 means error in response
          dispatch(inError(res.data.msg));
        } else {
          // success
          dispatch(addOne(res.data.data));
        }
      }
    });

  }
}

// find user's all plans
// by userid
export function getUserPlansById({ userid }){
  return dispatch => {
    if (!userid) {
      // dispatch(inError('User Not Login'));
      return;
    }

    axios.post('/plan/findAllByUserId', { userid })
    .then(res =>{
      if (res.status === 200 ) {
        if (res.data.code === 1){
          // code 1 means error in response
          dispatch(inError(res.data.msg));
        } else {
          // success
          // console.log('res.data.data-->', res.data.data)
          dispatch(getUserNotes(res.data.data));
        }
      }
    });
  };
}

// export function update one
export function updateOneNote({ planid, name, target_desc, desc, isPublic, start_time, plan_time, state }){
  return dispatch => {
    axios.post('/plan/update', { planid, name, target_desc, desc, isPublic, start_time, plan_time, state })
    .then(res=>{

      if (res.status === 200 ) {
        if (res.data.code === 1){
          // code 1 means error in response
          dispatch(inError(res.data.msg));
        } else {
          // success
          dispatch(updateOne(res.data.data));
        }
      }
    });
  }
}

// export function delete one
export function deleteOneNote({ planid }){
  return dispatch => {
    axios.post('/plan/delete', { planid })
    .then(res=>{

      if (res.status === 200 ) {
        if (res.data.code === 1){
          // code 1 means error in response
          dispatch(inError(res.data.msg));
        } else {
          // success
          dispatch(deleteOne(planid));
        }
      }
    });
  }
}
