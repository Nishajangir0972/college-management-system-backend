import { Types } from "mongoose";
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

    async findClassDataById(id) {
        const pipeline = [
            {
                '$match': {
                    '_id': new Types.ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'departments',
                    'localField': 'department',
                    'foreignField': '_id',
                    'as': 'department'
                }
            }, {
                '$unwind': {
                    'path': '$department',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'department.createdAt': 0,
                    'department.updatedAt': 0,
                }
            }
        ];
        const classes = await classModel.aggregate(pipeline).exec();
        return classes[0];
    }

    async findAllClassesData() {
        const pipeline = [
            {
                '$lookup': {
                    'from': 'departments',
                    'localField': 'department',
                    'foreignField': '_id',
                    'as': 'department'
                }
            }, {
                '$unwind': {
                    'path': '$department',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'department.createdAt': 0,
                    'department.updatedAt': 0,
                }
            }, {
                $sort: { name: 1 }
            }
        ];
        const classes = await classModel.aggregate(pipeline).exec();
        return classes;
    }

    findByName(name) {
        return classModel.findOne({ name });
    }

    findAll() {
        return classModel.find({});
    }

   async findByDepartmentId(id) {
        const pipeline = [
            {
                '$match': {
                    'department': new Types.ObjectId(id)
                }
            },
            {
                '$lookup': {
                    'from': 'departments',
                    'localField': 'department',
                    'foreignField': '_id',
                    'as': 'department'
                }
            }, {
                '$unwind': {
                    'path': '$department',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'department.createdAt': 0,
                    'department.updatedAt': 0,
                }
            }, {
                $sort: { name: 1 }
            }
        ];
        const classes = await classModel.aggregate(pipeline).exec();
        return classes;
    }

    updateClass(id, data) {
        return classModel.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    deleteClass(id) {
        return classModel.findByIdAndDelete(id, { new: true })
    }
}

export default new StudentClassService();
