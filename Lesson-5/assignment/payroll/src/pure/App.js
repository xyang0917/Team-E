import React, {Component} from 'react'
import PayrollContract from '../build/contracts/Payroll.json'
import getWeb3 from './utils/getWeb3'

import Accounts from './components/Accounts'
import Common from './components/Common'
import Employer from './components/Employer'
import Employee from './components/Employee'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import 'antd/dist/antd.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            web3: null,
            payroll: null,          // Payroll合约实例
            accounts: null,         // 合约帐户地址列表
            selectedAccount: null,  // 当前选择的帐户地址
        }
    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({web3: results.web3})
            this.instantiateContract()
        }).catch((err) => {
            console.error('Error finding web3.\n', err)
        })
    }

    instantiateContract() {
        const contract = require('truffle-contract')
        const payroll = contract(PayrollContract)
        payroll.setProvider(this.state.web3.currentProvider)
        // 获取合约实例
        payroll.deployed().then((instance) => {
            this.setState({ payroll: instance})
            console.log('get payroll contract success')
        }).catch((err) => {
            console.error('获取合约实例失败: ', err)
        })
        // 获取合约帐户列表
        this.state.web3.eth.getAccounts((error, accounts) => {
            this.setState({
                accounts: accounts,
                selectedAccount: accounts[0]
            })
        })
    }

    onSelectedAccount = (event) => {
        this.setState({
            selectedAccount: event.target.text
        })
    }

    render() {
        const { web3, payroll, accounts, selectedAccount } = this.state 
        if (!accounts) {
            return <div>Loading...</div>
        }
        return (
            <div className="App">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="#" className="pure-menu-heading pure-menu-link">Payroll</a>
                </nav>

                <main className="container">
                    <div className="pure-g">
                        <div className="pure-u-1-3">
                            <Accounts accounts={accounts} onSelectedAccount={this.onSelectedAccount}></Accounts>
                        </div>
                        <div className="pure-u-2-3">
                            {
                                selectedAccount == accounts[0] ? 
                                <Employer web3={web3} payroll={payroll} employer={selectedAccount}></Employer> : 
                                <Employee web3={web3} payroll={payroll} employee={selectedAccount}></Employee>
                            }
                            {
                                payroll && <Common web3={web3} payroll={payroll} account={selectedAccount}></Common>
                            }
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App