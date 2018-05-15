import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { DYNAMIC } from '../actions-type/discover';

const initialState = fromJS({
	isFetching: false,
    dynamic:{
        list:[],
    }
});

export default createReducer(initialState, {


  //获取巴巴汇动态数据
  [`${DYNAMIC}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${DYNAMIC}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    dynamic:action.payload,
  }),

  [`${DYNAMIC}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
