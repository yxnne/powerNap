// This is an redux file about Notes
import axios from 'axios';
import { Toast } from 'antd-mobile';

// Define Actions
const ADD_ONE = 'ADD_ONE_NOTE';
const GET_USER_NOTES = 'GET_USER_NOTES';
const IN_ERROR = 'IN_ERROR';
const LOAD_NOTES = 'LOAD_NOTES';

// Initial State
const initState = {
  msg:'',
  notes:[],
};

// reducer
export function notes(state=initState, action){
  switch (action.type) {
    case GET_USER_NOTES:
      return {...state, notes:[...notes, ...action.payload] };
    case ADD_ONE:
      Toast.success('Note Saved Success ', 1);
      return {...state, notes:[...notes, action.payload] };
    case IN_ERROR:
      Toast.fail(action.msg, 1);
      return {...state, msg:action.msg };
    default:
      return {...state};
  }
}

// Action Creators
// get notes belong to one user
function getUserNotes(data){
  return {type:GET_USER_NOTES, payload:data};
}

// add a new note
function addOne(data){
  return {type:ADD_ONE, payload:data};
}
// in error
function inError(msg){
  return { type:IN_ERROR, msg:msg };
}

// Export Logic Function
// get suer's notes by userid
export function getUserNotesById({ userid }){
  return dispatch => {
    if (!userid) {
      dispatch(inError('User Not Login'));
      return;
    }

    axios.post('/note/findAllByUserId', { userid })
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


// add one note
export function addOneNote({ userid, title, content }){

  return dispatch => {

    if (title.trim() === '' || content.trim() ===''){
      dispatch(inError('Threr is Empty!'))
      return;
    }

    axios.post('/note/new', { userid, title, content })
    .then(res=>{

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
  };
}
