function createEmployeeRecord(employeeArray) {
    let employee = {};
    employee.firstName = employeeArray[0];
    employee.familyName = employeeArray[1];
    employee.title = employeeArray[2];
    employee.payPerHour = employeeArray[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
  
    return employee;
}

function createEmployeeRecords(array) {
    let employeeRecords = array.map(function(employeeArray) {
      return createEmployeeRecord(employeeArray);
    });
    return employeeRecords;
}

function createTimeInEvent(dateStamp){
    const [date, time] = dateStamp.split(' ')
    const hour = parseInt(time, 10)

    const timeInEvent = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    this.timeInEvents.push(timeInEvent);
    return this;
}

function createTimeOutEvent(dateStamp){
    const [date, time] = dateStamp.split(' ');
    const hour = parseInt(time, 10);

    const timeOutEvent = {
      type: "TimeOut",
      hour: hour,
      date: date
    };

    this.timeOutEvents.push(timeOutEvent);
    return this;
}

function hoursWorkedOnDate(date){
    // console.log("checking the value of this:", this)
    // console.log("checking the value of date:", date)
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    // console.log("checking the value of timeInEvent:", timeInEvent)
    // console.log("checking the value of timeOutEvent:", timeOutEvent)

    return (timeOutEvent.hour - timeInEvent.hour) / 100;
    // const hoursWorked = this.timeInEvents.reduce((totalHours, event) => {
    //   if (event.date === date) {
    //     const timeOutEvent = this.timeOutEvents.find(e => e.date === date);
    //     return timeOutEvent.hour - event.hour;
    //   }
    //   return totalHours;
    // }, 0);
    // return hoursWorked / 100;
}


function wagesEarnedOnDate(date) {
    const payRate = this.payPerHour;
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const payOwed = hoursWorked * payRate;
    return payOwed;
}


function findEmployeeByFirstName(srcArray, firstName){
    const findEmployee = srcArray.find(employee => employee.firstName === firstName);
    return findEmployee;
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeeRecords){
    let totalPayroll = 0;
    for (let i = 0; i < employeeRecords.length; i++) {
      const employee = employeeRecords[i];
      const employeePay = allWagesFor.call(employee);
      totalPayroll += employeePay;
    }
    return totalPayroll;
}
