import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Immutable from "immutable";
import { dynamic } from "../../actions/dynamic";
import "./dynamic-page.less";
import { Link } from "react-router-dom";
import { setBrowserTitle } from '../../libs/utils';
import { PullToRefresh } from 'antd-mobile';
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
            height: document.documentElement.clientHeight,
            demoData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        };
    }
    handleClick(type, e) {
        if (type == 1) {
            this.setState({
                borderClass: "one",
                tabClassOne: "active",
                tabClassTwo: ""
            });
            this.getListData(2);
        } else {
            this.setState({
                borderClass: "two",
                tabClassOne: "",
                tabClassTwo: "active"
            });
            this.getListData(1);
        }
    }
    componentDidMount() {
        setBrowserTitle('巴巴汇动态')
        this.getListData(2);
    }
    getListData(type) {
        const { dispatch } = this.props;
        dispatch(dynamic(type, ajaxData));
    }
    render() {
        const { dynamic } = this.props;
        console.log(this.props);
        let list = this.props.dynamic.dynamic.list;
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
                    {/* <div className="dynamic-content" id="active-content">
                        {list.map(item => {
                            item.updateTime = item.updateTime.substring(0, 10);
                            return (
                                <Link to={"/discoverDetail/" + item.id} key={item.id}>
                                    <dl className="dynamic-list" key={item.id}>
                                        <dt className="l">
                                            <img src={item.affIcon} alt="" />
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
                        })}
                    </div> */}
                    <PullToRefresh
                        ref={el => this.ptr = el}
                        style={{height: this.state.height, overflow: 'auto'}}
                        direction={'up'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            let addArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
                            let newArray = [...this.state.demoData];
                            this.setState({
                                refreshing: true,
                                demoData: newArray.concat(addArray)
                            });
                            setTimeout(() => {
                                this.setState({refreshing: false});
                            }, 1000)
                        }}
                    >
                        {
                            this.state.demoData.map((item, i) => {
                                return <div key={i} style={{textAlign: 'center', padding: '20px'}}>{item}</div>
                            })
                        }
                    </PullToRefresh>
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
