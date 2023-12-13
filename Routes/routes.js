let router = require('express').Router();

router.get('/api',function(req,res){
    res.json({
        status : 'API Works',
        message : 'Welcome to Salary Page'
    });
});
const Salary = require('../model/model.js');
router.post('/register', async (req, res) => {
    var user = new Salary();
    user.Transid = req.body.Transid;
    user.Empid = req.body.Empid;
    user.UserName = req.body.UserName;
    user.Designation = req.body.Designation;
    try {
        await user.save();
        res.status(201).json({
            message: 'New user signed up',
            data: {
                UserName : req.body.UserName,
                Empid : req.body.Empid,
                Designation : req.body.Designation,
                TransId : req.body.Transid,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: 'User Already Registered',
            error: err.message, // Optionally include the error message for debugging
        });
    }
});

router.post('/calculate-salary', (req, res) => {
    const { employeeId } = req.body;
  
    const employee = Salary.find(emp => emp.EmployeeId === employeeId);
  
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
  
    const { TotalHoursWorked, TotalSalary } = employee;
    const hourlyRate = TotalSalary / 200; // Assuming monthly salary and 200 working hours
  
    let deduction = 0;
  
    if (TotalHoursWorked < 200) {
      deduction = (200 - TotalHoursWorked) * hourlyRate * 0.1; // 10% deduction for every hour below 200
    }
  
    const finalSalary = TotalSalary - deduction;
  
    res.json({
      EmployeeId: employee.EmployeeId,
      UserName: employee.UserName,
      TransactionId: generateTransactionId(),
      FinalSalary: finalSalary,
      Deduction: deduction
    });
  });
  
  // Helper function to generate a random transaction ID (for demonstration purposes)
  function generateTransactionId() {
    return Math.random().toString(36).substring(7);
  }
  