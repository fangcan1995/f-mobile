import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { DISCOVER } from '../actions-type/discover';

const initialState = fromJS({
	isFetching: false,
	isAuthenticated: !!cookie.get('token'),
    discover:[]
});

export default createReducer(initialState, {

  //获取发现首页数据
  [`${DISCOVER}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${DISCOVER}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    discover:action.payload,
  }),

  [`${DISCOVER}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
