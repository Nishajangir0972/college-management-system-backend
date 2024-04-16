import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});


subjectSchema.index({ name: 1, class: 1 }, { unique: true });
const SubjectModel = mongoose.model('subjects', subjectSchema);

export default SubjectModel;
