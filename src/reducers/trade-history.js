import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';


const initialState = fromJS({
    isFetching: false,
    tradeData: {}
});

export default createReducer(initialState, {
    ['GET_TRADELIST_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_TRADELIST_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        tradeData: action.payload
    }),
    ['GET_TRADELIST_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})