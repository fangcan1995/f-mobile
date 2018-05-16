import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    records:[]
});

export default createReducer(initialState, {

    //获取项目详情
    [`invest/GET_INVEST_RECORDS_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    }),
    [`invest/GET_INVEST_RECORDS_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    records: action.payload
    }),
    [`invest/GET_INVEST_RECORDS_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
    }),
})
