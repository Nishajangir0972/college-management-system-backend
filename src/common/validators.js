import classService from "../services/class-service.js";
import courseService from "../services/course-service.js";
import departmentService from "../services/department-service.js";
import roleService from "../services/role-service.js";
import studentService from "../services/student-service.js";

export const isEmailUsed = async (email) => {
    const existingStudent = await studentService.findByEmail(email);
    return existingStudent ? true : false;
}

export const isDepartmentNameExists = async (name) => {
    const existingDepartment = await departmentService.findByname(name);
    return existingDepartment ? true : false;
}

export const isDepartmentIdExists = async (id) => {
    const existingDepartment = await departmentService.findById(id);
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

export const isCourseNameExists = async (name) => {
    const existingCourse = await courseService.findByName(name)
    return existingCourse ? true : false;
}