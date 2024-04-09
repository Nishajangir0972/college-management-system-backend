import { ForbiddenResponse, NotFoundResponse, UnauthorisedResponse, badRequestResponse, internalServerErrorResponse, unprocessableEntityResponse } from "./common-responses.js";

export const getProfileResponse = {
    tags: ['Profile'],
    description: `This api is used to fetch profile of the logged in user. \n
    Permission required - [ ]`,
    summary: 'Fetch logged-in user profile',
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        '200': {
            description: 'Profile fetched',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                example: {
                                    "_id": "6614b835d95be82ef83852a8",
                                    "firstName": "Babbar",
                                    "lastName": "Sher",
                                    "username": "employee",
                                    "fathersName": "Bheem Bahadur",
                                    "email": "employee@gmail.com",
                                    "mobile": 9876543210,
                                    "alternativeMobile": 1123456789,
                                    "dob": "2024-03-29T09:38:46.374Z",
                                    "department": {
                                        "_id": "6606a7e884ff854225614d36",
                                        "name": "BBA/BCA"
                                    },
                                    "bio": "Hello hiii",
                                    "role": {
                                        "_id": "6614b826d95be82ef83852a2",
                                        "name": "SUBJECT TEACHER"
                                    },
                                    "createdAt": "2024-04-09T03:38:29.803Z",
                                    "updatedAt": "2024-04-09T04:11:36.468Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Profile fetched',
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

export const updateProfileResponse = {
    tags: ['Profile'],
    description: `This api is used to update profile of the logged in user \n
    Permission required - [ ]`,
    summary: 'Update logged-in user profile',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/updateProfileBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Profile updated successfully',
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
                                    "username": "employee2",
                                    "fathersName": "Bheem Bahadur",
                                    "email": "employee2@gmail.com",
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
                                example: 'Profile Updated successfully',
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

export const changePasswordResponse = {
    tags: ['Profile'],
    description: `This api is used to change the password of the logged-in-user. \n
    Permission required - [ ]`,
    summary: 'Change password',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/changePasswordBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Password changed',
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
                                example: 'Password Updated successfully',
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


export const updateProfileBody = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            example: 'Babbar_01',
        },
        email: {
            type: 'string',
            example: 'employee@gmail.com',
        },
        mobile: {
            type: 'number',
            example: 9876543210,
        },
        alternativeMobile: {
            type: 'number',
            example: 1123456789,
        },
        bio: {
            type: 'string',
            example: 'Hello hii -- only valid for employee case',
        },
    },
};

export const changePasswordBody = {
    type: 'object',
    properties: {
        password: {
            type: 'string',
            example: 'password',
        },
        newPassword: {
            type: 'string',
            example: 'password@123',
        },
        cnfPassword: {
            type: 'string',
            example: 'password@123',
        },
    },
};