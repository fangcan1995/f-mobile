import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    projectList:{
      list:[],
      pages:''
    },
    transferList:{
      list:[],
      pages:''
    },
    projectInfo:{}
});

export default createReducer(initialState, {
    //获取散标列表
  [`subject/GET_LIST_PENDING`]: (state, action) => state.merge({
    isFetching: true,
  }),
  [`subject/GET_LIST_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    projectList: {
      list:[...state.toJS().projectList.list,...action.payload.list],
      pages:action.payload.pages
    }
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
    transferList: {
      list:[...state.toJS().transferList.list,...action.payload.list],
      pages:action.payload.pa
    }
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
