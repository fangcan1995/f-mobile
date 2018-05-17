import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { personal } from '../../actions/personal';
import { auth,logoutUser } from '../../actions/auth';
import {mdPhone} from '../../libs/utils';

import './personal-page.less';
let ajaxData={
	adType:'7',
	putEnv:'2',
    number:''
}
class PersonalContainer extends Component {
    componentDidMount(){
		const { dispatch } = this.props;
        dispatch(personal(ajaxData));
    }
    logout(){
        const { dispatch } = this.props;
        dispatch(logoutUser())
        .then(res=>{
            alert('已登出')
            this.props.history.push('/login')
        })
        .catch(res=>{
            alert('登出失败')
        })
    }
    render () {
        const { personal,auth } = this.props;
        console.log(this.props)
        let personalObj=this.props.personal.personal;
        personalObj.userName=this.props.auth.userInfo.userName;
        return (
            <div className="personalPage">
                <dl>
                    <dd>
                        <div className="leftTitle">头像设置</div>
                        <span className="rightAction">
                            <Link to="/">
                                <span className="icon-arrow"></span>
                                <img className="personIcon" src={personalObj.photo} />
                            </Link>
                        </span>
                    </dd>
                </dl>
                <dl>
                    <dd>
                        <div className="leftTitle">绑定手机</div>
                        <span className="rightAction">
                            <Link to="/changePhone">
                                <span className="icon-arrow"></span>
                                <span className="actionText">{mdPhone(personalObj.userName)}</span>
                            </Link>
                        </span>
                    </dd>
                    <dd>
                        <div className="leftTitle">实名认证</div>
                        <span className="rightAction">
                            <Link to="/certification">
                                <span className="icon-arrow"></span>
                                <span className="actionText">{personalObj.isCertification==0?'未认证':'已认证'}</span>
                            </Link>
                        </span>
                    </dd>
                </dl>
                <dl>
                    <dd>
                        <div className="leftTitle">风险评估</div>
                        <span className="rightAction">
                            <Link to="/">
                                <span className="icon-arrow"></span>
                                <span className="actionText">{personalObj.riskLevel==''?'未评估':'稳健性'}</span>
                            </Link>
                        </span>
                    </dd>
                    <dd>
                        <div className="leftTitle">银行开户</div>
                        <span className="rightAction">
                            <Link to="/">
                                <span className="icon-arrow"></span>
                                <span className="actionText">{personalObj.bankNo?'已开户':'未开户'}</span>
                            </Link>
                        </span>
                    </dd>
                </dl>
                <dl>
                    <dd>
                        <div className="leftTitle">修改密码</div>
                        <span className="rightAction">
                            <Link to="/changePassword">
                                <span className="icon-arrow"></span>
                            </Link>
                        </span>
                    </dd>
                </dl>
                <div className="loginOut" onClick={this.logout.bind(this)}>退出登录</div>
            </div>
        );
    }
}
function select(state) {
    const { personal,auth } = state.toJS();
    return {
        personal,
        auth
    };
  }
  
export default connect(select)(PersonalContainer);

//export default PersonalContainer;