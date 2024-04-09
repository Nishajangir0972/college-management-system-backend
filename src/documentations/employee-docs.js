import { ForbiddenResponse, NotFoundResponse, UnauthorisedResponse, badRequestResponse, internalServerErrorResponse, unprocessableEntityResponse } from "./common-responses.js";

export const createEmployeeResponse = {
    tags: ['Employees'],
    description: `This api is used to create a new Employee. \n
    Permission required - ['employee.employee.create']`,
    summary: 'Create a Employee',
    security: [
        {
            bearerAuth: [],
        },
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/createEmployeeBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Employee created successfully',
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
                                    "username": "employee",
                                    "fathersName": "Bheem Bahadur",
                                    "email": "employee@gmail.com",
                                    "mobile": 9876543210,
                                    "alternativeMobile": 1123456789,
                                    "dob": "2024-03-29T09:38:46.374Z",
                                    "department": "6606a7e884ff854225614d36",
                                    "bio": "Hello hiii",
                                    "role": "660675629e74c518118a16f0",
                                    "_id": "660ad7604cdb5f1fa2a53d65",
                                    "createdAt": "2024-04-01T15:48:48.818Z",
                                    "updatedAt": "2024-04-01T15:48:48.818Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Employee created successfully',
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

export const getEmployeeByIdResponse = {
    tags: ['Employees'],
    description: `This api is used to fetch a Employee with its Id. \n
    Permission required - ['employee.employee.read']`,
    summary: 'Get a Employee by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'employeeId',
            required: true,
            description: 'Employee Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '200': {
            description: 'Employee fetched successfully',
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
                                    "updatedAt": "2024-04-09T03:38:29.803Z"
                                },
                            },
                            message: {
                                type: 'string',
                                example: 'Employee fetched',
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

export const getAllEmployeesResponse = {
    tags: ['Employees'],
    description: `This api is used to fetch all Employees in a paginated way \n
    Permission required - ['employee.employee.read']`,
    summary: 'Fetch all Employees',
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
            description: 'Employee fetched successfully',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'Object',
                                example: {
                                    "employees": [
                                        {
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
                                            "updatedAt": "2024-04-09T03:38:29.803Z"
                                        }
                                    ],
                                    "meta": {
                                        "total_records": 2,
                                        "page_total_records": 2,
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
                                example: "Employees fetched"
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

export const updateEmployeeByIdResponse = {
    tags: ['Employees'],
    description: `This api is used to update employee details by his Id. \n
    Permission required - ['employee.employee.update']`,
    summary: 'Update a employee',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'employeeId',
            required: true,
            description: 'Employee Id',
            schema: {
                type: 'string'
            }
        }
    ],
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/updateEmployeeDataByIdBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '202': {
            description: 'Employee updated successfully',
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
                                example: 'Employee Updated successfully',
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

export const deleteEmployeeByIdResponse = {
    tags: ['Employees'],
    description: `This api is used to delete a employee with its Id. \n
    Permission required - ['employee.employee.delete']`,
    summary: 'Delete a employee by Id',
    security: [
        {
            bearerAuth: [],
        },
    ],
    parameters: [
        {
            in: 'path',
            name: 'employeeId',
            required: true,
            description: 'Employee Id',
            schema: {
                type: 'string'
            }
        }
    ],
    responses: {
        '202': {
            description: 'Employee deleted successfully',
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
                                example: 'Employee deleted',
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
export const createEmployeeBody = {
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
            example: 'employee@gmail.com',
        },
        dob: {
            type: 'string',
            example: '2024-03-29T09:38:46.374+00:00',
        },
        department: {
            type: 'string',
            example: '6606a7e884ff854225614d36',
        },
        bio: {
            type: 'string',
            example: 'Hello hiii',
        },
        role: {
            type: 'string',
            example: '6606a7e884ff854225614d36',
        },
    },
};

export const updateEmployeeDataByIdBody = {
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
            example: 'employee@gmail.com',
        },
        dob: {
            type: 'string',
            example: '2024-03-29T09:38:46.374+00:00',
        },
        department: {
            type: 'string',
            example: '6606a7e884ff854225614d36',
        },
        bio: {
            type: 'string',
            example: 'Hello hiii',
        },
        role: {
            type: 'string',
            example: '6606a7e884ff854225614d36',
        },
    },
};
