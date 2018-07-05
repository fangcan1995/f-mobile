import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    scatterData: {},
    transfer:{},
    applyTransfer:{}
});

export default createReducer(initialState, {
    ['GET_MYSCATTER_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_MYSCATTER_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        scatterData: action.payload
    }),
    ['GET_MYSCATTER_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),

    ['TRANSFER_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['TRANSFER_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        transfer: action.payload
    }),
    ['TRANSFER_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),

    ['APPLYTRANSFER_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['APPLYTRANSFER_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        applyTransfer: action.payload
    }),
    ['APPLYTRANSFER_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})