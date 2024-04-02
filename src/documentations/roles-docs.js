import { ForbiddenResponse, NotFoundResponse, UnauthorisedResponse, badRequestResponse, internalServerErrorResponse, unprocessableEntityResponse } from "./common-responses.js";

export const createRoleResponse = {
    tags: ['Roles'],
    description: `This api is used to create a new Role. \n
    Permission required - ['role.role.create']`,
    summary: 'Create a new Role',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createRoleBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Role created successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "660675629e74c518118a16f0",
                                    "name": "SUPER ADMIN",
                                    "isSuperAdmin": true,
                                    "permissions": ['role.role.create', 'role.role.read'],
                                    "createdAt": "2024-03-29T08:01:38.446Z",
                                    "updatedAt": "2024-03-30T09:24:37.895Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Role created successfully',
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

export const getRoleByIdResponse = {
    tags: ['Roles'],
    description: `This api is used to fetch a Role with its Id. \n
    Permission required - ['role.role.read']`,
    summary: 'Get a Role by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'roleId',
            required: true,
            description: 'Role Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '200': {
            description: 'Role fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "660675629e74c518118a16f0",
                                    "name": "SUPER ADMIN",
                                    "isSuperAdmin": true,
                                    "permissions": ['role.role.create', 'role.role.read'],
                                    "createdAt": "2024-03-29T08:01:38.446Z",
                                    "updatedAt": "2024-03-30T09:24:37.895Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Role fetched',
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

export const getSelfPermissionsResponse = {
    tags: ['Roles'],
    description: `This api is used to fetch permissions of the logged in user \n
    Permission required - []`,
    summary: 'Get logged-in user permissions',
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        '200': {
            description: 'Role fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'array',
                                example: ['role.role.create', 'role.role.read'],
                                message: {
                                    type: 'string',
                                    example: 'Permissions fetched',
                                },
                                errors: {
                                    type: 'array',
                                    example: []
                                }
                            },
                        },
                    },
                },
            }
        },
        '401': UnauthorisedResponse,
        '500': internalServerErrorResponse,
    },
};

export const getAllRolesResponse = {
    tags: ['Roles'],
    description: `This api is used to fetch all Roles \n
    Permission required - ['role.role.read']`,
    summary: 'Fetch all Roles',
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        '200': {
            description: 'Roles fetched successfully',
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
                                        "name": "SUPER ADMIN",
                                        "isSuperAdmin": true,
                                        "permissions": ['role.role.create', 'role.role.read'],
                                        "createdAt": "2024-03-29T08:01:38.446Z",
                                        "updatedAt": "2024-03-30T09:24:37.895Z"
                                    }
                                ]
                            },
                            message: {
                                type: 'string',
                                example: "Roles fetched"
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

export const updateRoleByIdResponse = {
    tags: ['Roles'],
    description: `This api is used to update Role details by its Id. \n
    Permission required - ['role.role.update']`,
    summary: 'Update a Role',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'roleId',
            required: true,
            description: 'Role Id',
            schema: {
                type: 'string'
            }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createRoleBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Role updated successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "660675629e74c518118a16f0",
                                    "name": "SUPER ADMIN",
                                    "isSuperAdmin": true,
                                    "permissions": ['role.role.create', 'role.role.read'],
                                    "createdAt": "2024-03-29T08:01:38.446Z",
                                    "updatedAt": "2024-03-30T09:24:37.895Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Role Updated successfully',
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

export const deleteRoleByIdResponse = {
    tags: ['Roles'],
    description: `This api is used to delete a Role with its Id. \n
    Permission required - ['Role.Role.delete']`,
    summary: 'Delete a Role by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'roleId',
            required: true,
            description: 'Role Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '202': {
            description: 'Role deleted successfully',
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
                                example: 'Role deleted',
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
export const createRoleBody = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'Test',
        },
        isSuperAdmin: {
            type: 'boolean',
            example: false,
        },
        permissions: {
            type: 'array',
            example: ['role.role.read']
        }
    },
};
