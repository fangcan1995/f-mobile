import React, { Component } from 'react';

import AgreementCard from '../../components/agreement-card/agreement-card';
import Filter from '../../components/filter/filter';
import './my-scatter-page.less';

class MyScatterPage extends Component {
    render() {
        return (
            <div className="my-scatter">
                <AgreementCard isFull={true}/>
                <AgreementCard isFull={true}/>
                <AgreementCard isFull={true}/>
                <Filter />
            </div>
        );
    }
}

export default MyScatterPage;