import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';


const initialState = fromJS({
    isFetching: false,
    chargeData: {}
});

export default createReducer(initialState, {
    ['GET_CHARGE_PENDING']: (state, action) => state.merge({
        isFetching: true,
    }),
    ['GET_CHARGE_FULFILLED']: (state, action) => state.merge({
        isFetching: false,
        chargeData: action.payload
    }),
    ['GET_CHARGE_REJECTED']: (state, action) => state.merge({
        isFetching: false,
        errorMessage: action.message
    }),
})