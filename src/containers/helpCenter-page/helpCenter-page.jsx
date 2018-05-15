import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from "immutable";
import { loginUser } from "../../actions/auth";
import "./helpCenter-page.less";
import bbhLogo from "../../assets/images/bbh-logo.png";
class HelpCenterPage extends Component {
  constructor() {
    super();
    this.state = {
      borderClass: "one",
      tabClassOne: "active",
      tabClassTwo: ""
    };
  }
  handleClick(type, e) {
    if (type == 1) {
      this.setState({
        borderClass: "one",
        tabClassOne: "active",
        tabClassTwo: ""
      });
    } else {
      this.setState({
        borderClass: "two",
        tabClassOne: "",
        tabClassTwo: "active"
      });
    }
  }
  render() {
    const { auth } = this.props;
    let list = [
      {
        id: 1,
        affIcon: bbhLogo,
        title:
          "测试占字测试占字测试占字测试占字测试占字测试占字测试占字测试占字测试占字",
        affContent:
          "测试占字测试占字测试占字测试占字测试占字测试占字测试占字测试占字测试占字",
        updateTime: "2017-10-20"
      }
    ];
    return (
      <div className="helpCenter-body">
        <div className="main">
          <ul className="tab-title">
            <li
              className={`l tabClass ${this.state.tabClassOne}`}
              onClick={this.handleClick.bind(this, "1")}
            >
              法律法规
            </li>
            <li
              className={`l tabClass ${this.state.tabClassTwo}`}
              onClick={this.handleClick.bind(this, "2")}
            >
              常规问题
            </li>
            <li className={`l border-li ${this.state.borderClass}`} />
          </ul>
          <div className="dynamic-content">
            <ul className="dynamic-list" id="active-content">
              {list.map(item => {
                return (
                  <li>
                    <h3>
											{item.title}
                    </h3>
                    <p className="time-p">
                      <i className="icon-time" />&nbsp;&nbsp;&nbsp;发布时间：{item.updateTime}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function select(state) {
  const { auth } = state.toJS();
  return {
    auth
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginUser
    },
    dispatch
  );

export default connect(select, mapDispatchToProps)(HelpCenterPage);
