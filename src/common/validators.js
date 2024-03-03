import classService from "../services/class-service.js";
import departmentService from "../services/department-service.js";
import roleService from "../services/role-service.js";
import studentService from "../services/student-service.js";

export const isEmailUsed = async (email) => {
    const existingStudent = await studentService.findByEmail(email);
    return existingStudent ? true : false;
}

export const isDepartmentExists = async (name) => {
    const existingDepartment = await departmentService.findByname(name);
    return existingDepartment ? true : false;
}

export const isClassExists = async (name) => {
    const existingClass = await classService.findByName(name)
    return existingClass ? true : false;
}

export const isRoleExists = async (name) => {
    const existingRole = await roleService.findByname(name)
    return existingRole ? true : false;
}