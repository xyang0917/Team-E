import React, {Component} from 'react'
import Payroll from '../build/contracts/Payroll.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            calculateRunway: 0,
            employees: null,
            accounts: [],
            web3: null,
            payroll: null,
        }
    }

    componentWillMount() {
        // Get network provider and web3 instance. See utils/getWeb3 for more info.

        getWeb3.then(results => {
            this.setState({web3: results.web3})
            // Instantiate contract once web3 provided.
            this.instantiateContract()
        }).catch((err) => {
            console.error('Error finding web3.\n', err)
        })
    }

    instantiateContract() {
        const contract = require('truffle-contract')
        const payroll = contract(Payroll)
        payroll.setProvider(this.state.web3.currentProvider)
        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            this.setState({accounts: accounts})
            payroll.deployed().then((instance) => {
                    this.setState({
                        payroll: instance
                    })
                    return instance
                }).catch((err) => {
                    console.error('get contract instance error.\n', err)
                })
            })
    }

    render() {
        return (
            <div className="App">
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
                </nav>

                <main className="container">
                    <div className="pure-g">
                        <div className="pure-u-1-1">
                            <h1>Good to Go!</h1>
                            <p>Your Truffle Box is installed and ready.</p>
                            <h2>Smart Contract Example</h2>
                            <p>If your contracts compiled and migrated successfully, below will show a
                                stored value of 5 (by default).</p>
                            <p>Try changing the value stored on
                                <strong>line 59</strong>
                                of App.js.</p>
                        </div>
                        <div className="pure-u-1-1">
                            <h1>合约帐号列表</h1>
                            <ul>
                                {this.state.accounts.map(account => <li key={account}>{account}</li>)}
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App
