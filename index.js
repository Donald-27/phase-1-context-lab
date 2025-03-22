/* Your Code Here */
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arr) {
    let records = [];
    for (let i = 0; i < arr.length; i++) {
        records.push(createEmployeeRecord(arr[i]));
    }
    return records;
}

function createTimeInEvent(dateStamp) {
    let parts = dateStamp.split(" ");
    let event = {
        type: "TimeIn",
        date: parts[0],
        hour: parseInt(parts[1])
    };
    this.timeInEvents.push(event);
    return this;
}

function createTimeOutEvent(dateStamp) {
    let parts = dateStamp.split(" ");
    let event = {
        type: "TimeOut",
        date: parts[0],
        hour: parseInt(parts[1])
    };
    this.timeOutEvents.push(event);
    return this;
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(e => e.date === date);
    let timeOut = this.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function allWagesFor() {
    let total = 0;
    for (let i = 0; i < this.timeInEvents.length; i++) {
        total += wagesEarnedOnDate.call(this, this.timeInEvents[i].date);
    }
    return total;
}

function findEmployeeByFirstName(arr, firstName) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].firstName === firstName) {
            return arr[i];
        }
    }
    return undefined;
}

function calculatePayroll(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += allWagesFor.call(arr[i]);
    }
    return total;
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

