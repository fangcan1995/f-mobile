import React, { Component } from 'react';

import './filter.less';

const filterOptions = {
    myTransfer: {
        propsTopName: '债转状态',
        propsBottomName: '时间范围',
        propsTop: [
            {
                index: 4,
                val: '审核中'
            },
            {
                index: 5,
                val: '转让中'
            },
            {
                index: 6,
                val: '已转出'
            },
            {
                index: 7,
                val: '未通过'
            }
        ],
        propsBottom: [
            {
                index: 1,
                val: '一个月'
            },
            {
                index: 3,
                val: '三个月'
            },
            {
                index: 6,
                val: '六个月'
            },
            {
                index: 12,
                val: '一年'
            },
            {
                index: 24,
                val: '两年'
            },
        ]
    },
    myScatter: {
        propsTopName: '标的状态',
        propsBottomName: '投标时间',
        propsTop: [
            {
                index: 1,
                val: '招标中'
            },
            {
                index: 2,
                val: '回款中'
            },
            {
                index: 3,
                val: '已结清'
            },
        ],
        propsBottom: [
            {
                index: 1,
                val: '一个月'
            },
            {
                index: 3,
                val: '三个月'
            },
            {
                index: 6,
                val: '六个月'
            },
            {
                index: 12,
                val: '一年'
            },
            {
                index: 24,
                val: '两年'
            },
        ]
    },
    redpacket: {
        propsTopName: '红包状态',
        propsBottomName: '适用范围',
        propsTop: [
            {
                index: 1,
                val: '未使用'
            },
            {
                index: 2,
                val: '已使用'
            },
            {
                index: 3,
                val: '已过期'
            },
            {
                index: 4,
                val: '未激活'
            },
        ],
        propsBottom: [
            {
                index: 3,
                val: '三个月'
            },
            {
                index: 12,
                val: '十二个月'
            },
        ]
    },
    coupon: {
        propsTopName: '加息券状态',
        propsBottomName: '适用范围',
        propsTop: [
            {
                index: 1,
                val: '未使用'
            },
            {
                index: 2,
                val: '已使用'
            },
            {
                index: 3,
                val: '已过期'
            },
            {
                index: 4,
                val: '未激活'
            },
        ],
        propsBottom: [
            {
                index: 3,
                val: '三个月'
            },
            {
                index: 12,
                val: '十二个月'
            },
        ]
    }
}


class Filter extends Component {

    constructor(props) {
        super(props);
        const { filterConfig } = this.props;
        let showOption;
        switch (filterConfig) {
            case '/my-transfer':
                showOption = filterOptions['myTransfer'];
                break;
            case '/my-scatter':
                showOption = filterOptions['myScatter'];
                break;
            case '/redpacket':
                showOption = filterOptions['redpacket'];
                break;
            case '/coupon':
                showOption = filterOptions['redpacket'];
                break;
        }
        this.state = {
            className: '',
            showOption: showOption,
            propTopIndex: null,
            propBottomIndex: null,
        };
    }

    handleFilterButtonShow() {
        if (this.state.className === '') {
            this.setState({
                className: 'show'
            })
        }
    }

    handleFilterButtonHide() {
        if (this.state.className === 'show') {
            this.setState({
                className: ''
            })
        }
    }

    handleSelect(index, props) {
        this.setState({
            [props]: index
        })
    }

    handleReset() {
        this.setState({
            propTopIndex: null,
            propBottomIndex: null
        })
    }

    handleSubmit() {
        this.setState({
            className: ''
        });
        this.props.result({
            propTopIndex: this.state.propTopIndex,
            propBottomIndex: this.state.propBottomIndex,
        });
    }

    render() {
        const { showOption, propTopIndex, propBottomIndex } = this.state;
        return (
            <div className="filterBlock">
                <div className="filterButton" onClick={this.handleFilterButtonShow.bind(this)}>
                    <i className="icon-filter"></i>
                </div>
                <div className={`filter ${this.state.className}`}>
                    <div className="hideArea" onClick={this.handleFilterButtonHide.bind(this)}></div>
                    <div className="filterArea">
                        <div className="type typeTop">
                            <h4>{showOption.propsTopName}</h4>
                            <ul className="options">
                                {
                                    showOption.propsTop.map(
                                        (prop, i) =>
                                            (
                                                <li key={prop.index}
                                                    onClick={this.handleSelect.bind(this, prop.index, 'propTopIndex')}
                                                    className={this.state.propTopIndex === prop.index && 'activeOption'}
                                                >
                                                    {prop.val}
                                                </li>
                                            )
                                    )
                                }
                            </ul>
                        </div>
                        <div className="type typeBottom">
                            <h4>{showOption.propsBottomName}</h4>
                            <ul className="options">
                                {
                                    showOption.propsBottom.map(
                                        (prop, i) =>
                                            (
                                                <li key={prop.index}
                                                    onClick={this.handleSelect.bind(this, prop.index, 'propBottomIndex')}
                                                    className={this.state.propBottomIndex === prop.index && 'activeOption'}
                                                >
                                                    {prop.val}
                                                </li>
                                            )
                                    )
                                }
                            </ul>
                        </div>
                        <div className="buttonAction">
                            <button className="reset" onClick={this.handleReset.bind(this)}>重置</button>
                            <button className="makeSure" onClick={this.handleSubmit.bind(this)}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Filter;