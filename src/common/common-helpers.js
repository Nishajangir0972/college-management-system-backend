import * as fs from 'fs';

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


export const getDefaultApplicationPermissions = () => {
    fs.readFile('../permissions.json', 'utf8', (err, data) => {
        if (err) {
            throw new Error('Failed to access permission json file')
        }
        try {
            const jsonData = JSON.parse(data);
            return jsonData;
        } catch (error) {
            throw new Error('Failed to parse data from permission json file')
        }
    });
}

export const updateDefaultApplicationPermissions = (data) => {
    fs.writeFile('../permissions.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            throw new Error('Failed to write data in permission json file')
        }
        return  null;
    });
}

