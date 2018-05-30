import {
    createReducer
} from 'redux-immutablejs';
import {
    fromJS
} from 'immutable';

const initialState = fromJS({
    isFetching: false,
    myInfo: {},
    myCertification: {}
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

    ['GET_MYCERTIFICATION_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_MYCERTIFICATION_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        myCertification: action.payload
    }),
    ['GET_MYCERTIFICATION_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),

    ['GET_MYALL_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_MYALL_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        myInfo: action.payload[0],
        myCertification: action.payload[1]
    }),
    ['GET_MYALL_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})