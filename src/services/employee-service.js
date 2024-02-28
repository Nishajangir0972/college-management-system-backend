import employeeModel from "../models/employee-model.js";

class EmployeeService {
    constructor() { }

    createEmployee(employeeData) {
        const newEmployee = new employeeModel(employeeData)
        return newEmployee.save();
    }

    findById(id) {
        return employeeModel.findById(id);
    }

    findByUsername(username) {
        return employeeModel.findOne({ username });
    }

    findByEmail(email) {
        return employeeModel.findOne({ email });
    }

    updateEmployee(id, updatedEmployee) {
        return employeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true })
    }

    deleteEmployee(id) {
        return employeeModel.findByIdAndDelete(id, { new: true })
    }
}

export default new EmployeeService();
