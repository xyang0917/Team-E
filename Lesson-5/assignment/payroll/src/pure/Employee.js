import React from 'react'
import Moment from 'moment'

class Employee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            salary: 0,
            lastPaidDate: ''
        }
    }

    componentDidMount() {
        this.getEmployeeInfo()
        this.getBalance()
    }

    getEmployeeInfo() {
        const { web3, payroll, employee } = this.props
        payroll.employees.call(employee, {
            from: employee,
            gas: 1000000
        }).then((result) => {
            this.setState({
                salary: web3.fromWei(result[1].toNumber()),
                lastPaidDate: Moment(new Date(result[2].toNumber() * 1000)).format('YYYY-MM-DD HH:mm:ss')
            })
        }).catch((err) => {
            alert('获取员工信息失败')
        })
    }

    getBalance() {
        const { web3, employee } = this.props
        const balance = web3.eth.getBalance(employee)
        this.setState({
            balance: web3.fromWei(balance.toNumber())
        })
    }

    getPaid() {
        const { payroll, employee } = this.props
        payroll.getPaid({
            from: employee,
            gas: 1000000
        }).then((result) => {
            alert('领取薪水成功')
        }).catch((err) => {
            console.error('领取薪水失败',err)
            alert('领取薪水失败')
        })
    }

    render() {
        const { balance, salary, lastPaidDate } = this.state

        const { employee } = this.props

        return (
            <div>
                <h2>员工 { employee }</h2>
                {
                    !salary || salary === '0' ?
                    <p>你现在不是雇员</p> :
                    (
                        <div>
                            <p>薪水：{ salary } ETH</p>
                            <p>上次领取薪水时间：{ lastPaidDate.toString() }</p>
                            <p>余额：{ balance } ETH</p>
                            <button type="button" className="pure-button" onClick={ this.getPaid.bind(this) }>领取薪水</button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Employee