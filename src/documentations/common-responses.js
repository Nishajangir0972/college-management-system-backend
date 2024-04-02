export const UnauthorisedResponse = {
    description: 'Unauthorised response',
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
                        example: "Access denied",
                    },
                    errors: {
                        type: 'string',
                        example: "Authentication failed"
                    }
                },
            },
        },
    },
};

export const ForbiddenResponse = {
    description: 'Forbidden response',
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
                        example: "Access denied",
                    },
                    errors: {
                        type: 'string',
                        example: "Not enough permissions"
                    }
                },
            },
        },
    },
};

export const NotFoundResponse = {
    description: 'Forbidden response',
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
                        example: "Not found message",
                    },
                    errors: {
                        type: 'string',
                        example: "not found error message"
                    }
                },
            },
        },
    },
};

export const badRequestResponse = {
    description: 'Bad requeest response',
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
                        example: 'Bad Request message',
                    },
                    errors: {
                        type: 'Array',
                        example: [
                            {
                                type: "field",
                                value: "",
                                msg: "Email is required",
                                path: "email",
                                location: "body"
                            },
                        ]
                    },
                },
            },
        },
    },
};

export const unprocessableEntityResponse = {
    description: 'Unprocessable entity response',
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
                        example: 'unprocessable entity message',
                    },
                    errors: {
                        type: 'Array',
                        example: [
                            {
                                "path": "studentId",
                                "msg": "Invalid id"
                            }
                        ]
                    },
                },
            },
        },
    },
};

export const internalServerErrorResponse = {
    description: 'Internal Server Error',
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
                        type: 'string',
                        example: 'Internal server error',
                    },
                },
            },
        },
    },
}