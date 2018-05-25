import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';


const initialState = fromJS({
    isFetching: false,
    withdrawData: {},
});

export default createReducer(initialState, {
    ['GET_WITHDRAW_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_WITHDRAW_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        withdrawData: action.payload
    }),
    ['GET_WITHDRAW_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})