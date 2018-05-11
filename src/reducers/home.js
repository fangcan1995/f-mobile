import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
// import cookie from 'js-cookie';

// import { LOGIN, LOGOUT } from '../actions-type/auth';

const initialState = fromJS({
    isFetching: false,
    adverts:[]
});

export default createReducer(initialState, {
  [`homePage/GET_ADVERTS_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    isAuthenticated: false,
  }),
  [`homePage/GET_ADVERTS_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: true,
    adverts: action.payload
  }),
  [`homePage/GET_ADVERTS_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    isAuthenticated: false,
    errorMessage: action.message
  }),

//   [`${LOGOUT}_PENDING`]: (state, action) => state.merge({
//     isFetching: true,
//     // isAuthenticated: true,
//   }),
//   [`${LOGOUT}_FULFILLED`]: (state, action) => state.merge({
//     isFetching: false,
//     isAuthenticated: false,
//   }),

//   [`${LOGOUT}_REJECTED`]: (state, action) => state.merge({
//     isFetching: false,
//     // isAuthenticated: true,
//     errorMessage: action.message
//   }),
})
