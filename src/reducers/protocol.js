import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { PROTOCOL } from '../actions-type/protocol';

const initialState = fromJS({
	isFetching: false,
  protocol:{
  }
});

export default createReducer(initialState, {

  //获取发现详情页数据
  [`${PROTOCOL}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${PROTOCOL}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    protocol:action.payload,
  }),

  [`${PROTOCOL}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
