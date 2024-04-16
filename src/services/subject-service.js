import { Types } from 'mongoose';
import SubjectModel from '../models/subjects-model.js';

class SubjectService {
    constructor() { }

    create(subjectData) {
        const newSubject = new SubjectModel(subjectData)
        return newSubject.save();
    }

    async findById(id) {
        let pipeline = [
            {
                $match: {
                    _id: new Types.ObjectId(id)
                }
            },
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
                    'class.department': 0,
                    'class.createdAt': 0,
                    'class.updatedAt': 0
                }
            }
        ];
        const subject = await SubjectModel.aggregate(pipeline).exec()
        return subject[0];
    }

    findByName(name) {
        return SubjectModel.findOne({ name });
    }

    findAll() {
        return SubjectModel.find({});
    }

    async findAllSubjectssPaginated(page, limit, sort) {
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
                    'class.department': 0,
                    'class.createdAt': 0,
                    'class.updatedAt': 0
                }
            }
        ];
        pipeline = this.addPaginationPipeline(pipeline, page, limit, sort);
        const subjects = await SubjectModel.aggregate(pipeline).exec()
        const total = await this.countSubjects(pipeline);
        const total_pages = Math.ceil(total / limit);
        return {
            subjects,
            meta: {
                total_records: Number(total ? total : 0),
                page_total_records: subjects.length,
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

    async findAllSubjectsOfClass(classId) {
        let pipeline = [
            {
                $match: {
                    class: new Types.ObjectId(classId)
                }
            },
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
                    'class.department': 0,
                    'class.createdAt': 0,
                    'class.updatedAt': 0
                }
            }
        ];
        const subjects = await SubjectModel.aggregate(pipeline).exec()
        return subjects;
    }

    findBySession(session) {
        return SubjectModel.find({ session: session });
    }

    findOneByNameAndClass(name, ClassId) {
        return SubjectModel.findOne({ name, class: ClassId })
    }

    updateSubject(id, data) {
        return SubjectModel.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    deleteSubject(id) {
        return SubjectModel.findByIdAndDelete(id, { new: true })
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

    async countSubjects(aggregationPipeline) {
        aggregationPipeline.pop();
        aggregationPipeline.pop();
        aggregationPipeline.pop();
        aggregationPipeline.push({ $count: 'totalCount' });
        let count = await SubjectModel.aggregate(aggregationPipeline).exec();
        count = count[0]?.totalCount;
        return Number(count);
    }
}

export default new SubjectService();
