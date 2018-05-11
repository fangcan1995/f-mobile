import {
    createReducer
} from 'redux-immutablejs';
import {
    fromJS
} from 'immutable';

const initialState = fromJS({
    isFetching: false,
    redpacketsList: []
});

export default createReducer(initialState, {
    ['GET_REDPACKET_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_REDPACKET_FULFILLED']: (state, action) => {
        console.log(action.payload);
        return state.merge({
            isFetching: false,
            redpacketsList: action.payload
        });
    },
    ['GET_REDPACKET_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})