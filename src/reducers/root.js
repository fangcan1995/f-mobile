import {
    combineReducers
} from 'redux-immutablejs';
import auth from './auth';
import home from './home';
import detail from './detail'
import redpacket from './redpacket';
import subjectList from './subjectList';
import discover from './discover';
import dynamic from './dynamic';
import discoverDeail from './discoverDetail';
import register from './register';
import retrievePassword from './retrievePassword';
import personal from './personal';

const rootReducer = combineReducers({
    auth,
    home,
    redpacket,
    subjectList,
    discover,
    dynamic,
    discoverDeail,
    register,
    retrievePassword,
    personal,
    detail
});
export default rootReducer;