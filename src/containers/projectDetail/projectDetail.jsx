import React, { Component } from 'react';
import { getDetails } from '../../actions/detail';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { getProjectInfo } from "../../actions/projectDetail";
import { bindActionCreators } from 'redux';
import homeList1 from './../../assets/images/home-list1.png';
import homeList2 from './../../assets/images/home-list2.png';
import homeList3 from './../../assets/images/home-list3.png';
import homeList4 from './../../assets/images/home-list4.png';
import NoItem from '../../components/no-items/no-items'
import './projectDetail.less'

class ProjectDetail extends Component {

    componentDidMount() {
        const { getProjectInfo } = this.props;
        getProjectInfo(this.props.match.params.id)
    }

    render() {
        const { auth, projectDetail } = this.props;
        const { filesList, loanCreditCountDto, mortgageCarHis, projectInfoBaseInfoDto, projectInfoLoanInfoDto, mortgageHouseHis, houseTypeName } = projectDetail.projectInfo;
        return (

            <div id='project-detail'>
                {
                    projectDetail.projectInfo ?
                        projectDetail.errorMessage || !projectDetail.projectInfo ? <NoItem></NoItem>
                            :
                            <div className='cantainer'>
                                <div className='base-info content'>
                                    <div className='head'>基本信息</div>
                                    <div className='text'><span>用户名</span>{projectInfoBaseInfoDto ? projectInfoBaseInfoDto.userName : ''}</div>
                                    <div className='text'><span>手机号</span>{projectInfoBaseInfoDto ? projectInfoBaseInfoDto.phoneNumber : ''}</div>
                                    <div className='text'><span>身份证号</span>{projectInfoBaseInfoDto ? projectInfoBaseInfoDto.idNumber : ''}</div>
                                    <div className='text'><span>性别</span>{projectInfoBaseInfoDto ? projectInfoBaseInfoDto.msex == '1' ? '男' : '女' : ''}</div>
                                    <div className='text'><span>年龄</span>{projectInfoBaseInfoDto ? projectInfoBaseInfoDto.mage : ''}</div>
                                    <div className='text'><span>学历</span>{projectInfoBaseInfoDto ? projectInfoBaseInfoDto.educationString : ''}</div>
                                    <div className='text'><span>婚姻状况</span>{projectInfoBaseInfoDto ? projectInfoBaseInfoDto.maritaStatusString : ''}</div>
                                    <div className='text'><span>借款用途</span>{projectInfoLoanInfoDto ? projectInfoLoanInfoDto.loanUseString : ''}</div>
                                    <div className='text'><span>还款来源</span>{projectInfoLoanInfoDto ? projectInfoLoanInfoDto.rpmtSource : ''}</div>
                                    <div className='text longtext'><span>资产介绍</span><p >{projectInfoBaseInfoDto ? projectInfoBaseInfoDto.assetDesc : ''}</p> </div>
                                    <div className='text'><span>债务介绍</span>{projectInfoBaseInfoDto ? projectInfoBaseInfoDto.debtDesc : ''}</div>
                                </div>
                                <div className='credit-info content'>
                                    <div className='head'>信用信息</div>
                                    {/* <div className='text'><span>申请借款</span>{loanCreditCountDto ? loanCreditCountDto.loanApplyCount : ''}笔</div> */}
                                    <div className='text'><span>成功借款</span>{loanCreditCountDto ? loanCreditCountDto.loanSuccessCount : ''}笔</div>
                                    {/* <div className='text'><span>失败借款</span>{loanCreditCountDto ? loanCreditCountDto.loanFailCount : ''}笔</div> */}
                                    <div className='text'><span>借款总额</span>{loanCreditCountDto ? loanCreditCountDto.loanAmtSum : ''}元</div>
                                    <div className='text'><span>逾期次数</span>{loanCreditCountDto ? loanCreditCountDto.lateAllCount : ''}次</div>
                                    <div className='text'><span>逾期金额</span>{loanCreditCountDto ? loanCreditCountDto.lateTotalFee : ''}元</div>
                                    <div className='text'><span>严重逾期</span>{loanCreditCountDto ? loanCreditCountDto.seriousLateCount : ''}次</div>
                                    <div className='text'><span>待还笔数</span>{loanCreditCountDto ? loanCreditCountDto.notYetCount : ''}笔</div>
                                    <div className='text'><span>待还本息</span>{loanCreditCountDto ? loanCreditCountDto.notYetSum : ''}元</div>
                                    <div className='text'><span>已还笔数</span>{loanCreditCountDto ? loanCreditCountDto.alreadyRpmtCount : ''}笔 </div>
                                    <div className='text'><span>已还本息</span>{loanCreditCountDto ? loanCreditCountDto.alreadyRpmtSum : ''}元 </div>
                                    <div className='text'><span>提前还款笔数</span>{loanCreditCountDto ? loanCreditCountDto.prepaymentCount : ''}笔 </div>
                                </div>
                                <div className='mortgages-info content'>
                                    <div className='head'>抵押物信息</div>
                                    {
                                        mortgageHouseHis ?
                                            <div>
                                                <div className='text'><span>房产地址</span>{mortgageHouseHis ? mortgageHouseHis.houseAdress : ''}</div>
                                                <div className='text'><span>房产类型</span>{houseTypeName ? houseTypeName : ''}</div>
                                                <div className='text'><span>建筑面积</span>{mortgageHouseHis ? mortgageHouseHis.area : ''}平米</div>
                                                <div className='text'><span>竣工年份</span>{mortgageHouseHis ? mortgageHouseHis.houseAge : ''}年</div>
                                                {/* <div className='text'><span>贷款年限</span>{mortgageHouseHis ? mortgageHouseHis.carRegNumber : ''}</div> */}
                                                <div className='text'><span>尚欠贷余额</span>{mortgageHouseHis ? mortgageHouseHis.debtMoney : ''}元</div>
                                                <div className='text'><span>土地所有证号</span>{mortgageHouseHis ? mortgageHouseHis.landNo : ''}</div>
                                                <div className='text'><span>房产权所有证号</span>{mortgageHouseHis ? mortgageHouseHis.houseBelongNo : ''}</div>
                                                <div className='text'><span>评估价格</span>{mortgageHouseHis ? mortgageHouseHis.pricePotential : ''}元</div>
                                                {/* <div className='text'><span>抵押物描述</span>{mortgageHouseHis ? mortgageHouseHis.pricePotential : ''}</div> */}
                                            </div> :
                                            <div>
                                                <div className='text'><span>车辆品牌</span>{mortgageCarHis ? mortgageCarHis.carBrand : ''}</div>
                                                <div className='text'><span>车辆型号</span>{mortgageCarHis ? mortgageCarHis.carModel : ''}</div>
                                                <div className='text'><span>车架号</span>{mortgageCarHis ? mortgageCarHis.viNumber : ''}</div>
                                                <div className='text'><span>车牌号</span>{mortgageCarHis ? mortgageCarHis.carNumber : ''}</div>
                                                <div className='text'><span>登记证号</span>{mortgageCarHis ? mortgageCarHis.carRegNumber : ''}</div>
                                                <div className='text'><span>行驶里程</span>{mortgageCarHis ? mortgageCarHis.mileage : ''}公里</div>
                                                <div className='text'><span>购车年份</span>{mortgageCarHis ? mortgageCarHis.carAge : ''}年</div>
                                                <div className='text'><span>评估价格</span>{mortgageCarHis ? mortgageCarHis.pricePotential : ''}元</div>
                                            </div>
                                    }

                                </div>
                                <div className='relevant-info content'>
                                    <div className='head'>相关资料</div>
                                    <div className='list'>
                                        {
                                            filesList.map(item => {
                                                return (
                                                    <img src={item.uploadPath} key={item.id} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        : <div className='onLoad'>加载中...</div>
                }

            </div>
        )
    }
}

function select(state) {
    const { auth, projectDetail } = state.toJS();
    return {
        auth,
        projectDetail
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        loginUser,
        getDetails,
        getProjectInfo
    }, dispatch)

export default connect(select, mapDispatchToProps)(ProjectDetail);