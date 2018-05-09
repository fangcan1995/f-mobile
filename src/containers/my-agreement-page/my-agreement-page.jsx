import React, { Component } from 'react';

import AgreementCard from '../../components/agreement-card/agreement-card';
import Filter from '../../components/filter/filter';
import FilterButton from '../../components/filter/filter-button';
import './my-agreement-page.less';

class MyAgreementPage extends Component {
    render() {
        return (
            <div className="my-agreement">
                <AgreementCard />
                <AgreementCard />
                <AgreementCard />
                <FilterButton />
                {/* <Filter /> */}
            </div>
        );
    }
}

export default MyAgreementPage;