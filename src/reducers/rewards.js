import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    rewardsList:[],
    reward:'选择系统奖励'
});

export default createReducer(initialState, {
  
  //获取可用系统奖励列表信息
  [`rewards/GET_REWARDS_LIST_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`rewards/GET_REWARDS_LIST_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    rewardsList: action.payload
  }),
  [`rewards/GET_REWARDS_LIST_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  //选择红包或额加息券

  [`rewards/SET_REWARDS`]: (state, action) => state.merge({
    isFetching: false,
    reward: action.payload
  }),
})
