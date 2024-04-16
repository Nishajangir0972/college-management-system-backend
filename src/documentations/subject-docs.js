import { ForbiddenResponse, NotFoundResponse, UnauthorisedResponse, badRequestResponse, internalServerErrorResponse, unprocessableEntityResponse } from "./common-responses.js";

export const addNewSubjectResponse = {
    tags: ['Subjects'],
    description: `This api is used to add a new subject. \n
    Permission required - ['subject.subject.create']`,
    summary: 'Add a new subject',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createSubjectBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Subject added successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "name": "DSA",
                                    "description": "Computer networking subject to make students know about computer networking",
                                    "class": "6606a7f384ff854225614d3a",
                                    "_id": "661dc611bd3e3501456b7fdd",
                                    "createdAt": "2024-04-16T00:28:01.569Z",
                                    "updatedAt": "2024-04-16T00:28:01.569Z",
                                },
                            },
                            message: {
                                type: 'string',
                                example: "New subject added successfully",
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

export const getSubjectByIdResponse = {
    tags: ['Subjects'],
    description: `This api is used to fetch a subject with its Id. \n
    Permission required - ['subject.subject.read']`,
    summary: 'Get a subject by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'subjectId',
            required: true,
            description: 'Subject Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '200': {
            description: 'Subject fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "661882a4894ed5f7da556bd1",
                                    "name": "Computer Networking",
                                    "description": "Computer networking subject to make students know about computer networking",
                                    "class": {
                                        "_id": "6606a7f384ff854225614d3a",
                                        "name": "BCA-I"
                                    },
                                    "createdAt": "2024-04-12T00:39:00.851Z",
                                    "updatedAt": "2024-04-12T00:39:00.851Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Subject fetched',
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

export const getAllSubjectsResponse = {
    tags: ['Subjects'],
    description: `This api is used to fetch all subjects in a paginated way \n
    Permission required - ['subject.subject.read']`,
    summary: 'Fetch all subjects',
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
            description: 'Subjects fetched successfully',
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
                                            "_id": "661882a4894ed5f7da556bd1",
                                            "name": "Computer Networking",
                                            "description": "Computer networking subject to make students know about computer networking",
                                            "class": {
                                                "_id": "6606a7f384ff854225614d3a",
                                                "name": "BCA-I"
                                            },
                                            "createdAt": "2024-04-12T00:39:00.851Z",
                                            "updatedAt": "2024-04-12T00:39:00.851Z"
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
                                example: "Subjects fetched"
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

export const getAllSubjectsByClassResponse = {
    tags: ['Subjects'],
    description: `This api is used to fetch all subjects of a class. \n
    Permission required - ['subject.subject.read']`,
    summary: 'Fetch all subjects od a particular class',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'classId',
            description: 'Class of which subjects are to be find',
            required: true,
            schema: {
                type: 'string',
            },
        },
    ],
    responses: {
        '200': {
            description: 'Subjects fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'Object',
                                example: [
                                    {
                                        "_id": "661dc611bd3e3501456b7fdd",
                                        "name": "DSA",
                                        "description": "Data structures and algorithm",
                                        "class": {
                                            "_id": "6606a7f384ff854225614d3a",
                                            "name": "BCA-I"
                                        },
                                        "createdAt": "2024-04-16T00:28:01.569Z",
                                        "updatedAt": "2024-04-16T00:28:01.569Z"
                                    }
                                ],
                            },
                            message: {
                                type: 'string',
                                example: "Subjects fetched"
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

export const updateSubjectByIdResponse = {
    tags: ['Subjects'],
    description: `This api is used to update subject details by its Id. \n
    Permission required - ['subject.subject.update']`,
    summary: 'Update a subject',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'subjectId',
            required: true,
            description: 'subject Id',
            schema: {
                type: 'string'
            }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createSubjectBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Subject updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "661882a4894ed5f7da556bd1",
                                    "name": "Computer Networking Updated",
                                    "description": "Updated Desription here",
                                    "class": "6606a7f384ff854225614d3a",
                                    "createdAt": "2024-04-12T00:39:00.851Z",
                                    "updatedAt": "2024-04-16T01:08:26.672Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Subject Updated successfully',
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

export const deleteSubjectByIdResponse = {
    tags: ['Subjects'],
    description: `This api is used to delete a Subject with its Id. \n
    Permission required - ['subject.subject.delete']`,
    summary: 'Delete a subject by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'subjectId',
            required: true,
            description: 'subject Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '202': {
            description: 'Subject deleted successfully',
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
                                example: 'Subject deleted',
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
export const createSubjectBody = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Computer Networking',
        },
        description: {
            type: 'string',
            example: 'Computer networking subject to make students know about computer networking',
        },
        class: {
            type: 'string',
            example: '66180d9479ba42f0f53e53c5',
        },
    },
};
