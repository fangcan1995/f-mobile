import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';

const initialState = fromJS({
	isFetching: false,
    tradePassword:{},
    errorMessage:''
});

export default createReducer(initialState, {

  //获取发现详情页数据
  [`trade/SET_PASSWORD_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`trade/SET_PASSWORD_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    tradePassword:action.payload,
  }),

  [`trade/SET_PASSWORD_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})