import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { DISCOVERDETAIL } from '../actions-type/discover';

const initialState = fromJS({
	isFetching: false,
  discoverDeail:{
  }
});

export default createReducer(initialState, {

  //获取发现详情页数据
  [`${DISCOVERDETAIL}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${DISCOVERDETAIL}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    discoverDeail:action.payload,
  }),

  [`${DISCOVERDETAIL}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
