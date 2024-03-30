import { ForbiddenResponse, NotFoundResponse, UnauthorisedResponse, badRequestResponse, internalServerErrorResponse, unprocessableEntityResponse } from "./common-responses.js";

export const createStudentResponse = {
    tags: ['Students'],
    description: `This api is used to create a new student. \n
    Permission required - ['student.student.create']`,
    summary: 'Create a student',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createStudentBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Student created successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "firstName": "Babbar",
                                    "lastName": "Sher",
                                    "username": "student2",
                                    "fathersName": "Bheem Bahadur",
                                    "email": "student2@gmail.com",
                                    "mobile": 9876543210,
                                    "alternativeMobile": 1123456789,
                                    "dob": "2024-03-29T09:38:46.374Z",
                                    "role": "660675629e74c518118a16f1",
                                    "department": "66068c26359c43746245a744",
                                    "class": "66068c26359c43746245a744",
                                    "_id": "66069e4c8f590ca4b4b4e621",
                                    "createdAt": "2024-03-29T10:56:12.137Z",
                                    "updatedAt": "2024-03-29T10:56:12.137Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Student created successfully',
                            },
                        },
                    },
                },
            },
        },
        '400': badRequestResponse,
        '401': UnauthorisedResponse,
        '403': ForbiddenResponse,
        '500': internalServerErrorResponse,
    },
};

export const getStudentByIdResponse = {
    tags: ['Students'],
    description: `This api is used to fetch a student with its Id. \n
    Permission required - ['student.student.read']`,
    summary: 'Get a student by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'studentId',
            required: true,
            description: 'Student Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '200': {
            description: 'Student fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "firstName": "Babbar",
                                    "lastName": "Sher",
                                    "username": "student2",
                                    "fathersName": "Bheem Bahadur",
                                    "email": "student2@gmail.com",
                                    "mobile": 9876543210,
                                    "alternativeMobile": 1123456789,
                                    "dob": "2024-03-29T09:38:46.374Z",
                                    "department": {
                                        "_id": "6606a7e884ff854225614d36",
                                        "name": "BBA/BCA"
                                    },
                                    "class": {
                                        "_id": "6606a7f384ff854225614d3a",
                                        "name": "BCA-I"
                                    },
                                    "_id": "66069e4c8f590ca4b4b4e621",
                                    "createdAt": "2024-03-29T10:56:12.137Z",
                                    "updatedAt": "2024-03-29T10:56:12.137Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Student fetched',
                            },
                        },
                    },
                },
            },
        },
        '401': UnauthorisedResponse,
        '403': ForbiddenResponse,
        '404': NotFoundResponse,
        '422': unprocessableEntityResponse,
        '500': internalServerErrorResponse,
    },
};

export const getAllStudentsResponse = {
    tags: ['Students'],
    description: `This api is used to fetch all students in a paginated way \n
    Permission required - ['student.student.read']`,
    summary: 'Fetch all students',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'query',
            name: 'page',
            description: 'Page number for pagination',
            required: false,
            schema: {
                type: 'integer',
                default: 1,
            },
        },
        {
            in: 'query',
            name: 'limit',
            description: 'Limit per page',
            required: false,
            schema: {
                type: 'integer',
                default: 10,
            },
        },
        {
            in: 'query',
            name: 'sort',
            description: 'Sort field and direction',
            required: false,
            schema: {
                type: 'array',
                items: {
                    type: 'object',
                    example: { field: "createdAt", direction: 1 }
                    // properties: {
                    //     field: {
                    //         type: 'string',
                    //         description: 'Field to sort by',
                    //         example: 'createdAt'
                    //     },
                    //     direction: {
                    //         type: 'integer',
                    //         description: 'Sort direction (1 for ascending, -1 for descending)',
                    //         default: 1,
                    //     },
                    // },
                },
            },
        },
    ],
    responses: {
        '200': {
            description: 'Student fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'Object',
                                example: {
                                    students: [
                                        {
                                            "_id": "66069df52d1b1d3e1c75c162",
                                            "firstName": "Babbar",
                                            "lastName": "Sher",
                                            "username": "student",
                                            "fathersName": "Bheem Bahadur",
                                            "email": "student@gmail.com",
                                            "mobile": 9876543210,
                                            "alternativeMobile": 1123456789,
                                            "dob": "2024-03-29T09:38:46.374Z",
                                            "department": {
                                                "_id": "6606a7e884ff854225614d36",
                                                "name": "BBA/BCA"
                                            },
                                            "class": {
                                                "_id": "6606a7f384ff854225614d3a",
                                                "name": "BCA-I"
                                            },
                                            "createdAt": "2024-03-29T10:54:45.181Z",
                                            "updatedAt": "2024-03-29T10:54:45.181Z"
                                        }
                                    ],
                                    "meta": {
                                        "total_records": 1,
                                        "page_total_records": 1,
                                        "current_page": 1,
                                        "total_pages": 1,
                                        "has_previous": false,
                                        "has_next": false,
                                        "last_page": 1,
                                        "first_page": 1
                                    }
                                }
                            },
                            message: {
                                type: 'string',
                                example: "Students fetched"
                            },
                            errors: {
                                type: 'Array',
                                example: []
                            }
                        },
                    },
                },
            },
        },
        '401': UnauthorisedResponse,
        '403': ForbiddenResponse,
        '422': unprocessableEntityResponse,
        '500': internalServerErrorResponse,
    },
};

export const updateStudentByIdResponse = {
    tags: ['Students'],
    description: `This api is used to update student details by his Id. \n
    Permission required - ['student.student.update']`,
    summary: 'Update a student',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'studentId',
            required: true,
            description: 'Student Id',
            schema: {
                type: 'string'
            }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/updateStudentDataByIdBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Student updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "firstName": "Babbar",
                                    "lastName": "Sher",
                                    "username": "student2",
                                    "fathersName": "Bheem Bahadur",
                                    "email": "student2@gmail.com",
                                    "mobile": 9876543210,
                                    "alternativeMobile": 1123456789,
                                    "dob": "2024-03-29T09:38:46.374Z",
                                    "role": "660675629e74c518118a16f1",
                                    "department": "66068c26359c43746245a744",
                                    "class": "66068c26359c43746245a744",
                                    "_id": "66069e4c8f590ca4b4b4e621",
                                    "createdAt": "2024-03-29T10:56:12.137Z",
                                    "updatedAt": "2024-03-29T10:56:12.137Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Student Updated successfully',
                            },
                        },
                    },
                },
            },
        },
        '400': badRequestResponse,
        '401': UnauthorisedResponse,
        '403': ForbiddenResponse,
        '422': unprocessableEntityResponse,
        '500': internalServerErrorResponse,
    },
};

export const deleteStudentByIdResponse = {
    tags: ['Students'],
    description: `This api is used to delete a student with its Id. \n
    Permission required - ['student.student.delete']`,
    summary: 'Delete a student by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'studentId',
            required: true,
            description: 'Student Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '202': {
            description: 'Student deleted successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: null,
                            },
                            message: {
                                type: 'string',
                                example: 'Student deleted',
                            },
                            errors: {
                                type: 'array',
                                example: []
                            },
                        },
                    },
                },
            },
        },
        '401': UnauthorisedResponse,
        '403': ForbiddenResponse,
        '404': NotFoundResponse,
        '422': unprocessableEntityResponse,
        '500': internalServerErrorResponse,
    },
};


/*------------------Body-Schemas-------------------------*/
export const createStudentBody = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            example: 'Babbar',
        },
        lastName: {
            type: 'string',
            example: 'Sher',
        },
        fathersName: {
            type: 'string',
            example: 'Bheem Bahadur',
        },
        mobile: {
            type: 'number',
            example: 9876543210,
        },
        alternativeMobile: {
            type: 'number',
            example: 1123456789,
        },
        email: {
            type: 'string',
            example: 'student@gmail.com',
        },
        dob: {
            type: 'string',
            example: '2024-03-29T09:38:46.374+00:00',
        },
        class: {
            type: 'string',
            example: '6606a7f384ff854225614d3a',
        },
        department: {
            type: 'string',
            example: '6606a7e884ff854225614d36',
        },
    },
};

export const updateStudentDataByIdBody = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            example: 'Babbar',
        },
        lastName: {
            type: 'string',
            example: 'Sher',
        },
        fathersName: {
            type: 'string',
            example: 'Bheem Bahadur',
        },
        mobile: {
            type: 'number',
            example: 9876543210,
        },
        alternativeMobile: {
            type: 'number',
            example: 1123456789,
        },
        dob: {
            type: 'string',
            example: '2024-03-29T09:38:46.374+00:00',
        },
        class: {
            type: 'string',
            example: '6606a7f384ff854225614d3a',
        },
        department: {
            type: 'string',
            example: '6606a7e884ff854225614d36',
        },
    },
};
