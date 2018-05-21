import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    tranferList: []
});

export default createReducer(initialState, {
    ['GET_MYTRANSFER_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_MYTRANSFER_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        tranferList: action.payload
    }),
    ['GET_MYTRANSFER_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})