import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { DYNAMIC } from '../actions-type/discover';

const initialState = fromJS({
	isFetching: false,
    dynamic:{
        list:[],
        pages:''
    }
});

export default createReducer(initialState, {


  //获取数据
  [`${DYNAMIC}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${DYNAMIC}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    dynamic:{
      list:[...state.toJS().dynamic.list,...action.payload.list],
      pages:action.payload.pages
    }
  }),

  [`${DYNAMIC}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  //修改风险评估数据
  [`${DYNAMIC}`]: (state, action) =>
  state.mergeDeep({
    dynamic: action.payload
  }),
})
