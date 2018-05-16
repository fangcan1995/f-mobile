import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    projectDetails:{}
});

export default createReducer(initialState, {
  [`detail/GET_DETAILS_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`detail/GET_DETAILS_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    projectDetails: action.payload
  }),
  [`detail/GET_DETAILS_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

})
