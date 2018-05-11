
import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
import cookie from 'js-cookie';

import { LOGINPASSWORD } from '../actions-type/auth';

const initialState = fromJS({
	isFetching: false,
    loginState:{}
});

export default createReducer(initialState, {
  [`${LOGINPASSWORD}_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`${LOGINPASSWORD}_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    loginState: action.payload
  }),
  [`${LOGINPASSWORD}_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  })
})
