export function getTips(messageCode){
    const errDicts = [
        {
            code:`invest_000`,
            message:{code: 1, message: `前端验证提示1`, allowGoOn: true}
        },
        {
            code:`invest_001`,
            message:{code: 100, message: `请输入交易密码！`, allowGoOn: true}
        },
        {
            code:`invest_002`,
            message:{code: 100, message: `交易密码错误！`, allowGoOn: true}
        },
        {
            code:`invest_003`,
            message:{code: 100, message: `系统异常，请稍后再试！`, allowGoOn: true}
        },
        {
            code:`invest_004`,
            message:{code: 100, message: `请先进行开户操作！`, allowGoOn: true}
        },
        {
            code:`invest_005`,
            message:{code: 100, message: `账户余额不足，请先充值！`, allowGoOn: true}
        },
        {
            code:`invest_006`,
            message:{code: 100, message: `投资金额必须是100的整数倍！`, allowGoOn: true}
        },
        {
            code:`invest_007`,
            message:{code: 100, message: `投标开始时间未到！`, allowGoOn: true}
        },
        {
            code:`invest_008`,
            message:{code: 100, message: `招标已结束！`, allowGoOn: true}
        },
        {
            code:`invest_009`,
            message:{code: 100, message: `您是原标发起人，该项目不可投！`, allowGoOn: true}
        },
        {
            code:`invest_010`,
            message:{code: 100, message: `该项目处于不可投资状态，请刷新！`, allowGoOn: true}
        },
        {
            code:`invest_011`,
            message:{code: 100, message: `投资金额低于使用红包的最低投资金额！`, allowGoOn: true}
        },
        {
            code:`invest_012`,
            message:{code: 100, message: `投资金额低于使用加息券的最低投资金额！`, allowGoOn: true}
        },
        {
            code:`invest_013`,
            message:{code: 100, message: `你已经投资成功过，不允许投资新手标！`, allowGoOn: true}
        },
        {
            code:`invest_014`,
            message:{code: 100, message: `你已经借款成功过，不允许投资新手标！`, allowGoOn: true}
        },
        {
            code:`invest_015`,
            message:{code: 100, message: `该项目不可重复投资！`, allowGoOn: true}
        },
        {
            code:`invest_016`,
            message:{code: 100, message: `投资金额不能大于标的可投剩余金额！`, allowGoOn: true}
        },
        {
            code:`invest_017`,
            message:{code: 100, message: `请您先进行风险评测！`, allowGoOn: true}
        },
        {
            code:`invest_018`,
            message:{code: 100, message: `投资额度超过风险评估总额上限！`, allowGoOn: true}
        },
        {
            code:`invest_019`,
            message:{code: 100, message: `标的少于起投金额时，需全部进行投资！`, allowGoOn: true}
        },
        {
            code:`invest_020`,
            message:{code: 100, message: `剩余金额少于起投金额，需全部进行投资！`, allowGoOn: true}
        },
        {
            code:`invest_021`,
            message:{code: 100, message: `请大于最低投资限额！`, allowGoOn: true}
        },
        {
            code:`invest_022`,
            message:{code: 100, message: `请小于最高投资限额！`, allowGoOn: true}
        },
        {
            code:`invest_023`,
            message:{code: 101, message: `当前投资用户过多，请稍后再试！`, allowGoOn: true}
        },
        {
            code:`invest_024`,
            message:{code: 100, message: `投资失败，借款人未开户！`, allowGoOn: true}
        },
        {
            code:`invest_025`,
            message:{code: 101, message: `系统烦忙，请稍后！`, allowGoOn: true}
        },
        {
            code:`invest_026`,
            message:{code: 201, message: `非法操作`, allowGoOn: false}
        },
        {
            code:`invest_027`,
            message:{code: 0, message: `操作成功`, allowGoOn: false}
        },
        {
            code:`invest_028`,
            message:{code: 9999, message: `操作失败`, allowGoOn: false}
        },
        {
            code:`pay_0000`,
            message:{code: 0, message: `操作成功`, allowGoOn: true}
        },
        {
            code:`pay_1001`,
            message:{code: 0, message: `未进行实名认证`, allowGoOn: false}
        },
        {
            code:`pay_1002`,
            message:{code: 0, message: `尚未开户`, allowGoOn: false}
        },
        {
            code:`pay_1003`,
            message:{code: 0, message: `会员信息有误`, allowGoOn: false}
        },
        {
            code:`pay_1004`,
            message:{code: 0, message: `暂无更换银行卡请求记录`, allowGoOn: false}
        },
        {
            code:`pay_1005`,
            message:{code: 0, message: `请输入合法的金额`, allowGoOn: false}
        },
        {
            code:`pay_1006`,
            message:{code: 0, message: `账户余额不足 `, allowGoOn: false}
        },
        {
            code:`pay_9999`,
            message:{code: 9999, message: `操作失败`, allowGoOn: true}
        },
        {
            code:`pay_9999_0`,
            message:{code: 99990, message: `换卡申请失败`, allowGoOn: false}
        },
        {
            code:`pay_5343`,
            message:{code: 102, message: `用户已开户`, allowGoOn: true}
        },


    ];
    let index=errDicts.findIndex((x)=>
        x.code ==messageCode
    );
    if (index==-1){
        return {code: 406, message: messageCode, allowGoOn: true}
    }else{
        return errDicts[index].message;
    }

}