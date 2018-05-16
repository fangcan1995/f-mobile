import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { RETRIEVEPSD,RETRIEVEPSDCODE,SMSRETRIEVEPSDCODE } from '../actions-type/auth';

const initialState = fromJS({
    isFetching: false,
    retrievePasswordInfo:{},
    retrievePasswordCode:{},
    smsRetrievePasswordCode:{},
    
});

export default createReducer(initialState, {

  //注册
  [`${RETRIEVEPSD}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${RETRIEVEPSD}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    retrievePasswordInfo: action.payload
  }),
  [`${RETRIEVEPSD}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  //图形验证码
  [`${RETRIEVEPSDCODE}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${RETRIEVEPSDCODE}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    retrievePasswordCode: action.payload
  }),
  [`${RETRIEVEPSDCODE}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  //获取短信验证吗
  [`${SMSRETRIEVEPSDCODE}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${SMSRETRIEVEPSDCODE}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    smsRetrievePasswordCode: action.payload
  }),
  [`${SMSRETRIEVEPSDCODE}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
