import {
    createReducer
} from 'redux-immutablejs';
import {
    fromJS
} from 'immutable';

const initialState = fromJS({
    isFetching: false,
    couponList: []
});

export default createReducer(initialState, {
    ['GET_COUPON_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_COUPON_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        couponList: action.payload
    }),
    ['GET_COUPON_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})