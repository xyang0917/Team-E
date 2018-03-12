pragma solidity ^0.4.14;

contract Payroll {
    
    uint salary = 1 ether;
    address employee = 0x0;
    
    address owner;
    
    uint constant payDuration = 10 seconds;
    uint lastPayday = now;
    
    function Payroll() {
        owner = msg.sender;
    }
    
    function addFund() payable returns (uint){
        return this.balance;
    }
    
    function getBalance() returns (uint) {
        return this.balance;
    }
    
    function calculateRunway() returns (uint) {
        return this.balance / salary;
    }
    
    function hasEnoughFund() returns (bool) {
        return calculateRunway() > 0;
    }
    
    function getPaid() {
        if (msg.sender != owner) {
            revert();
        }
        
        if (employee == 0x0) {
            revert();
        }
        
        uint nextPayDay = lastPayday + payDuration;
        if (nextPayDay > now) {
            revert();
        }
        
        if (!hasEnoughFund()) {
            revert();
        }
        
        lastPayday = nextPayDay;
        employee.transfer(salary);
    }

    function changeEmployee(address emp) {
        require(msg.sender == owner);
        employee = emp;
    }
    
    function changeSalary(uint s) {
        require(msg.sender == owner);
        salary = s * 1 ether;
    }
    
}