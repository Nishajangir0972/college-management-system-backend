import mongoose, { Types } from "mongoose";

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'rest-day', 'late', 'sick-leave', 'half-day'],
        required: true
    },
    signInTime: {
        type: Date,
        default: null,
    },
    signOutTime: {
        type: Date,
        default: null,
    }
}, {
    timestamps: true,
    versionKey: false
});

const attendanceModel = mongoose.model('attendance', attendanceSchema);

export default attendanceModel;
