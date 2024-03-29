import courseModel from "../models/course-schema.js";

class CoursesService {
    constructor() { }

    create(courseData) {
        const newCourse = new courseModel(courseData)
        return newCourse.save();
    }

    findById(id) {
        return courseModel.findById(id);
    }

    findByName(name) {
        return courseModel.findOne({ name });
    }

    findAll() {
        return courseModel.find({});
    }

    findByDepartmentId(id) {
        return courseModel.find({ department: id });
    }

    updateCourse(id, data) {
        return courseModel.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    deleteCourse(id) {
        return courseModel.findByIdAndDelete(id, { new: true })
    }
}

export default new CoursesService();
