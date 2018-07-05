import React, { Component } from "react";
import './stepperInput.less';
import { Modal } from 'antd-mobile';
let rate;
let loanExpiry;
export default class StepperInput extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.add = this.add.bind(this);
        this.minus = this.minus.bind(this);
        this.cutClick = this.cutClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        let defaultValue = ``;
        if (props.config.returnAmount) {
            if (this.checkMoney(props.config.returnAmount).code == 100) {
                defaultValue = props.config.returnAmount;
            }
        } else {
            defaultValue = props.config.defaultValue;
        }
        this.state = {
            value: defaultValue,
        }
    }
    handleChange(event) {
        const { min, max, callback, setMoney, setProfit } = this.props.config;
        this.setState({ value: event.target.value }, () => {
            let result = this.checkMoney(parseInt(this.state.value));
            if (result.code > 1) {
                setMoney(this.state.value),
                    setProfit(this.state.value * (rate / 12 * loanExpiry) * 0.01)
                callback({
                    code: result.code,
                    value: this.state.value,
                    tips: `${result.tips}`,
                })
            } else {
                callback({
                    code: result.code,
                    value: '0',
                    tips: `${result.tips}`,
                })
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        rate = nextProps.detail.projectDetails.annualRate + nextProps.detail.projectDetails.raiseRate;
        loanExpiry = nextProps.detail.projectDetails.loanExpiry
        this.state = {
            value: nextProps.config.money,
        }
    }
    checkMoney(value) {
        console.log('//////////');
        console.log(value);
        const { min, max, step, surplusAmount, availableBalance } = this.props.config;
        if (value.length <= 0) {
            this.setState({
                value: ''
            })
            return { code: 0, tips: '请输入投资金额' };
        } else {
            let reg = /^\+?[1-9][0-9]*$/;
            if (value === 0) {
                return { code: 2, tips: `最低可投${min}元` };
            }
            if (reg.test(value)) {

                if (value < min) {
                    return { code: 2, tips: `最低可投${min}元` };
                } else if (value > max) {
                    return { code: 3, tips: `最高可投${max}元` };
                } else {
                    if (value % step != 0 && max != value) {
                        return { code: 4, tips: `必须是${step}的倍数` };
                    }
                    return { code: 100, tips: `` };
                }
                if (value > availableBalance) {
                    return { code: 5, tips: `账户可用余额不足` };
                }
            } else {
                return { code: 1, tips: `金额格式不正确` };
            };
        };
    }
    add() {
        const { callback, setMoney, setProfit } = this.props.config;
        let step = this.props.config.step;
        let max = this.props.config.max;  //可投金额
        let result = this.checkMoney(parseInt(this.state.value) + step);  //验证增加后是否合法
        if (result.code > 1) {
            if (result.code == 5) {

            }
            if (result.code == 3) {
                step = (max - parseInt(this.state.value))
            } else {
                step = step;
            }
            setMoney(parseInt(this.state.value) + step)
            setProfit((parseInt(this.state.value) + step) * (rate / 12 * loanExpiry) * 0.01)
            // (result.code==3)?step=0:step=step;
            this.setState({
                code: result.code,
                value: (parseInt(this.state.value) + step),
                //tips:result.tips
            }, () => {
                let code = this.checkMoney(parseInt(this.state.value)).code;
                callback({
                    code: code,
                    value: this.state.value,
                    tips: `${result.tips}`,

                });
            });
        }
    }
    minus() {
        const { callback, setMoney, setProfit } = this.props.config;
        let step = this.props.config.step;
        let result = this.checkMoney(parseInt(this.state.value) - step);
        if (result.code > 1) {
            (result.code == 2) ? step = 0 : step = step;
            setMoney(parseInt(this.state.value) - step)
            setProfit((parseInt(this.state.value) - step) * (rate / 12 * loanExpiry) * 0.01)
            this.setState({
                code: result.code,
                value: (parseInt(this.state.value) - step),
                //tips:result.tips
            }, () => {
                let code = this.checkMoney(parseInt(this.state.value)).code;
                callback({
                    code: code,
                    value: this.state.value,
                    tips: `${result.tips}`
                });
            });

        }
    }
    //获取焦点即全部选中
    cutClick() {
        this.refs.amount.select();
    };
    render() {
        return (
            <div className className='money'>
                <span className='minus' onClick={this.minus}><i className='icon-minus'></i></span>
                <div className='number'><input type="text" value={this.state.value} ref="amount" maxLength={9} onClick={this.cutClick} onChange={this.handleChange} /></div>
                <span className='plus' onClick={this.add}><i className='icon-plus'></i></span>
            </div>
        );
    }
}