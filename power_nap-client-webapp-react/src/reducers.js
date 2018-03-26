import { combineReducers } from 'redux';
// reducers import
import { user } from './redux/user.redux';

// combine the reducers
export default combineReducers({ user });
