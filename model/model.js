// Assuming your model.js file looks something like this:

const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  Transid: { type: String, required: true },
  Empid: { type: String, required: true },
  UserName: { type: String, required: true },
  Designation: { type: String, required: true },
  TotalHoursWorked: { type: Number, default: 0 }, // New field for total hours worked
  TotalSalary: { type: Number, required: true },
  LeavesTaken: { type: Number, default: 0 } // New field for leaves taken
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
