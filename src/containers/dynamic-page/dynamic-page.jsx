import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from "immutable";
import { dynamic, clearData } from "../../actions/dynamic";
import "./dynamic-page.less";
import { Link } from "react-router-dom";
import { PullToRefresh } from "antd-mobile";
import defaultImg from "./../../assets/images/defaultImg.jpg";
let ajaxData = {
  pageNum: "1",
  pageSize: "5",
  number: "5"
};
class DynamicPage extends Component {
  constructor() {
    super();
    this.state = {
      borderClass: "one",
      tabClassOne: "active",
      tabClassTwo: "",
      refreshing: false,
      height: document.documentElement.clientHeight,
      hasMore: true,
      down: false,
      list: []
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
        tabClassTwo: "",
        hasMore: true,
        list: []
      });
      this.getListData(2);
    } else {
      this.setState({
        borderClass: "two",
        tabClassOne: "",
        tabClassTwo: "active",
        hasMore: true,
        list: []
      });
      this.getListData(1);
    }
  }
  componentDidMount() {
    ajaxData.pageNum = 1;
    const { dispatch } = this.props;
    dispatch(clearData());
    this.getListData(2)
    const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
    }), 0);
  }
  getListData(type) {
    const { dispatch } = this.props;
    return dispatch(dynamic(type, ajaxData))
    .then(res => {
      console.log(res)
      this.setState({
        // refreshing:false,
        list: [...this.state.list, ...res.value.list]
      })
    })
    .catch(err => {
      this.setState({
        refreshing: false,
        hasMore: false
      })
    });
  }
  getNewData() {
    ajaxData.pageNum++;

    // this.setState({ refreshing: true });
    if (this.state.borderClass == "one") {
      if (ajaxData.pageNum < this.props.dynamic.dynamic.pages || ajaxData.pageNum == this.props.dynamic.dynamic.pages) {
        this.setState({
          refreshing: true
        })
        this.getListData(2, ajaxData)
        
      } else {
        this.setState({
          refreshing: false,
          hasMore: false,
          down: true,
        })
      }
    } else {
      this.setState({
        refreshing: true
      })
      if (ajaxData.pageNum < this.props.dynamic.dynamic.pages || ajaxData.pageNum == this.props.dynamic.dynamic.pages) {
        this.getListData(1, ajaxData)
      } else {
        this.setState({
          refreshing: false,
          hasMore: false,
          down: true,
        })
      }
    }
  }
  render() {
    const { dynamic } = this.props;
    let list = this.state.list;
    return (
      <div className="dynamic-body">
        <div className="main">
          <ul className="tab-title">
            <li
              className={`l tabClass ${this.state.tabClassOne}`}
              onClick={this.handleClick.bind(this, "1")}
            >
              媒体报道
            </li>
            <li
              className={`l tabClass ${this.state.tabClassTwo}`}
              onClick={this.handleClick.bind(this, "2")}
            >
              公司动态
            </li>
            <li className={`l border-li ${this.state.borderClass}`} />
          </ul>
          <div className="dynamic-content" id="active-content">
            <PullToRefresh
              ref={el => (this.ptr = el)}
              style={{ height: this.state.height, overflow: "auto" }}
              direction={"up"}
              indicator={this.state.down ? { deactivate: '没有更多数据了' } : { deactivate: '上拉加载更多' }}
              refreshing={this.state.refreshing}
              onRefresh={this.getNewData.bind(this)}
            >
              {
                (list) ?
                  list.map(item => {
                    item.updateTime = item.updateTime.substring(0, 10);
                    return (
                      <Link to={"/mobile/discDetail/" + item.id} key={item.id}>
                        <dl className="dynamic-list">
                          <dt className="l">
                            <img src={item.affIcon || defaultImg} alt="" />
                          </dt>
                          <dd>
                            <h3>{item.title}</h3>
                            <p
                              className="list-content"
                              dangerouslySetInnerHTML={{ __html: item.affContent }}
                            />
                            <p className="time-p">
                              <i className="icon-time" />&nbsp;&nbsp;&nbsp;发布时间：{
                                item.updateTime
                              }
                            </p>
                          </dd>
                        </dl>
                      </Link>
                    );
                  }) : ''
              }
              {
                this.state.hasMore ? <div></div> : <div className='onDeep'>已经到底部了^-^```</div>
              }
            </PullToRefresh>
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

export default connect(select)(DynamicPage);
