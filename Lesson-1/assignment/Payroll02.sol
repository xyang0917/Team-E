pragma solidity ^0.4.14;

contract Payroll {
    
    struct Employee {
        address id;
        uint salary;
        uint lastPayday;
    }
    
    uint constant payDuration = 10 seconds;
    address owner;
    Employee[] employees;
    
    uint lastEmployeeCount = 0;
    uint totalSalary = 0;
    
    function Payroll() {
        owner = msg.sender;
    }
    
    function _partialPaid(Employee employee) private {
        uint payment = employee.salary * (now - employee.lastPayday) / payDuration;
        employee.id.transfer(payment);
    }
    
    function _findEmployee(address employeeId) private returns (Employee, uint){
        for (uint i = 0; i < employees.length; i++) {
            if (employees[i].id == employeeId) {
                return (employees[i], i);
            }
        }
    }
    
    function addEmployee(address employeeId, uint salary) {
        require(msg.sender == owner);
        var (employee,index) = _findEmployee(employeeId);
        assert(employee.id == 0x0);
        employees.push(Employee(employeeId,salary * 1 ether,now));
    }
    
    function removeEmployee(address employeeId) {
        require(msg.sender == owner);
        var (employee, index) = _findEmployee(employeeId);
        assert(employee.id != 0x0);
        
        _partialPaid(employee);
        
        totalSalary -= employee.salary;
        
        delete employees[index];
        employees[index] = employees[employees.length - 1];
        employees.length -= 1;
        
        lastEmployeeCount = employees.length;
    }
    
    function addFund() payable returns (uint){
        return this.balance;
    }
    
    // 优化后，减少遍历次数
    function calculateRunway() returns (uint) {
        for (uint i = lastEmployeeCount; i < employees.length; i++) {
            totalSalary += employees[i].salary;
        }
        assert(totalSalary > 0);
        lastEmployeeCount = employees.length;
        return this.balance / totalSalary;
    }
    
    // function calculateRunway() returns (uint) {
    //     uint totalSalary = 0;
    //     for (uint i = 0; i < employees.length; i++) {
    //         totalSalary += employees[i].salary;
    //     }
    //     assert(totalSalary > 0);
    //     return this.balance / totalSalary;
    // }
    
    function hasEnoughFund() returns (bool) {
        return calculateRunway() > 0;
    }
    
    function getPaid() {
        var (employee,index) = _findEmployee(msg.sender);
        assert(employee.id != 0x0);
        
        uint nextPayDay = employee.lastPayday + payDuration;
        assert(nextPayDay < now);
        
        employees[index].lastPayday = nextPayDay;
        employees[index].id.transfer(employee.salary);
    }

    function changeEmployee(address employeeId, uint s) {
        require(msg.sender == owner);
        var (employee,index) = _findEmployee(employeeId);
        assert(employee.id != 0x0);
        _partialPaid(employee);
        employees[index].lastPayday = now;
        employees[index].salary = s * 1 ether;
    }
    
}
