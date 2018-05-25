import { createReducer } from 'redux-immutablejs';
import { fromJS } from 'immutable';

const initialState = fromJS({
    isFetching: false,
    errorMessage:null,
    projectInfo:{
        filesList:[],
        loanCreditCountDto:{},
        mortgageCarHis:{},
        projectInfoBaseInfoDto:{},
        mortgageHouseHis:{}       
    }
});

export default createReducer(initialState, {

    //获取项目详情
    [`project/GET_PROJECT_INFO_PENDING`]: (state, action) => state.merge({
    isFetching: true,
    }),
    [`project/GET_PROJECT_INFO_FULFILLED`]: (state, action) => state.merge({
    isFetching: false,
    projectInfo: action.payload,
    errorMessage:null
    }),
    [`project/GET_PROJECT_INFO_REJECTED`]: (state, action) => state.merge({
    isFetching: false,
    errorMessage: action.payload.message
    }),
})
