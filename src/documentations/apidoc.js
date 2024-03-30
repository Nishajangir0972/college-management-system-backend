import { AuthEmployeeLoginBody, AuthLoginBody, employeeLoginResponse, employeePasswordResetRequestResponse, employeePasswordResetResponse, passwordResetRequestBody, resetPasswordBody, studentLoginResponse, studentPasswordResetRequestResponse, studentPasswordResetResponse } from "./auth-docs.js";
import { createClassBody, createClassResponse, deleteClassByIdResponse, getAllClassesByDepartmentResponse, getAllClassesResponse, getClassByIdResponse, updateClassByIdResponse } from "./class-docs.js";
import { createRoleBody, createRoleResponse, deleteRoleByIdResponse, getAllRolesResponse, getRoleByIdResponse, getSelfPermissionsResponse, updateRoleByIdResponse } from "./roles-docs.js";
import { createStudentBody, createStudentResponse, deleteStudentByIdResponse, getAllStudentsResponse, getStudentByIdResponse, updateStudentByIdResponse, updateStudentDataByIdBody } from "./student-docs.js";

const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'College Management System Api Documentation',
        description: 'The College Management System API provides a comprehensive set of endpoints to facilitate the efficient management of various tasks within a college environment. From student enrollment to faculty management, course scheduling, and administrative tasks, this API offers seamless integration and functionality.',
        //   termsOfService: 'https://mysite.com/terms',
        //   contact: {
        //     name: 'Ajay Shekhawat',
        //     email: 'dev@example.com',
        //     url: 'https://devwebsite.com',
        //   },
        //   license: {
        //     name: 'Apache 2.0',
        //     url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        //   },
    },
    servers: [
        {
            url: 'http://localhost:8000/',
            description: 'Local Server',
        },
        //   {
        //     url: 'https://api.mysite.com',
        //     description: 'Production Server',
        //   },
    ],
    apis: ['../index.js'],
    tags: [
        {
            name: 'Auth',
        },
        {
            name: 'Employees',
        },
        {
            name: 'Students',
        },
        {
            name: 'Classes',
        },
        {
            name: 'Courses',
        },
        {
            name: 'Departments',
        },
        {
            name: 'Roles',
        },
    ],
    paths: {
        /*-----------------------Auth-Section---------------------------*/
        '/auth/student/login': {
            post: studentLoginResponse,
        },
        '/auth/employee/login': {
            post: employeeLoginResponse,
        },
        '/auth/student/reset-password': {
            post: studentPasswordResetRequestResponse,
        },
        '/auth/student/reset-password/{resetPasswordToken}': {
            post: studentPasswordResetResponse,
        },
        '/auth/employee/reset-password': {
            post: employeePasswordResetRequestResponse,
        },
        '/auth/employee/reset-password/{resetPasswordToken}': {
            post: employeePasswordResetResponse,
        },
        /*-----------------------Student-Section---------------------------*/
        '/student/create': {
            post: createStudentResponse,
        },
        '/student/get/{studentId}': {
            get: getStudentByIdResponse,
        },
        '/student/getall': {
            get: getAllStudentsResponse,
        },
        '/student/update/{studentId}': {
            patch: updateStudentByIdResponse,
        },
        '/student/delete/{studentId}': {
            delete: deleteStudentByIdResponse,
        },
        /*-----------------------Classes-Section---------------------------*/
        '/class/create': {
            post: createClassResponse,
        },
        '/class/get/{classId}': {
            get: getClassByIdResponse,
        },
        '/class/getall': {
            get: getAllClassesResponse,
        },
        '/class/get-by-department/{departmentId}': {
            get: getAllClassesByDepartmentResponse,
        },
        '/class/update/{classId}': {
            patch: updateClassByIdResponse,
        },
        '/class/delete/{classId}': {
            delete: deleteClassByIdResponse,
        },
        /*-----------------------Roles-Section---------------------------*/
        '/role/create': {
            post: createRoleResponse,
        },
        '/role/{roleId}': {
            get: getRoleByIdResponse,
        },
        '/role/': {
            get: getAllRolesResponse,
        },
        '/role/get-permissions/self': {
            get: getSelfPermissionsResponse,
        },
        '/role/update/{roleId}': {
            patch: updateRoleByIdResponse,
        },
        '/role/delete/{roleId}': {
            delete: deleteRoleByIdResponse,
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            /*-----------------------Auth-Section---------------------------*/
            AuthLoginBody, AuthEmployeeLoginBody, passwordResetRequestBody, resetPasswordBody,
            /*-----------------------Student-Section---------------------------*/
            createStudentBody, updateStudentDataByIdBody,
            /*-----------------------Class-Section---------------------------*/
            createClassBody,
            /*-----------------------Roles-Section---------------------------*/
            createRoleBody,
        },
    },
};

export { apiDocumentation };