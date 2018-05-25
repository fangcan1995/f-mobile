import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ReactEcharts from "echarts-for-react";

import './my-assets-page.less';

import { getMyInfo } from '../../actions/my';

class MyAssetsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {
                top: '',
                left: '',
                transform: `translate(0, 0)`
            }
        }
    }

    componentDidMount() {
        const { getMyInfo } = this.props;
        getMyInfo();
        const height = this.pie.echartsElement.clientHeight;
        const width = this.pie.echartsElement.clientWidth;
        this.setState({
            style: {
                ...this.state.style,
                top: `${height * .5}px`,
                left: `${width * .5}px`,
                transform: `translate(-50%, -50%)`
            }
        })
    }

    render() {
        const { myInfo } = this.props;
        let total = parseFloat(myInfo.availableBalance) + parseFloat(myInfo.freezingAmount) + parseFloat(myInfo.investAmount);
        let isMax = total >= 100000 ? parseFloat(total.toString(10).slice(0, total.toString(10).length - 4)) : total;
        const options = {
            tooltip: {
                trigger: 'item',
                formatter: "{a}{b}: {c} ({d}%)"
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['60%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { 
                            value: myInfo.availableBalance !== undefined ? parseFloat(myInfo.availableBalance).toFixed(2) : 0..toFixed, 
                            name: '账户余额', 
                            itemStyle: {
                                color: '#3298fa'
                            }
                        },
                        { 
                            value: myInfo.investAmount !== undefined ? parseFloat(myInfo.investAmount).toFixed(2) : 0..toFixed, 
                            name: '已投金额', 
                            itemStyle: {
                                color: '#71d1f5'
                            }
                        },
                        { 
                            value: myInfo.freezingAmount !== undefined ? parseFloat(myInfo.freezingAmount).toFixed(2) : 0..toFixed, 
                            name: '冻结金额', 
                            itemStyle: {
                                color: '#c5d4ff'
                            }
                        },
                    ]
                }
            ]
        };
        return (
            <div className="myAssets">
                <ReactEcharts
                    ref={pie => this.pie = pie}
                    option={options}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={this.onChartReadyCallback}
                />
                <div className="chartArea" style={this.state.style}>
                    <div className="totalNum">
                        {
                            myInfo.availableBalance !== undefined 
                                ? isMax.toFixed(2) || total.toFixed(2)
                                : 0..toFixed(2)
                        }
                    </div>
                    <div className="totalLabel">资产总额({isMax ? '万元' : '元'})</div>
                </div>
                <div className="chartInfo">
                    <div className="infoLine">
                        <div className="title">
                            <div className="color colorAccount"></div>
                            账户余额
                        </div>
                        <div className="val">￥{myInfo.availableBalance !== undefined ? parseFloat(myInfo.availableBalance).toFixed(2) : 0..toFixed(2)}</div>
                    </div>
                    <div className="infoLine">
                        <div className="title">
                            <div className="color colorAlready"></div>
                            已投金额
                        </div>
                        <div className="val">￥{myInfo.investAmount !== undefined ? parseFloat(myInfo.investAmount).toFixed(2) : 0..toFixed(2)}</div>
                    </div>
                    <div className="infoLine">
                        <div className="title">
                            <div className="color colorFreeze"></div>
                            冻结金额
                        </div>
                        <div className="val">￥{myInfo.freezingAmount !== undefined ? parseFloat(myInfo.freezingAmount).toFixed(2) : 0..toFixed(2)}</div>
                    </div>
                </div>
                <div className="chartAction">
                    <Link to="/subjectList"><button>投资</button></Link>
                    <Link to="/charge"><button className="charge">充值</button></Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { my } = state.toJS();
    return {
        myInfo: my.myInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMyInfo: () => {
            dispatch(getMyInfo());
        }
    }
}

MyAssetsPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyAssetsPage)

export default MyAssetsPage;