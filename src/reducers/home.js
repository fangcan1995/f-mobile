import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';
// import cookie from 'js-cookie';

// import { LOGIN, LOGOUT } from '../actions-type/auth';

const initialState = fromJS({
    isFetching: false,
    adverts:{
        carouselList:[],
        randomList:[]
    },
    project:{
        advertList:[],
        noviceList:[],
    },
});

export default createReducer(initialState, {
  [`homePage/GET_ADVERTS_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    isAuthenticated: false,
  }),
  [`homePage/GET_ADVERTS_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    adverts: action.payload
  }),
  [`homePage/GET_ADVERTS_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

  [`homePage/GET_PROJECT_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    isAuthenticated: false,
  }),
  [`homePage/GET_PROJECT_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    project: action.payload
  }),
  [`homePage/GET_PROJECT_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),
})
