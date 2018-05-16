import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { PERSONAL } from '../actions-type/personal';

const initialState = fromJS({
	isFetching: false,
  personal:{},

});

export default createReducer(initialState, {

  //获取发现首页数据
  [`${PERSONAL}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${PERSONAL}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    personal:action.payload,
  }),

  [`${PERSONAL}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

})
