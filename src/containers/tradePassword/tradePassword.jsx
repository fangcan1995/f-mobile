import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from "immutable";
import "./../tradePassword/tradePassword.less";
import { hex_md5 } from "../../libs/md5";
import {
  setTradePassword,
  getTradePassCode
} from "../../actions/tradePassword";
import { loginUser, authCode, smsCode } from "../../actions/auth";
import { Toast } from "antd-mobile";
import { tradePasswordRegExp } from "../../libs/utils";
import parseQueryString from "../../libs/parseQueryString";
class TradePassword extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      trade_password: "",
      trade_password_code: "",
      verifyCodeCd: "",
      send_terminal: "iPhone",
      trade_password_token: "",
      passwordName: "icon-show-password",
      passwordType: "password",
      newPasswordName: "icon-show-password",
      newPasswordType: "password",
      confimPasswordName: "icon-show-password",
      confimPasswordType: "password"
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(authCode());
    this.setState({
      username:
        this.props.auth.userInfo.userName ||
        this.props.detail.myInfo.userName
    });
  }
  handleChange(type, e) {
    this.setState({
      [type]: e.target.value
    });
  }
  changeType(name, type, e) {
    e.stopPropagation();
    if (this.state[name] == "icon-show-password") {
      this.setState({
        [name]: "icon-hide-password",
        [type]: "text"
      });
    } else {
      this.setState({
        [name]: "icon-show-password",
        [type]: "password"
      });
    }
  }
  handleSubmit() {
    const { personal, tradePassword } = this.props;
    console.log(tradePassword)
    const { history, location } = this.props;
    const { redirect } = parseQueryString(location.search);
    if (!this.state.trade_password_code) {
      Toast.info("请输入短信验证码", 1);
      return false;
    } else if (!this.state.newPassword) {
      Toast.info("请输入新密码", 1);
      return false;
    } else if (!tradePasswordRegExp(this.state.newPassword)) {
      Toast.info("密码长度为6-16位，数字、字母、英文符号");
      return false;
    } else if (!this.state.confirmPassword) {
      Toast.info("请输入确认密码", 1);
      return false;
    } else if (this.state.newPassword != this.state.confirmPassword) {
      Toast.info("两次输入密码不一致", 1);
      return false;
    } else if (!this.state.newPassword) {
      Toast.info("请输入密码", 1);
      return false;
    } else {
      let appInfo = {
        send_terminal: this.state.send_terminal,
        username: this.props.auth.userInfo.userName,
        trade_password: hex_md5(this.state.newPassword),
        trade_password_code: this.state.trade_password_code,
        trade_password_token: localStorage.getItem('trade_password_token')
      };
      const { dispatch } = this.props;
      console.log(appInfo)
      dispatch(setTradePassword(appInfo))
        .then(res => {
          Toast.success(res.value.postResult.message, 1, () => {
            // this.props.history.push('/mobile/personal')
            history.push(
              redirect ? decodeURIComponent(redirect) : "/mobile/personal"
            );
          });
        })
        .catch(err => {
          Toast.fail(err.message);
        });
    }
  }
  componentWillMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  setTime() {
    let time = 180;
    var timeInt = setInterval(() => {
      if (time > 0) {
        time--;
        if (this.mounted) {
          this.setState({
            verifyCodeCd: time
          });
        }
      } else {
        if (this.mounted) {
          this.setState({
            verifyCodeCd: ""
          });
        }
        clearInterval(timeInt);
      }
    }, 1000);
  }
  getMessageCode(e) {
    e.stopPropagation();
    let smsCodeData = {
      username: this.state.username,
      image_code: this.props.auth.loginCode.imageCode,
      send_terminal: "iPhone"
    };
    const { dispatch } = this.props;
    dispatch(getTradePassCode(smsCodeData))
      .then(res => {
        const { dispatch } = this.props;
        dispatch(authCode());
        console.log(res)
        localStorage.setItem('trade_password_token',res.value.token)
        // this.setState({
        //   trade_password_token: res.value.token
        // });
        this.setTime();
      })
      .catch(res => {
        Toast.fail(res.message);
      });
  }
  render() {
    const { auth, changePassword } = this.props;
    return (
      <div className="retrievePassword-body">
        <form className="retrievePassword-form">
          <div className="retrievePassword-box retrievePassword-name-box">
            <label>验证码</label>
            <input
              type="text"
              className="retrievePassword-password"
              placeholder="请输入短信验证码"
              onChange={this.handleChange.bind(this, "trade_password_code")}
              value={this.state.trade_password_code}
            />
            {/* <i className={`${this.state.passwordName} icon-password-right`} onClick={this.changeType.bind(this,'passwordName','passwordType')}></i> */}
            <button
              type="button"
              className="get-Messcode"
              disabled={this.state.verifyCodeCd}
              onClick={this.getMessageCode.bind(this)}
            >
              {this.state.verifyCodeCd || "获取验证码"}
            </button>
          </div>
          <div className="retrievePassword-box retrievePassword-name-box">
            <label>输入密码</label>
            <input
              type={`${this.state.newPasswordType}`}
              className="retrievePassword-password"
              placeholder="请输入密码"
              onChange={this.handleChange.bind(this, "newPassword")}
              value={this.state.newPassword}
            />
            <i
              className={`${this.state.newPasswordName} icon-password-right`}
              onClick={this.changeType.bind(
                this,
                "newPasswordName",
                "newPasswordType"
              )}
            />
          </div>
          <div className="retrievePassword-box retrievePassword-name-box">
            <label>确认密码</label>
            <input
              type={`${this.state.confimPasswordType}`}
              className="retrievePassword-password"
              placeholder="请输入密码"
              onChange={this.handleChange.bind(this, "confirmPassword")}
              value={this.state.confirmPassword}
            />
            <i
              className={`${this.state.confimPasswordName} icon-password-right`}
              onClick={this.changeType.bind(
                this,
                "confimPasswordName",
                "confimPasswordType"
              )}
            />
          </div>
        </form>
        <div className="retrievePassword-password-box">
          <button
            className="retrievePassword-submit"
            type="button"
            onClick={this.handleSubmit.bind(this)}
          >
            确定
          </button>
        </div>
      </div>
    );
  }
}

function select(state) {
  const { auth, changePassword, personal, detail, tradePassword } = state.toJS();
  return {
    changePassword,
    auth,
    personal,
    detail,
    tradePassword
  };
}

export default connect(select)(TradePassword);
