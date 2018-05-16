import {
    combineReducers
} from 'redux-immutablejs';
import auth from './auth';
import home from './home';
import login from './login'
import redpacket from './redpacket';
import coupon from './coupon';
import my from './my';
import repayPlan from './repay-plan';

const rootReducer = combineReducers({
    auth,
    home,
    login,
    redpacket,
    coupon,
    my,
    repayPlan
});
export default rootReducer;