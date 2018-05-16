import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    repayList: [],
    repayTotal: {}
});

export default createReducer(initialState, {
    ['GET_REPAYLIST_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_REPAYLIST_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        repayList: action.payload
    }),
    ['GET_REPAYLIST_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
    ['GET_REPAYTOTAL_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_REPAYTOTAL_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        repayTotal: action.payload
    }),
    ['GET_REPAYTOTAL_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})