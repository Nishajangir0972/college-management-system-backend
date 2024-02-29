import studentService from "../services/student-service.js";

export const isEmailUnique = async (email) => {
    const existingStudent = await studentService.getStudentByEmail(email);
    return !existingStudent; // Return true if email is unique, false if it already exists
};