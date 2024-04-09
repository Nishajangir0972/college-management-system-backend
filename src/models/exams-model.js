import mongoose from "mongoose";

const examsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

examsSchema.index({ name: 1, session: 1 }, { unique: true });

const examsModel = mongoose.model('exams', examsSchema);

export default examsModel;
