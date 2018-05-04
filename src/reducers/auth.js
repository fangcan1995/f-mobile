import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';

import { LOGIN, LOGOUT } from '../actions-type/auth';

const initialState = fromJS({
	isFetching: false,
	isAuthenticated: !!cookie.get('token'),
	userInfo: cookie.getJSON('userInfo') || {},
});

export default createReducer(initialState, {
  [`${LOGIN}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    isAuthenticated: false,
  }),
  [`${LOGIN}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: true,
    userInfo: action.payload
  }),
  [`${LOGIN}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
    errorMessage: action.message
  }),

  [`${LOGOUT}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    // isAuthenticated: true,
  }),
  [`${LOGOUT}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
  }),

  [`${LOGOUT}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    // isAuthenticated: true,
    errorMessage: action.message
  }),
})
