import {
    combineReducers
} from 'redux-immutablejs';
import auth from './auth';
import home from './home';
import login from './login';
import detail from './detail'
import redpacket from './redpacket';
import subjectList from './subjectList';
import projectDetail from './projectDetail';
import investmentRecord from './investmentRecord';
import discover from './discover';
import dynamic from './dynamic';

const rootReducer = combineReducers({
    auth,
    home,
    login,
    redpacket,
    subjectList,
    discover,
    dynamic,
    detail,
    projectDetail,
    investmentRecord
});
export default rootReducer;