import { combineReducers } from 'redux-immutablejs';
import auth from './auth';
import home from './home';


const rootReducer = combineReducers({
	auth,
	home,
});
export default rootReducer;