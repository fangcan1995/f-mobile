import {
    combineReducers
} from 'redux-immutablejs';
import auth from './auth';
import home from './home';
import login from './login';
import detail from './detail'
import redpacket from './redpacket';

const rootReducer = combineReducers({
    auth,
    home,
    login,
    redpacket,
    detail
});
export default rootReducer;