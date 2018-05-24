import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    projectDetails:{},
    myInfo:{},
    money:0,
    invest:'',
    profit:0.00
});

export default createReducer(initialState, {
  [`detail/GET_DETAILS_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`detail/GET_DETAILS_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    projectDetails: action.payload
  }),
  [`detail/GET_DETAILS_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  //获取账户信息
  [`detail/GET_MY_INFO_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`detail/GET_MY_INFO_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    myInfo: action.payload
  }),
  [`detail/GET_MY_INFO_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  //设置贷款金额

  ['detail/SET_MONEY']:(state, action) => state.merge({
    isFetching: false,
    money: action.payload
  }),

  // 保存预期投资利润

  ['detail/SET_PROFIT']:(state, action) => state.merge({
    isFetching: false,
    profit: action.payload
  }),

  //提交投资

  [`detail/POST_INVEST_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`detail/POST_INVEST_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    invest: action.payload
  }),
  [`detail/POST_INVEST_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.msg
  }),
})
