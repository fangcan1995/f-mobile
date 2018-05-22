import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from "immutable";
import { dynamic } from '../../actions/dynamic';
import "./helpCenter-page.less";
import bbhLogo from "../../assets/images/bbh-logo.png";
import { Link } from 'react-router-dom';
import { PullToRefresh, ListView, Button } from 'antd-mobile';
import {setBrowserTitle} from '../../libs/utils';
let ajaxData={
  pageNum:'1',
  pageSize:'5',
  number:'5',

}
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
      this.getListData(4)
    } else {
      this.setState({
        borderClass: "two",
        tabClassOne: "",
        tabClassTwo: "active"
      });
      this.getListData(5)
    }
  }
  componentDidMount(){
    setBrowserTitle('帮助中心')
		this.getListData(4)
  }
  getListData(type){
    const { dispatch } = this.props;
    dispatch(dynamic(type,ajaxData));
  }
  render() {
    const { dynamic } = this.props;
    console.log(this.props)
    let list = this.props.dynamic.dynamic.list;
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
                  <li key={item.id}>
                    <Link to={'/discoverDetail/' + item.id }>
                      <h3>
                        {item.title}
                      </h3>
                      <p className="time-p">
                        <i className="icon-time" />&nbsp;&nbsp;&nbsp;发布时间：{item.updateTime}
                      </p>
                    </ Link>
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
  const { dynamic } = state.toJS();
  return {
    dynamic
  };
}

export default connect(select)(HelpCenterPage);
