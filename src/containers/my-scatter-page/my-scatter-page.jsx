import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast, PullToRefresh } from 'antd-mobile';

import AgreementCard from '../../components/agreement-card/agreement-card';
import Filter from '../../components/filter/filter';
import NoItems from '../../components/no-items/no-items';
import './my-scatter-page.less';

import { getMyScatter } from '../../actions/my-scatter';

class MyScatterPage extends Component {

    constructor(props) {
        super(props);
        this.pageNum = 1;
        this.state = {
            height: document.documentElement.clientHeight,
            refreshing: false,
            list: [],
            params: {
                status: 0,
                month: ''
            }
        }
    }

    componentDidMount() {
        const { getMyScatter } = this.props;
        getMyScatter().then(res => {
            this.setState({
                list: res.value.list,
                pages: res.value.pages
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        Toast.loading('Loading', 0);
        nextProps.isFetching === false && Toast.hide();
    }

    getScatter () {
        const { getMyScatter } = this.props;
        this.pageNum++;
        if (this.pageNum <= this.state.pages) {
            getMyScatter({
                ...this.state.params,
                pageNum: this.pageNum
            }).then(res => {
                this.setState({
                    list: [...this.state.list].concat(res.value.list)
                })
            })
        }
    }

    render() {
        console.log(this.state);
        const { scatterList, match, getMyScatter } = this.props;
        const isFull = match.url === '/mobile/my-scatter' ? true : false;
        return (
            <div className="my-scatter">
                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{height: this.state.height, overflow: 'auto'}}
                    direction={'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={this.getScatter.bind(this)}    
                >
                    {
                        this.state.list.length > 0 
                            ? this.state.list.map((item, i) => {
                                return <AgreementCard isFull={isFull} key={i} data={item} />
                            })
                            : <NoItems />
                    }
                </PullToRefresh>
                <Filter filterConfig={match.url}
                    result={
                        result => {
                            getMyScatter({
                                status: result.propTopIndex ? result.propTopIndex : 0,
                                month: result.propBottomIndex ? result.propBottomIndex : '',
                                pageNum: 1
                            }).then(res => {
                                this.setState({
                                    params: {
                                        status: result.propTopIndex ? result.propTopIndex : 0,
                                        month: result.propBottomIndex ? result.propBottomIndex : '',
                                    },
                                    list: res.value.list,
                                    pages: res.value.pages
                                });
                            })
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
        isFetching: myScatter.isFetching,
        scatterList: myScatter.scatterList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMyScatter: (params) => {
            return dispatch(getMyScatter(params))
        },
    }
}

MyScatterPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyScatterPage);

export default MyScatterPage;