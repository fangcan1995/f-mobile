import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { personal } from '../../actions/personal';

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
    render () {
        const { personal } = this.props;

        console.log(this.props)
        let personalObj=this.props.personal.personal
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
                                <span className="actionText">{personalObj.isNovice}</span>
                            </Link>
                        </span>
                    </dd>
                    <dd>
                        <div className="leftTitle">实名认证</div>
                        <span className="rightAction">
                            <Link to="/certification">
                                <span className="icon-arrow"></span>
                                <span className="actionText">{personalObj.isCertification==0?'未实名':'已实名'}</span>
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
                                <span className="actionText">{personalObj.riskLevel==''?'未评估':'稳健股'}</span>
                            </Link>
                        </span>
                    </dd>
                    <dd>
                        <div className="leftTitle">银行开户</div>
                        <span className="rightAction">
                            <Link to="/">
                                <span className="icon-arrow"></span>
                                <span className="actionText">{personalObj.isNovice}</span>
                            </Link>
                        </span>
                    </dd>
                </dl>
                <dl>
                    <dd>
                        <div className="leftTitle">修改密码</div>
                        <span className="rightAction">
                            <Link to="/authentication">
                                <span className="icon-arrow"></span>
                            </Link>
                        </span>
                    </dd>
                </dl>
                <div className="loginOut">退出登录</div>
            </div>
        );
    }
}
function select(state) {
    const { personal } = state.toJS();
    return {
        personal
    };
  }
  
export default connect(select)(PersonalContainer);

//export default PersonalContainer;