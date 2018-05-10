import React, { Component } from 'react';

import './filter.less';


class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            className: ''
        };
    }

    handleFilterButtonShow () {
        if(this.state.className === '') {
            this.setState({
                className: 'show'
            })
        }
    }

    handleFilterButtonHide () {
        if(this.state.className === 'show') {
            this.setState({
                className: ''
            })
        }
    }

    render() {
        return (
            <div className="filterBlock">
                <div className="filterButton" onClick={this.handleFilterButtonShow.bind(this)}>
                    <i className="icon-filter"></i>
                </div>
                <div className={`filter ${this.state.className}`}>
                    <div className="hideArea" onClick={this.handleFilterButtonHide.bind(this)}></div>
                    <div className="filterArea">
                        <div className="type typeTop">
                            <h4>红包状态</h4>
                            <ul className="options">
                                <li className="activeOption">未使用</li>
                                <li>已使用</li>
                                <li>已过期</li>
                                <li>未激活</li>
                            </ul>
                        </div>
                        <div className="type typeBottom">
                            <h4>适用范围</h4>
                            <ul className="options">
                                <li>未使用</li>
                                <li>已使用</li>
                                <li className="activeOption">已过期</li>
                                <li>未激活</li>
                            </ul>
                        </div>
                        <div className="buttonAction">
                            <button className="reset">重置</button>
                            <button className="makeSure">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Filter;