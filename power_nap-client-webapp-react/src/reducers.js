import { combineReducers } from 'redux';
// reducers import
import { user } from './redux/user.redux';
import { notes } from './redux/notes.redux';

// combine the reducers
export default combineReducers({ user, notes });
