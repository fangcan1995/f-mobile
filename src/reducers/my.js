import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    myInfo: {}
});

export default createReducer(initialState, {
    ['GET_MYINFO_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_MYINFO_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        myInfo: action.payload
    }),
    ['GET_MYINFO_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})