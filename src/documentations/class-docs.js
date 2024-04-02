import { ForbiddenResponse, NotFoundResponse, UnauthorisedResponse, badRequestResponse, internalServerErrorResponse, unprocessableEntityResponse } from "./common-responses.js";

export const createClassResponse = {
    tags: ['Classes'],
    description: `This api is used to create a new class. \n
    Permission required - ['class.class.create']`,
    summary: 'Create a new class',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createClassBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Class created successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "name": "BSC-I",
                                    "department": "6606a7e884ff854225614d36",
                                    "_id": "6607dac0f141f184d584fa72",
                                    "createdAt": "2024-03-30T09:26:24.093Z",
                                    "updatedAt": "2024-03-30T09:26:24.093Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Class created successfully',
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

export const getClassByIdResponse = {
    tags: ['Classes'],
    description: `This api is used to fetch a class with its Id. \n
    Permission required - ['class.class.read']`,
    summary: 'Get a class by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'classId',
            required: true,
            description: 'Class Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '200': {
            description: 'Class fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "6607dac0f141f184d584fa72",
                                    "name": "BSC-I",
                                    "department": {
                                        "_id": "6606a7e884ff854225614d36",
                                        "name": "BBA/BCA"
                                    },
                                    "createdAt": "2024-03-30T09:26:24.093Z",
                                    "updatedAt": "2024-03-30T09:26:24.093Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Class fetched',
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

export const getAllClassesResponse = {
    tags: ['Classes'],
    description: `This api is used to fetch all classes \n
    Permission required - ['class.class.read']`,
    summary: 'Fetch all classes',
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        '200': {
            description: 'Classes fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'array',
                                example: [
                                    {
                                        "_id": "6606a7f384ff854225614d3a",
                                        "name": "BCA-I",
                                        "department": {
                                            "_id": "6606a7e884ff854225614d36",
                                            "name": "BBA/BCA"
                                        },
                                        "createdAt": "2024-03-29T11:37:23.867Z",
                                        "updatedAt": "2024-03-29T11:37:23.867Z"
                                    },
                                    {
                                        "_id": "6607dac0f141f184d584fa72",
                                        "name": "BSC-I",
                                        "department": {
                                            "_id": "6606a7e884ff854225614d36",
                                            "name": "BBA/BCA"
                                        },
                                        "createdAt": "2024-03-30T09:26:24.093Z",
                                        "updatedAt": "2024-03-30T09:26:24.093Z"
                                    }
                                ]
                            },
                            message: {
                                type: 'string',
                                example: "Classes fetched"
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

export const getAllClassesByDepartmentResponse = {
    tags: ['Classes'],
    description: `This api is used to fetch all classes \n
    Permission required - ['class.class.read']`,
    summary: 'Fetch all classes',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'departmentId',
            required: true,
            description: 'Department Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '200': {
            description: 'Classes fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'array',
                                example: [
                                    {
                                        "_id": "6606a7f384ff854225614d3a",
                                        "name": "BCA-I",
                                        "department": {
                                            "_id": "6606a7e884ff854225614d36",
                                            "name": "BBA/BCA"
                                        },
                                        "createdAt": "2024-03-29T11:37:23.867Z",
                                        "updatedAt": "2024-03-29T11:37:23.867Z"
                                    },
                                    {
                                        "_id": "6607dac0f141f184d584fa72",
                                        "name": "BSC-I",
                                        "department": {
                                            "_id": "6606a7e884ff854225614d36",
                                            "name": "BBA/BCA"
                                        },
                                        "createdAt": "2024-03-30T09:26:24.093Z",
                                        "updatedAt": "2024-03-30T09:26:24.093Z"
                                    }
                                ]
                            },
                            message: {
                                type: 'string',
                                example: "Classes fetched"
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

export const updateClassByIdResponse = {
    tags: ['Classes'],
    description: `This api is used to update class details by its Id. \n
    Permission required - ['class.class.update']`,
    summary: 'Update a class',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'classId',
            required: true,
            description: 'Class Id',
            schema: {
                type: 'string'
            }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createClassBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Class updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "6607dac0f141f184d584fa72",
                                    "name": "BSC-I",
                                    "department": "6606a7e884ff854225614d36",
                                    "createdAt": "2024-03-30T09:26:24.093Z",
                                    "updatedAt": "2024-03-30T09:52:42.413Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Class Updated successfully',
                            },
                            errors: {
                                type:'string',
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

export const deleteClassByIdResponse = {
    tags: ['Classes'],
    description: `This api is used to delete a class with its Id. \n
    Permission required - ['class.class.delete']`,
    summary: 'Delete a class by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'classId',
            required: true,
            description: 'Class Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '202': {
            description: 'Class deleted successfully',
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
                                example: 'Class deleted',
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
export const createClassBody = {
    type: 'object',
    properties: {
        department: {
            type: 'string',
            example: '6606a7e884ff854225614d36',
        },
        name: {
            type: 'string',
            example: 'BSC-I',
        },
    },
};
