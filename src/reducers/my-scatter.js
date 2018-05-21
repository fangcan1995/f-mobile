import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    scatterList: []
});

export default createReducer(initialState, {
    ['GET_MYSCATTER_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_MYSCATTER_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        scatterList: action.payload
    }),
    ['GET_MYSCATTER_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})