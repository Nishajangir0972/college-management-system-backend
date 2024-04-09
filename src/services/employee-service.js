import { Types } from "mongoose";
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

    async findEmployeeDetailsById(id) {
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
                '$lookup': {
                    'from': 'roles',
                    'localField': 'role',
                    'foreignField': '_id',
                    'as': 'role'
                }
            }, {
                '$unwind': {
                    'path': '$role',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    'password': 0,
                    'department.createdAt': 0,
                    'department.updatedAt': 0,
                    'role.createdAt': 0,
                    'role.updatedAt': 0,
                    'role.isSuperAdmin': 0,
                    'role.permissions': 0
                }
            }
        ]
        const employee = await employeeModel.aggregate(pipeline).exec()
        return employee[0]
    }

    async findAllEmployeesPaginated(page, limit, sort) {
        let pipeline = [
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
                '$lookup': {
                    'from': 'roles',
                    'localField': 'role',
                    'foreignField': '_id',
                    'as': 'role'
                }
            }, {
                '$unwind': {
                    'path': '$role',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$project': {
                    password: 0,
                    'department.createdAt': 0,
                    'department.updatedAt': 0,
                    'role.createdAt': 0,
                    'role.updatedAt': 0,
                    'role.isSuperAdmin': 0,
                    'role.permissions': 0
                }
            }
        ]
        pipeline = this.addPaginationPipeline(pipeline, page, limit, sort);
        const employees = await employeeModel.aggregate(pipeline).exec()
        const total = await this.countEmployees(pipeline);
        const total_pages = Math.ceil(total / limit);
        return {
            employees,
            meta: {
                total_records: Number(total ? total : 0),
                page_total_records: employees.length,
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

    async countEmployees(aggregationPipeline) {
        aggregationPipeline.pop();
        aggregationPipeline.pop();
        aggregationPipeline.pop();
        aggregationPipeline.push({ $count: 'totalCount' });
        let count = await employeeModel.aggregate(aggregationPipeline).exec();
        count = count[0]?.totalCount;
        return Number(count);
    }
}

export default new EmployeeService();
