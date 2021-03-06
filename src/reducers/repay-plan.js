import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    repayData: {}
});

export default createReducer(initialState, {
    ['GET_REPAYPLAN_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_REPAYPLAN_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        repayData: action.payload
    }),
    ['GET_REPAYPLAN_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})