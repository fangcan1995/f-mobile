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
import discoverDeail from './discoverDetail';

const rootReducer = combineReducers({
    auth,
    home,
    login,
    redpacket,
    discover,
    dynamic,
    discoverDeail,
    detail
});
export default rootReducer;