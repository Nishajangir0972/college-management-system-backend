import { Types } from "mongoose";
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

    async findStudentDataById(id) {
        const pipeline = [
            {
                '$match': {
                    '_id': new Types.ObjectId(id)
                }
            }, {
                '$lookup': {
                    'from': 'classes',
                    'localField': 'class',
                    'foreignField': '_id',
                    'as': 'class'
                }
            }, {
                '$unwind': {
                    'path': '$class',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'password': 0,
                    'role': 0,
                    'class.createdAt': 0,
                    'class.updatedAt': 0,
                    'class.department': 0
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
                    'department.updatedAt': 0
                }
            }
        ]
        return studentModel.aggregate(pipeline).exec()
    }

    async findAllStudentsPaginated(page, limit, sort) {
        let pipeline = [
            {
                '$lookup': {
                    'from': 'classes',
                    'localField': 'class',
                    'foreignField': '_id',
                    'as': 'class'
                }
            }, {
                '$unwind': {
                    'path': '$class',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'password': 0,
                    'role': 0,
                    'class.createdAt': 0,
                    'class.updatedAt': 0,
                    'class.department': 0
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
                    'department.updatedAt': 0
                }
            }
        ]
        pipeline = this.addPaginationPipeline(pipeline,page,limit,sort);
        const students = await studentModel.aggregate(pipeline).exec()
          const total = await this.countUsers(pipeline);
          const total_pages = Math.ceil(total / limit);
          return {
            students,
            meta: {
              total_records: Number(total ? total : 0),
              page_total_records: students.length,
              current_page: Number(
                page ? page : 1,
              ),
              total_pages: Number(total_pages ? total_pages : 1),
              has_previous: page > 1,
              has_next: page < total_pages,
              last_page: Number(total_pages ? total_pages : 1),
              first_page: 1,
            },
          };
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

    addPaginationPipeline(pipeline, page, limit, sort) {
        const skip = (page - 1) * limit;
        const sortObject = {};
        for (const sortItem of sort) {
            sortObject[sortItem.field] = sortItem.direction;
        }
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: limit });
        if (sortObject) {
            pipeline.push({ $sort: sortObject });
        }
        return pipeline;
    }

    async countUsers(aggregationPipeline) {
        aggregationPipeline.pop();
        aggregationPipeline.pop();
        aggregationPipeline.pop();
        aggregationPipeline.push({ $count: 'totalCount' });
        let count = await studentModel.aggregate(aggregationPipeline).exec();
        count = count[0]?.totalCount;
        return Number(count);
    }
}

export default new StudentService();
