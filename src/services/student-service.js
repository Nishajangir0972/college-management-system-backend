import studentModel from "../models/student-model.js";

class StudentService {
    constructor() { }

    createStudent(studentData) {
        const newStudent = new studentModel(studentData)
        return newStudent.save();
    }

    findById(id) {
        return studentModel.findById(id);
    }

    findByUsername(username) {
        return studentModel.findOne({ username });
    }

    findByEmail(email) {
        return studentModel.findOne({ email });
    }

    updateStudent(id, updatedStudent) {
        return studentModel.findByIdAndUpdate(id, updatedStudent, { new: true })
    }

    deleteStudent(id) {
        return studentModel.findByIdAndDelete(id, { new: true })
    }
}

export default new StudentService();
