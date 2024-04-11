import examsModel from '../models/exams-model.js';

class ExamService {
    constructor() { }

    create(examData) {
        const newExam = new examsModel(examData)
        return newExam.save();
    }

    findById(id) {
        return examsModel.findById(id);
    }

    findByName(name) {
        return examsModel.findOne({ name });
    }

    findAll() {
        return examsModel.find({});
    }

    async findAllExamsPaginated(page, limit, sort) {
        let pipeline = [];
        pipeline = this.addPaginationPipeline(pipeline, page, limit, sort);
        const exams = await examsModel.aggregate(pipeline).exec()
        const total = await this.countExams(pipeline);
        const total_pages = Math.ceil(total / limit);
        return {
            exams,
            meta: {
                total_records: Number(total ? total : 0),
                page_total_records: exams.length,
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

    async findAllExamsWithSessionPaginated(page, limit, sort, session) {
        let pipeline = [
            {
                $match: {
                    session: session,
                }
            }
        ];
        pipeline = this.addPaginationPipeline(pipeline, page, limit, sort);
        const exams = await examsModel.aggregate(pipeline).exec()
        const total = await this.countExams(pipeline);
        const total_pages = Math.ceil(total / limit);
        return {
            exams,
            meta: {
                total_records: Number(total ? total : 0),
                page_total_records: exams.length,
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

    findBySession(session) {
        return examsModel.find({ session: session });
    }

    findOneByNameAndSession(name, session) {
        return examsModel.findOne({ name, session })
    }

    updateExam(id, data) {
        return examsModel.findByIdAndUpdate(id, { $set: data }, { new: true })
    }

    deleteExam(id) {
        return examsModel.findByIdAndDelete(id, { new: true })
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

    async countExams(aggregationPipeline) {
        aggregationPipeline.pop();
        aggregationPipeline.pop();
        aggregationPipeline.pop();
        aggregationPipeline.push({ $count: 'totalCount' });
        let count = await examsModel.aggregate(aggregationPipeline).exec();
        count = count[0]?.totalCount;
        return Number(count);
    }
}

export default new ExamService();
