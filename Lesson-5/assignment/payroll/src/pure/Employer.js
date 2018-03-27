import React from 'react'

class Employer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // 给合约加钱
    addFund = () => {
        const { web3, payroll, employer }  = this.props;
        payroll.addFund({
            from: employer,
            value: web3.toWei(this.fundInput.value)
        }).then((result) => {
            alert('Add Fund Success');
        }).catch((err) => {
            console.error(err)
            alert('Add Fund Error');
        });
    }

    // 添加员工
    addEmployee = () => {
        const { payroll, employer } = this.props
        payroll.addEmployee(this.employeeInput.value, parseInt(this.salaryInput.value,10), {
            from: employer,
            gas: 1000000
        }).then((result) => {
            alert('Add Employee Success');
        }).catch((err) => {
            console.error(err)
            alert('Add Employee Error');
        })
    }

    // 更新员工
    updateEmployee = () => {
        const { payroll, employer } = this.props
        payroll.updateEmployee(this.employeeInput.value, parseInt(this.salaryInput.value,10), {
            from: employer,
            gas: 1000000
        }).then((result) => {
            alert('Update Employee Success');
        }).catch((err) => {
            console.error(err)
            alert('Update Employee Error');
        })
    }

    // 删除员工
    removeEmployee = () => {
        const { payroll, employer } = this.props
        payroll.removeEmployee(this.employeeInput.value, {
            from: employer,
            gas: 1000000
        }).then((result) => {
            alert("Remove Employee Success")
        }).catch((err) => {
            console.error(err)
            alert('Remove Employee Error');
        })
    }

    render() {
        return (
            <div>
                <h2>Employer</h2>
                <from className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>Add fund</legend>
                        <label htmlFor="fund">fund</label>
                        <input type="text" id="fund" placeholder="fund" ref={(input) => { this.fundInput = input; }}/>
                        <button type="button" className="pure-button" onClick={this.addFund}>加钱</button>
                    </fieldset>
                </from>

                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>Add/Update Employee</legend>
                        
                        <label htmlFor="employee">employee id</label>
                        <input type="text" id="employee" placeholder="员工帐号" ref={ (input) => { this.employeeInput = input; } }/>

                        <label htmlFor="salary">salary</label>
                        <input type="text" id="salary" placeholder="1 ETH" ref={ (input) => { this.salaryInput = input; } }/>

                        <button type="button" className="pure-button" onClick={this.addEmployee}>添加员工</button>
                        <button type="button" className="pure-button" onClick={this.updateEmployee}>更新员工</button>
                    </fieldset>
                </form>

                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>Remove Employee</legend>
                        <label htmlFor="employee">employee id</label>
                        <input type="text" id="employee" placeholder="员工帐号" ref={ (input) => { this.employeeRemoveInput = input; } }/>
                        
                        <button type="button" className="pure-button" onClick={this.removeEmployee}>删除员工</button>
                    </fieldset>
                </form>
            </div>
        )
    }

}

export default Employer