import {
    combineReducers
} from 'redux-immutablejs';
import auth from './auth';
import home from './home';
import login from './login';
import detail from './detail'
import redpacket from './redpacket';
import subjectList from './subjectList';

const rootReducer = combineReducers({
    auth,
    home,
    login,
    redpacket,
    detail,
    subjectList,
});
export default rootReducer;