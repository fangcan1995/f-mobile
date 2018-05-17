import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';
import { CHANGEPASSWORD } from '../actions-type/auth';

const initialState = fromJS({
	isFetching: false,
  changePassword:{
  }
});

export default createReducer(initialState, {

  //获取发现详情页数据
  [`${CHANGEPASSWORD}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${CHANGEPASSWORD}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    changePassword:action.payload,
  }),

  [`${CHANGEPASSWORD}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
