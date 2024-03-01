import studentService from "../services/student-service.js";

export const isEmailUsed = async (email) => {
    const existingStudent = await studentService.findByEmail(email); 
    return existingStudent ? true : false;
}