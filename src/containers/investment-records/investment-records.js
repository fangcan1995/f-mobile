import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getInvestRecords, getTransferInvestRecords } from '../../actions/investmentRecord';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import NoItem from '../../components/no-items/no-items'
import './investment-records.less'
import { PullToRefresh } from "antd-mobile";

let cred = {
    pageSize: 10,
    pageNum: 1
}
class investmentRecords extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            height: document.documentElement.clientHeight,
            distanceToRefresh: 50,
            down: false,
            hasMore: true,
            list: [],
            pageNum: 0
        }
    }
    componentDidMount() {
        const { getInvestRecords, getTransferInvestRecords } = this.props;
        console.log(this.props.match.params)
        cred.pageNum = 1
        if (this.props.match.params.type == 0) {
            // const cred = {
            //     projectId: this.props.match.params.id,
            //     pageSize:10
            // }
            cred.projectId = this.props.match.params.id,
                getInvestRecords(cred).then(res => {
                    console.log(res)
                    this.setState({
                        list: res.value.list,
                        pageNum: res.value.pages
                    })
                })
        } else {
            // const cred = {
            //     transId: this.props.match.params.id,
            //     pageSize:10
            // }
            cred.transId = this.props.match.params.id,
                getTransferInvestRecords(cred).then(res => {
                    this.setState({
                        list: res.value.list,
                        pageNum: res.value.pages
                    })
                })
        }
        console.log(ReactDOM.findDOMNode(this.ptr))
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei,
        }), 0);
    }
    getNewData() {
        cred.pageNum++;
        console.log(cred.pageNum <= this.state.pageNum)
        this.setState({ refreshing: true });
        const { getInvestRecords, getTransferInvestRecords } = this.props;
        if (cred.pageNum <= this.state.pageNum) {
            if (this.props.match.params.type == 0) {
                getInvestRecords(cred).then(res => {
                    this.setState({
                        list: [...this.state.list, ...res.value.list],
                    })
                }).catch(() => {
                    this.setState({
                        hasMore: false
                    })
                })
            } else {
                getTransferInvestRecords(cred).then(res => {
                    this.setState({
                        list: [...this.state.list, ...res.value.list],
                    })
                }).catch(() => {
                    this.setState({
                        hasMore: false
                    })
                })
            }
        } else {
            this.setState({
                down: true,
                hasMore: false,
                refreshing: false
            })
            return
        }

    }
    render() {
        const { investmentRecord } = this.props;
        console.log(investmentRecord)
        return (
            <div id='investment-records'>
                <div className='content'>
                    <PullToRefresh
                        ref={el => (this.ptr = el)}
                        style={{ height: this.state.height, overflow: "auto" }}
                        direction={"up"}
                        indicator={this.state.down ? { deactivate: '没有更多数据了' } : { deactivate: '上拉加载更多' }}
                        distanceToRefresh={this.state.distanceToRefresh}
                        refreshing={this.state.refreshing}
                        onRefresh={this.getNewData.bind(this)}
                    >
                        {
                            this.state.list.length ?
                                this.state.list.map(item => {
                                    return (
                                        <div className='records-list' key={item.investTime} key={item.investTime}>
                                            <div className='name'>{item.investor}<span className='r'>{item.investAmt}</span></div>
                                            <div className='invest-way'>{item.investWayString}<span className='r'>{item.investTime}</span></div>
                                        </div>
                                    )
                                })

                                :
                                <NoItem></NoItem>
                        }
                        {
                            this.state.hasMore ? <div></div> : <div>已经到底部了^-^```</div>
                        }
                    </PullToRefresh>
                </div>

            </div>
        )
    }
}

function select(state) {
    const { auth, investmentRecord } = state.toJS();
    return {
        auth,
        investmentRecord
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        loginUser,
        getInvestRecords,
        getTransferInvestRecords
    }, dispatch)

export default connect(select, mapDispatchToProps)(investmentRecords);