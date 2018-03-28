// This is an redux file about Notes
import axios from 'axios';
import { Toast } from 'antd-mobile';

// Define Actions
const ADD_ONE = 'ADD_ONE';
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
// add a new note
function addOne(data){
  return {type:ADD_ONE, payload:data};
}
// in error
function inError(msg){
  return { type:IN_ERROR, msg:msg };
}

// Export Logic Function
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
