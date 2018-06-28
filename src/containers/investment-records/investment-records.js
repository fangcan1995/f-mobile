import React, { Component } from 'react';
import { getInvestRecords, getTransferInvestRecords } from '../../actions/investmentRecord';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import NoItem from '../../components/no-items/no-items'
import './investment-records.less'

class investmentRecords extends Component {

    componentDidMount() {
        const { getInvestRecords, getTransferInvestRecords } = this.props;
        console.log(this.props.match.params)
        if (this.props.match.params.type == 0) {
            const cred = {
                projectId: this.props.match.params.id
            }
            getInvestRecords(cred)
        } else {
            const cred = {
                transId: this.props.match.params.id
            }
            getTransferInvestRecords(cred)
        }

    }
    render() {
        const { investmentRecord } = this.props;
        console.log(investmentRecord)
        return (
            <div id='investment-records'>
                {
                    investmentRecord.records.length ?
                        <div className='content'>
                            {
                                investmentRecord.records.map(item => {
                                    return (
                                        <div className='records-list' key={item.investTime}>
                                            <div className='name'>{item.investor}<span className='r'>{item.investAmt}</span></div>
                                            <div className='invest-way'>{item.investWayString}<span className='r'>{item.investTime}</span></div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        :
                        <NoItem></NoItem>
                }

            </div>
        )
    }
}

function select(state) {
    const { auth, investmentRecord } = state.toJS();
    return {
        auth,
        investmentRecord
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        loginUser,
        getInvestRecords,
        getTransferInvestRecords
    }, dispatch)

export default connect(select, mapDispatchToProps)(investmentRecords);