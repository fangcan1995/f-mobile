import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    list:[]
});

export default createReducer(initialState, {
  [`subject/GET_LIST_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`subject/GET_LIST_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    list: action.payload
  }),
  [`subject/GET_LIST_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

})
