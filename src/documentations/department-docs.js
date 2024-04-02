import { ForbiddenResponse, NotFoundResponse, UnauthorisedResponse, badRequestResponse, internalServerErrorResponse, unprocessableEntityResponse } from "./common-responses.js";

export const createDepartmentResponse = {
    tags: ['Departments'],
    description: `This api is used to create a new Department. \n
    Permission required - ['department.department.create']`,
    summary: 'Create a new Department',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createDepartmentBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Department created successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "660675629e74c518118a16f0",
                                    "name": "TEST DEPARTMENT",
                                    "createdAt": "2024-03-29T08:01:38.446Z",
                                    "updatedAt": "2024-03-30T09:24:37.895Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Department created successfully',
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
        '400': badRequestResponse,
        '401': UnauthorisedResponse,
        '403': ForbiddenResponse,
        '500': internalServerErrorResponse,
    },
};

export const getDepartmentByIdResponse = {
    tags: ['Departments'],
    description: `This api is used to fetch a Department with its Id. \n
    Permission required - ['department.department.read']`,
    summary: 'Get a Department by Id',
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
            description: 'Department fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "660675629e74c518118a16f0",
                                    "name": "TEST DEPARTMENT",
                                    "createdAt": "2024-03-29T08:01:38.446Z",
                                    "updatedAt": "2024-03-30T09:24:37.895Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Department fetched',
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

export const getAllDepartmentsResponse = {
    tags: ['Departments'],
    description: `This api is used to fetch all Departments \n
    Permission required - ['department.department.read']`,
    summary: 'Fetch all Departments',
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        '200': {
            description: 'Departments fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'array',
                                example: [
                                    {
                                        "_id": "660675629e74c518118a16f0",
                                        "name": "TEST DEPARTMENT",
                                        "createdAt": "2024-03-29T08:01:38.446Z",
                                        "updatedAt": "2024-03-30T09:24:37.895Z"
                                    }
                                ]
                            },
                            message: {
                                type: 'string',
                                example: "Departments fetched"
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

export const updateDepartmentByIdResponse = {
    tags: ['Departments'],
    description: `This api is used to update Department details by its Id. \n
    Permission required - ['Department.department.update']`,
    summary: 'Update a Department',
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
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createDepartmentBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Department updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "660675629e74c518118a16f0",
                                    "name": "TEST DEPARTMENT",
                                    "createdAt": "2024-03-29T08:01:38.446Z",
                                    "updatedAt": "2024-03-30T09:24:37.895Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Department Updated successfully',
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

export const deleteDepartmentByIdResponse = {
    tags: ['Departments'],
    description: `This api is used to delete a Department with its Id. \n
    Permission required - ['department.department.delete']`,
    summary: 'Delete a Department by Id',
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
        '202': {
            description: 'Department deleted successfully',
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
                                example: 'Department deleted',
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
export const createDepartmentBody = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Test',
        },
    },
};
