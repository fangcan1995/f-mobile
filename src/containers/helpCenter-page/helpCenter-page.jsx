import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from 'react-dom';
import { bindActionCreators } from "redux";
import Immutable from "immutable";
import { dynamic,clearData } from '../../actions/dynamic';
import "./helpCenter-page.less";
import bbhLogo from "../../assets/images/bbh-logo.png";
import { Link } from 'react-router-dom';
import { PullToRefresh, ListView, Button } from 'antd-mobile';
let ajaxData={
  pageNum:'1',
  pageSize:'10',
  number:'10',

}
class HelpCenterPage extends Component {
  constructor() {
    super();
    this.state = {
      borderClass: "one",
      tabClassOne: "active",
      tabClassTwo: "",
      refreshing: false,
      height: document.documentElement.clientHeight,
    };
  }
  handleClick(type, e) {
    ajaxData.pageNum = 1;
    const { dispatch } = this.props;
    dispatch(clearData());
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
    ajaxData.pageNum=1;
    const { dispatch } = this.props;
    dispatch(clearData());
    this.getListData(4);
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
		setTimeout(() => this.setState({
      height: hei,
    }), 0);
  }
  getListData(type){
    const { dispatch } = this.props;
    return dispatch(dynamic(type,ajaxData));
  }
  getNewData() {
    ajaxData.pageNum++;
    if (this.state.borderClass == "one") {
      if(ajaxData.pageNum<this.props.dynamic.dynamic.pages || ajaxData.pageNum==this.props.dynamic.dynamic.pages){        
        this.getListData(4, ajaxData)
        .then(res=>{
          this.setState({
            refreshing:false
          })   
        })
        .catch(err=>{
          this.setState({
            refreshing:false
          }) 
        }) 
      }else{
        this.setState({
          refreshing:false
        }) 
      }     
    } else {
      if(ajaxData.pageNum<this.props.dynamic.dynamic.pages || ajaxData.pageNum==this.props.dynamic.dynamic.pages){        
        this.getListData(5, ajaxData)
        .then(res=>{
          this.setState({
            refreshing:false
          })   
        })
        .catch(err=>{
          this.setState({
            refreshing:false
          }) 
        }) 
      }else{
        this.setState({
          refreshing:false
        }) 
      }
    }
  }
  render() {
    const { dynamic } = this.props;
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
              <PullToRefresh
              ref={el => (this.ptr = el)}
              style={{ height: this.state.height, overflow: "auto" }}
              direction={"up"}
              refreshing={this.state.refreshing}
              onRefresh={this.getNewData.bind(this)}
            >
              {
                (list)?
                list.map(item => {
                item.updateTime = item.updateTime.substring(0, 10);
                return (
                  <li key={item.id}>
                    <Link to={'/mobile/discDetail/' + item.id }>
                      <h3>
                        {item.title}
                      </h3>
                      <p className="time-p">
                        <i className="icon-time" />&nbsp;&nbsp;&nbsp;发布时间：{item.updateTime}
                      </p>
                    </ Link>
                  </li>
                );
              }):''
              }
            </PullToRefresh>
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
