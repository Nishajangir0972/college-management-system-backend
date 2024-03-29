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