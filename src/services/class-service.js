import classModel from "../models/class-model.js";

class StudentClassService {
    constructor() { }

    create(classData) {
        const newClass = new classModel(classData)
        return newClass.save();
    }

    findById(id) {
        return classModel.findById(id);
    }

    findByName(name) {
        return classModel.findOne({ name });
    }

    findAll() {
        return classModel.find({});
    }

    findByDepartmentId(id) {
        return classModel.find({ department: id });
    }

    updateClass(id, data) {
        return classModel.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    deleteClass(id) {
        return classModel.findByIdAndDelete(id, { new: true })
    }
}

export default new StudentClassService();
