import React, { Component } from 'react';
import {NavLink} from 'react-router-dom' 
import './footer-tab.less';


class FooterTab extends Component {

    render() {
        return (
            <ul className='footer'>
                    <li className="">	
                        <NavLink to='/mobile/home' activeClassName='active' className='a-icon'>
                            <i className='icon-home-border'></i>
                            <div>首页</div>
                        </NavLink>   
                    </li>
                    <li className="">	
                        <NavLink to='/mobile/subjectList' activeClassName='active' className='a-icon'>
                            <i className='icon-invest-border'></i>
                            <div>投资</div>
                        </NavLink>
                    </li>
                    <li className="">	
                        <NavLink to='/mobile/discover' activeClassName='active' className='a-icon'>
                            <i className='icon-discovery-border'></i>
                            <div>发现</div>
                        </NavLink>
                    </li>
                    <li className="">	
                        <NavLink to='/mobile/my' activeClassName='active' className='a-icon'>
                            <i className='icon-mine-border'></i>
                            <div>我的</div>
                        </NavLink>
                    </li>
            </ul>

        );
    }

}

export default FooterTab;