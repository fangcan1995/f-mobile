import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    list:[],
    transferList:[],
    projectInfo:{}
});

export default createReducer(initialState, {
    //获取散标列表
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
    //获取债转列表
  [`subject/GET_TRANSFER_LIST_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`subject/GET_TRANSFER_LIST_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    transferList: action.payload
  }),
  [`subject/GET_TRANSFER_LIST_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
  }),

    //获取项目详情
    [`subject/GET_PROJECT_INFO_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    }),
    [`subject/GET_PROJECT_INFO_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    transferList: action.payload
    }),
    [`subject/GET_PROJECT_INFO_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.message
    }),
})
