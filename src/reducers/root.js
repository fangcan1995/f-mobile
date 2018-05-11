import { combineReducers } from 'redux-immutablejs';
import auth from './auth';
import home from './home';
import login from './login'

const rootReducer = combineReducers({
	auth,
	home,
	login	
	});
export default rootReducer;