import { ForbiddenResponse, NotFoundResponse, UnauthorisedResponse, badRequestResponse, internalServerErrorResponse, unprocessableEntityResponse } from "./common-responses.js";

export const addNewExamResponse = {
    tags: ['Exams'],
    description: `This api is used to add a new exam. \n
    Permission required - ['exam.exam.create']`,
    summary: 'Add a new exam',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createExamBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Exam added successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "name": "MID-TERM 1",
                                    "session": "2020-2021",
                                    "_id": "66180d9479ba42f0f53e53c5",
                                    "createdAt": "2024-04-11T16:19:32.193Z",
                                    "updatedAt": "2024-04-11T16:19:32.193Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Exam added successfully',
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

export const getExamByIdResponse = {
    tags: ['Exams'],
    description: `This api is used to fetch a exam with its Id. \n
    Permission required - ['exam.exam.read']`,
    summary: 'Get a exam by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'examId',
            required: true,
            description: 'Exam Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '200': {
            description: 'Exam fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "66180d9479ba42f0f53e53c5",
                                    "name": "MID-TERM 1",
                                    "session": "2020-2021",
                                    "createdAt": "2024-04-11T16:19:32.193Z",
                                    "updatedAt": "2024-04-11T16:19:32.193Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Exam fetched',
                            },
                            errors: {
                                type: 'array',
                                example: []
                            }
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

export const getAllExamsResponse = {
    tags: ['Exams'],
    description: `This api is used to fetch all exams in a paginated way \n
    Permission required - ['exam.exam.read']`,
    summary: 'Fetch all exams',
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
                    example: { field: "createdAt", direction: -1 }
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
            description: 'Exams fetched successfully',
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
                                example: "Exams fetched"
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

export const getAllExamsBySessionResponse = {
    tags: ['Exams'],
    description: `This api is used to fetch all exams of a session in a paginated way \n
    Permission required - ['exam.exam.read']`,
    summary: 'Fetch all exams by session',
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
            in: 'path',
            name: 'session',
            description: 'Session of which exams are to be find',
            required: true,
            schema: {
                type: 'string',
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
                    example: { field: "createdAt", direction: -1 }
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
            description: 'Exams fetched successfully',
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
                                example: "Exams fetched"
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

export const updateExamByIdResponse = {
    tags: ['Exams'],
    description: `This api is used to update exam details by its Id. \n
    Permission required - ['exam.exam.update']`,
    summary: 'Update a exam',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'examId',
            required: true,
            description: 'Exam Id',
            schema: {
                type: 'string'
            }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createExamBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Exam updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "6618119fd7644dbac9cfb202",
                                    "name": "MID-TERM 3",
                                    "session": "2021-2022",
                                    "createdAt": "2024-04-11T16:36:47.450Z",
                                    "updatedAt": "2024-04-11T23:27:29.180Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Exam Updated successfully',
                            },
                            errors: {
                                type: 'string',
                                example: []
                            }
                        },
                    },
                },
            },
        },
        '400': badRequestResponse,
        '401': UnauthorisedResponse,
        '403': ForbiddenResponse,
        '404': NotFoundResponse,
        '422': unprocessableEntityResponse,
        '500': internalServerErrorResponse,
    },
};

export const deleteExamByIdResponse = {
    tags: ['Exams'],
    description: `This api is used to delete a exam with its Id. \n
    Permission required - ['exam.exam.delete']`,
    summary: 'Delete a exam by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'examId',
            required: true,
            description: 'Exam Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '202': {
            description: 'Exam deleted successfully',
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
                                example: 'Exam deleted',
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
export const createExamBody = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'MID-TERM 1',
        },
        session: {
            type: 'string',
            example: '2020-2021',
        },
    },
};
