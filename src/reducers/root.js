import { combineReducers } from 'redux-immutablejs';
import auth from './auth';

const rootReducer = combineReducers({
	auth,
});
export default rootReducer;