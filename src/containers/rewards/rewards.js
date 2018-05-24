import React, { Component } from 'react';
import { getrewardsList, setRewards, setRedEnvelopeId, setRateCouponId } from '../../actions/rewards';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import './rewards.less'

class Rewards extends Component{
    //选择红包
    handleUseEnvelopesClick(e,w,q){
        console.log(e,w)
        const { setRewards, setRedEnvelopeId } =this.props;
        setRewards(e+'元'+w)
        setRedEnvelopeId(q)
        this.props.history.goBack()
    }
    // 选择加息券
    handleUseVoucherClick(e,w){
        const { setRewards, setRateCouponId } =this.props;
        setRewards(e+'%加息券')
        setRateCouponId(w)
        console.log(e)
        this.props.history.goBack()
    }
    componentDidMount(){
        const { getrewardsList } = this.props;
        console.log(this.props)
        const cred = {
            projectId:this.props.match.params.id,
            useMinAmount:this.props.detail.money
        }
        getrewardsList(cred)
    }
    render(){
        const { rewards } =this.props;
        console.log(rewards)
        return (
            <div id='rewards'>
                <div className = 'warpper'>
                {
                    rewards.rewardsList.map(item=>{
                        return (
                            item.reTypeName?
                            <div className={`couponBaseStyle redpacket`} key ={item.id+item.reTypeName} >
                                <div className="couponInfo">
                                    <span className="title">
                                        {/* {type === 'rp' && '￥'} */}
                                        ￥
                                        {/* {type === 'cp' && '+'} */}
                                        <span className="value">{item.reAmount}</span>
                                        
                                    </span>
                                    <span className="canuse">{item.productCategoryName}</span>
                                </div>
                                <div className="intro">{item.reTypeName}</div>
                                {/* {data.endTime ? data.endTime.split(' ')[0] : '暂无期限'} */}
                                <div className="endTime">{item.endTime ? item.endTime.split(' ')[0] : '暂无期限'}</div>
                                <div className="toUse"><a onClick = { this.handleUseEnvelopesClick.bind(this,item.reAmount,item.reTypeName,item.id)} >点击立即使用</a></div>
                            </div>
                            :
                            <div className={`couponBaseStyle coupon`} key ={item.id+item.reTypeName}>
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
                                <div className="endTime">{item.endTime ? item.endTime.split(' ')[0] : '暂无期限'}</div>
                                <div className="toUse"><a onClick = { this.handleUseVoucherClick.bind(this,item.rcAmount,item.id)}>点击立即使用</a></div>
                            </div>
                        )
                    })
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