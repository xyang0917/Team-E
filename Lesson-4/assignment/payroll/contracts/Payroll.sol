pragma solidity ^0.4.14;

import './SafeMath.sol';
import './Ownable.sol';

contract Payroll is Ownable {
    
    using SafeMath for uint;
    
    struct Employee {
        address id;
        uint salary;
        uint lastPayday;
    }
    
    uint constant payDuration = 10 seconds;
    mapping(address => Employee) public employees;
    
    uint totalSalary;
    
    modifier employeeExist(address employeeId) {
        var employee = employees[employeeId];
        assert(employee.id != 0x0);
        _;
    }
    
    function _partialPaid(Employee employee) private  {
        uint payment = employee.salary * (now - employee.lastPayday) / payDuration;
        assert(this.balance >= payment);
        employee.id.transfer(payment);
    }
    
    function addEmployee(address employeeId, uint salary) onlyOwner {
        var employee = employees[employeeId];
        assert(employee.id == 0x0);
        uint s = salary * 1 ether;
        totalSalary += s;
        employees[employeeId] = Employee(employeeId, s, now);
    }
    
    function removeEmployee(address employeeId) onlyOwner employeeExist(employeeId) {
        var employee = employees[employeeId];
        _partialPaid(employees[employeeId]);
        totalSalary -= employee.salary;
        delete employees[employeeId];
    }
    
    function addFund() payable returns (uint){
        return this.balance;
    }
    
    function calculateRunway() returns (uint) {
        assert(totalSalary > 0);
        return this.balance / totalSalary;
    }
    
    function hasEnoughFund() returns (bool) {
        return calculateRunway() > 0;
    }
    
    function getPaid() employeeExist(msg.sender) {
        var employee = employees[msg.sender];
        
        uint nextPayDay = employee.lastPayday + payDuration;
        assert(nextPayDay < now);
        
        employees[msg.sender].lastPayday = nextPayDay;
        employees[msg.sender].id.transfer(employee.salary);
    }

    function changeEmployee(address employeeId, uint s) onlyOwner employeeExist(employeeId) {
        var employee = employees[employeeId];
        totalSalary -= employee.salary;
        _partialPaid(employees[employeeId]);
        employees[employeeId].lastPayday = now;
        employees[employeeId].salary = s * 1 ether;
        totalSalary += employees[employeeId].salary;
    }
    
    // 修改员工薪水支付地址
    function changePaymemntAddress(address newAddress) employeeExist(msg.sender) {
        var employee = employees[msg.sender];
        employee.id = newAddress;
        employees[newAddress] = employee;
        delete employees[msg.sender];
    }

    function getBalance() constant returns (uint) {
        return this.balance;
    }
    
}
