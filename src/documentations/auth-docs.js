import { badRequestResponse, internalServerErrorResponse } from "./common-responses.js";

export const studentLoginResponse = {
    tags: ['Auth'],
    description: 'Login for student',
    summary: 'Student Login',
    operationId: 'studentLogin',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/AuthLoginBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '400': badRequestResponse,
        '401': {
            description: 'Unauthorised Login',
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
                                example: 'Login failed',
                            },
                            errors: {
                                type: 'Array',
                                example: [{
                                    path: "email",
                                    msg: "Invalid email"
                                }],
                            },
                        },
                    },
                },
            },
        },
        '500': internalServerErrorResponse,
    },
};


export const employeeLoginResponse = {
    tags: ['Auth'],
    description: 'Login for Employee',
    summary: 'Employee login',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/AuthEmployeeLoginBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful login',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            "data": {
                                type: 'object',
                                example: {
                                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDY3NTYyOWU3NGM1MTgxMThhMTZmNCIsIm5hbWUiOiJTdXBlciBBZG1pbiIsInVzZXJuYW1lIjoic3VwZXJfYWRtaW4iLCJyb2xlIjoiNjYwNjc1NjI5ZTc0YzUxODExOGExNmYwIiwiaWF0IjoxNzExNjk5MzU0LCJleHAiOjE3MTIzNDAxNTR9.g8hMRzW3wDbki9dXuPnBQRkii19hI5afBELpzDNehDs",
                                    "tokenType": "Bearer Token",
                                    "expiresIn": "640800s"
                                },
                            },
                            "message": {
                                type: 'string',
                                example: "Loggin successful",
                            },
                            "errors": {
                                type: 'Array',
                                example: [],
                            },
                        },
                    },
                },
            },
        },
        '400': badRequestResponse,
        '401': {
            description: 'Unauthorised Login',
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
                                example: 'Login failed',
                            },
                            errors: {
                                type: 'Array',
                                example: [{
                                    path: "email",
                                    msg: "Invalid email"
                                }],
                            },
                        },
                    },
                },
            },
        },
        '500': internalServerErrorResponse,
    },
};


export const studentPasswordResetRequestResponse = {
    tags: ['Auth'],
    description: 'This api will be used to send an password reset request for a student. After this he will receive a password reset email on his registered email',
    summary: 'Password reset request api for student',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/passwordResetRequestBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Password reset email sent',
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
                                example: 'Password reset email sent',
                            },
                            errors: {
                                type: 'Array',
                                example: []
                            },
                        },
                    },
                },
            },
        },
        '400': badRequestResponse,
        '500': internalServerErrorResponse,
    },
};


export const studentPasswordResetResponse = {
    tags: ['Auth'],
    description: 'This api will be used to set new password for the related account via a token',
    summary: 'Password reset api for student',
    parameters: [
        {
            in: 'path',
            name: 'resetPasswordToken',
            required: true,
            description: 'Password reset Token',
            schema: {
                type: 'string'
            }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/resetPasswordBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Password Successfully Updated',
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
                                example: 'Password Successfully Updated',
                            },
                            errors: {
                                type: 'Array',
                                example: []
                            },
                        },
                    },
                },
            },
        },
        '400': badRequestResponse,
        '500': internalServerErrorResponse,
    },
};


export const employeePasswordResetRequestResponse = {
    tags: ['Auth'],
    description: 'This api will be used to send an password reset request for employee. After this he will receive a password reset email on his registered email',
    summary: 'Password reset request api for employee',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/passwordResetRequestBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Password reset email sent',
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
                                example: 'Password reset email sent',
                            },
                            errors: {
                                type: 'Array',
                                example: []
                            },
                        },
                    },
                },
            },
        },
        '400': badRequestResponse,
        '500': internalServerErrorResponse,
    },
};


export const employeePasswordResetResponse = {
    tags: ['Auth'],
    description: 'This api will be used to set new password for the related account via a token',
    summary: 'Password reset api for Employee',
    parameters: [
        {
            in: 'path',
            name: 'resetPasswordToken',
            required: true,
            description: 'Password reset Token',
            schema: {
                type: 'string'
            }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/resetPasswordBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Password Successfully Updated',
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
                                example: 'Password Successfully Updated',
                            },
                            errors: {
                                type: 'Array',
                                example: []
                            },
                        },
                    },
                },
            },
        },
        '400': badRequestResponse,
        '500': internalServerErrorResponse,
    },
};


/*------------------Body-Schemas-------------------------*/

export const AuthLoginBody = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            example: 'superadmin@gmail.com',
        },
        password: {
            type: 'string',
            description: "unencrypted password",
            example: 'password',
        },
    },
};

export const AuthEmployeeLoginBody = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            example: 'superadmin@gmail.com',
        },
        password: {
            type: 'string',
            description: "unencrypted password",
            example: 'password',
        },
    },
};

export const passwordResetRequestBody = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            required: true,
            example: 'superadmin@gmail.com',
        },
    },
}

export const resetPasswordBody = {
    type: 'object',
    properties: {
        newPassword: {
            type: 'string',
            required: true,
            example: 'password@123',
        },
        cnfPassword: {
            type: 'string',
            required: true,
            example: 'password@123',
        },
    },
}