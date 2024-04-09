import mongoose, { Types } from "mongoose";

const marksSchema = new mongoose.Schema({
    student: {
        type: Types.ObjectId,
        ref: 'students',
        required: true
    },
    subject: {
        type: Types.ObjectId,
        ref: 'subjects',
        required: true
    },
    exam: {
        type: Types.ObjectId,
        ref: 'exams',
        required: true
    },
    marksObtained: {
        type: Number,
        required: true
    },
    maxMarks: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

marksSchema.index({ student: 1, exam: 1, subject: 1 }, { unique: true });

const marksModel = mongoose.model('marks', marksSchema);

export default marksModel;
