import React, { Component } from 'react';

import './footer-tab.less';


class FooterTab extends Component {

    render() {
        return (
            <div className='footer-tab'>
                <ul className='footer'>
                        <li className="">					
                            <a href="">
                                <i className='icon-home-border'></i>
                                <div>首页</div>
                            </a>
                        </li>
                        <li className="">				
                            <a href="">
                                <i className='icon-invest-border'></i>
                                <div>投资</div>
                            </a>
                        </li>
                        <li className="">					
                            <a href="">
                                <i className='icon-discovery-border'></i>
                                <div>发现</div>
                            </a>
                        </li>
                        <li className="">					
                            <a href="">
                                <i className='icon-mine-border'></i>
                                <div>我的</div>
                            </a>
                        </li>
                </ul>
            </div>

        );
    }

}

export default FooterTab;