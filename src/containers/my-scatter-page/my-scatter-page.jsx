import React, { Component } from 'react';
import { connect } from 'react-redux';

import AgreementCard from '../../components/agreement-card/agreement-card';
import Filter from '../../components/filter/filter';
import './my-scatter-page.less';

import { getMyScatter } from '../../actions/my-scatter';

class MyScatterPage extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getMyScatter } = this.props;
        getMyScatter();
    }

    render() {
        const { scatterList, match, getMyScatter } = this.props;
        const isFull = match.url === '/my-scatter' ? true : false;
        return (
            <div className="my-scatter">
                {
                    scatterList.length > 0 ? scatterList.map((item, i) => {
                        return <AgreementCard isFull={isFull} key={i} data={item}/>
                    })
                    : '暂无数据'
                }
                <Filter filterConfig={match.url} 
                    result={
                        result => {
                            getMyScatter(
                                result.propTopIndex ? result.propTopIndex : 0,
                                result.propBottomIndex ? result.propBottomIndex : ''
                            );
                        }
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { myScatter } = state.toJS();
    return {
        scatterList: myScatter.scatterList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMyScatter: (status, month) => {
            dispatch(getMyScatter(status, month))
        },
    }
}

MyScatterPage = connect(
    mapStateToProps, 
    mapDispatchToProps
)(MyScatterPage);

export default MyScatterPage;