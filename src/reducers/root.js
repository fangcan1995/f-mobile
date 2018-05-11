import { combineReducers } from 'redux-immutablejs';
import auth from './auth';
import login from './login'

const rootReducer = combineReducers({
	auth,
	login
});
export default rootReducer;