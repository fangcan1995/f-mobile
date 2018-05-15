import {
    combineReducers
} from 'redux-immutablejs';
import auth from './auth';
import home from './home';
import login from './login';
import detail from './detail'
import redpacket from './redpacket';
import discover from './discover';
import dynamic from './dynamic';

const rootReducer = combineReducers({
    auth,
    home,
    login,
    redpacket,
    discover,
    dynamic,
    detail
});
export default rootReducer;