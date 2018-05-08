import React, { Component } from 'react';

import './filter.less';


class Filter extends Component {

    render() {
        return (
            <div className="filter">
                <div className="filterArea">
                    <div className="typeTop">
                        <h3>红包状态</h3>
                        
                    </div>
                    {
                        <div className="typeBottom">投标时间</div>
                    }
                    <div className="buttonAction">
                        <button className="reset">重置</button>
                        <button className="makeSure">确定</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Filter;