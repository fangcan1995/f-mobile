import {
    combineReducers
} from 'redux-immutablejs';
import auth from './auth';
import home from './home';
import detail from './detail'
import redpacket from './redpacket';
import coupon from './coupon';
import my from './my';
import repayPlan from './repay-plan';
import subjectList from './subjectList';
import projectDetail from './projectDetail';
import investmentRecord from './investmentRecord';
import discover from './discover';
import dynamic from './dynamic';
import discoverDeail from './discoverDetail';
import register from './register';
import retrievePassword from './retrievePassword';
import personal from './personal';
import myTransfer from './my-transfer';
import myScatter from './my-scatter';
import rewards from './rewards';
import myCharge from './charge';
import tradeHistory from './trade-history';
import myWithdraw from './withdraw';
import tradePassword from './tradePassword'
import protocol from './protocol';

const rootReducer = combineReducers({
    auth,
    home,
    redpacket,
    subjectList,
    discover,
    dynamic,
    detail,
    projectDetail,
    investmentRecord,
    coupon,
    my,
    repayPlan,
    redpacket,
    subjectList,
    discover,
    dynamic,
    discoverDeail,
    register,
    retrievePassword,
    personal,
    detail,
    myTransfer,
    myScatter,
    rewards,
    myCharge,
    tradeHistory,
    tradePassword,
    protocol
});
export default rootReducer;