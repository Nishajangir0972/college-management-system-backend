import departmentModel from "../models/department-model.js";

class DepartmentService {
    constructor() { }

    createDepartment(departmentData) {
        const newDepartment = new departmentModel(departmentData)
        return newDepartment.save();
    }

    findById(id) {
        return departmentModel.findById(id);
    }

    findAll() {
        return departmentModel.find({}).sort({ name: 1 });
    }

    findByname(name) {
        return departmentModel.findOne({ name });
    }

    updateDepartment(id, data) {
        return departmentModel.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    deletedepartment(id) {
        return departmentModel.findByIdAndDelete(id, { new: true })
    }
}

export default new DepartmentService();
