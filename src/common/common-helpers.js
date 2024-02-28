export const handleException = (res, message, error) => {
    const errors = Array.isArray(error.message)
        ? error.message
        : typeof error.message === 'string'
            ? error.message
            : [error.message];
    return res
        .status(error.status || 500)
        .json({ data: null, message: message, errors });
};