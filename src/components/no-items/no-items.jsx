import React from 'react';

import './no-items.less';

export default () => {
    return (
        <div className="no-items">
            <div className="no-items-icon">
                <i className="icon-item-detail"></i>
            </div>
            <div className="no-items-text">暂无记录</div>
        </div>
    );
}