import React, { Component } from 'react';
import {NavLink} from 'react-router-dom' 
import './footer-tab.less';


class FooterTab extends Component {

    render() {
        return (
            <div className='footer-tab'>
                <ul className='footer'>
                        <li className="">	
                            <NavLink to='/' activeClassName='active'>
                                <i className='icon-home-border'></i>
                                <div>首页</div>
                            </NavLink>   
                        </li>
                        <li className="">	
                            <NavLink to='/dynamic' activeClassName='active'>
                                <i className='icon-invest-border'></i>
                                <div>投资</div>
                            </NavLink>
                        </li>
                        <li className="">	
                            <NavLink to='/discover' activeClassName='active'>
                                <i className='icon-discovery-border'></i>
                                <div>发现</div>
                            </NavLink>
                        </li>
                        <li className="">	
                            <NavLink to='/my' activeClassName='active'>
                                <i className='icon-mine-border'></i>
                                <div>我的</div>
                            </NavLink>
                        </li>
                </ul>
            </div>

        );
    }

}

export default FooterTab;