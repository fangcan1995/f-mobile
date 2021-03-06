import React, { Component } from 'react';
import { getrewardsList, setRewards, setRedEnvelopeId, setRateCouponId } from '../../actions/rewards';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import NoItem from '../../components/no-items/no-items'
import './rewards.less'

class Rewards extends Component {
    //选择红包
    handleUseEnvelopesClick(e, w, r) {
        const { setRewards, setRedEnvelopeId, config } = this.props;
        // setRewards(e + '元' + w)
        config.handleSelectClickL();
        config.callback({
            reward: e,
            redEnvelopeId: w,
            rateCouponId: '',
            rewardType:1,
            profit: r + config.profit
        })
        // setRedEnvelopeId(q)
        // this.props.history.goBack()
    }
    // 选择加息券
    handleUseVoucherClick(e, w, r) {
        const { setRewards, setRateCouponId, config } = this.props;
        // setRewards(e + '%加息券')
        // setRateCouponId(w)
        config.handleSelectClickL()
        config.callback({
            reward: e,
            redEnvelopeId: '',
            rateCouponId: w,
            rewardType:2, 
            profit: r + config.profit
        })
        // this.props.history.goBack()
    }
    componentDidMount() {
        const { getrewardsList, config } = this.props;
        const cred = {
            projectId: config.projectId,
            investAmount: config.money
        }
        getrewardsList(cred)
    }
    handleCloseMadol() {
        const { config } = this.props
        config.handleSelectClickL()
    }
    render() {
        const { rewards } = this.props;
        return (
            <div id='rewards'>
                <div className='warpper'>
                    {
                        rewards.rewardsList.length ?
                            <div className='noitem'>
                                <div className='couponBaseStyleList'>
                                    {
                                        rewards.rewardsList.map(item => {
                                            return (
                                                item.type == 1 ?
                                                    <div className={`couponBaseStyle redpacket`} key={item.id + item.reTypeName} >
                                                        <div className="couponInfo">
                                                            <span className="title">
                                                                {/* {type === 'rp' && '￥'} */}
                                                                ￥
                                                                {/* {type === 'cp' && '+'} */}
                                                                <span className="value">{item.reAmount}</span>

                                                            </span>
                                                            <span className="canuse">{item.productCategoryName}</span>
                                                        </div>
                                                        <div className="intro">返现红包</div>
                                                        {/* {data.endTime ? data.endTime.split(' ')[0] : '暂无期限'} {item.reTypeName}*/}
                                                        <div className="endTime">有效期：{item.validity}</div>
                                                        {/* item.endTime ? item.endTime.split(' ')[0] : '暂无期限' */}
                                                        <div className="toUse"><a onClick={this.handleUseEnvelopesClick.bind(this, item.title, item.id, item.reAmount)} >点击立即使用</a></div>
                                                    </div>
                                                    :
                                                    <div className={`couponBaseStyle coupon`} key={item.id + item.reTypeName}>
                                                        <div className="couponInfo">
                                                            <span className="title">
                                                                {/* {type === 'rp' && '￥'} */}+
                                                                {/* {type === 'cp' && '+'} */}
                                                                <span className="value">{item.rcAmount}</span>
                                                                %
                                                </span>
                                                            <span className="canuse">{item.productCategoryName}</span>
                                                        </div>
                                                        <div className="intro">加息券</div>
                                                        {/* {data.endTime ? data.endTime.split(' ')[0] : '暂无期限'} */}
                                                        <div className="endTime">有效期：{item.validity}</div>
                                                        <div className="toUse"><a onClick={this.handleUseVoucherClick.bind(this, item.title, item.id, item.reAmount)}>点击立即使用</a></div>
                                                    </div>
                                            )
                                        })}
                                </div>
                                <div className='closeMadol2' onClick={this.handleCloseMadol.bind(this)}>取消</div>
                            </div>
                            :
                            <div className='noitem'><NoItem />
                                <div className='closeMadol' onClick={this.handleCloseMadol.bind(this)}>确定</div>
                            </div>
                    }


                </div>
            </div>
        )
    }
}

function select(state) {
    const { auth, rewards, detail } = state.toJS();
    return {
        auth,
        rewards,
        detail
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        loginUser,
        getrewardsList,
        setRewards,
        setRedEnvelopeId,
        setRateCouponId,
    }, dispatch)

export default connect(select, mapDispatchToProps)(Rewards);