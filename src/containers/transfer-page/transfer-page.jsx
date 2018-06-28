import React, { Component } from "react";

import "../withdraw-page/withdraw-page.less";
import { getTransfer,applyTransfer } from "../../actions/my-scatter";
import { connect } from "react-redux";
import { Toast, Modal } from "antd-mobile";
import { hex_md5 } from "../../libs/md5";
class TransferPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: ""
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTransfer(this.props.match.params.id));
  }
  allOut(money, e) {
    this.setState({
      money: money
    });
  }
  handleChange(type, e) {
    this.setState({
      [type]: e.target.value
    });
  }
  submitPrice(money, e) {
      const prompt = Modal.prompt
    if (this.state.money <= money && this.state.money % 100 == 0) {
      prompt(
        "交易密码",
        "请输入交易密码",
        [
          {
            text: "取消"
          },
          {
            text: "确认",
            onPress: password => {
              let tradePassword = hex_md5(password);
              const { myScatter } = this.props;
              let submitData={
                transAmt:this.state.money,
                investId:myScatter.transfer.investId,
                traderPassword:tradePassword,
                transFee:myScatter.transfer.transferRate
              }
              const { dispatch } = this.props;
              dispatch(applyTransfer(submitData));
            }
          }
        ],
        "secure-text"
      );
    } else {
      Toast.info("请输入100的倍数且小于投资金额");
    }
  }
  render() {
    const { myScatter } = this.props;
    let proName = this.props.match.params.proName;
    return (
      <div className="withdraw">
        <div className="area userInfo">
          <div className="baseStyle">
            <div className="label">标的名称</div>
            <div className="realName">{proName}</div>
          </div>
          <div className="baseStyle">
            <div className="label">投资金额</div>
            <div className="realName">
              ￥{myScatter.transfer.canTransferMoney}
            </div>
          </div>
        </div>
        <div className="area withdrawArea">
          <div className="baseStyle">
            <label className="symbol">
              ￥
              <input
                type="text"
                onChange={this.handleChange.bind(this, "money")}
                value={this.state.money}
                placeholder={`最多取出${myScatter.transfer.canTransferMoney}元`}
              />
              <span
                className="withdrawTotal"
                onClick={this.allOut.bind(
                  this,
                  myScatter.transfer.canTransferMoney
                )}
              >
                全部取出
              </span>
            </label>
          </div>
        </div>
        <div className="textInfo">
          <p>转让规则说明</p>
        </div>
        <div
          className="withdrawButton"
          onClick={this.submitPrice.bind(
            this,
            myScatter.transfer.canTransferMoney
          )}
        >
          提交审核
        </div>
        <div className="contactBlock">
          <p>
            如有问题可拨打客服热线
            <a>0411-84609588</a>咨询
            <br />
            或咨询在线客服
            <a>喵宝</a>
          </p>
        </div>
      </div>
    );
  }
}
function select(state) {
  const { myScatter } = state.toJS();
  return {
    myScatter
  };
}

export default connect(select)(TransferPage);
