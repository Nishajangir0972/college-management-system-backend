import roleModel from '../models/role-model.js';
import { UnauthorisedException, forbiddenException } from '../exceptions.js';
import { handleException } from '../common/common-helpers.js';

async function roleMiddleware(permission, req, res, next) {
    try {
        const roleId = req.user.role;
        const role = await roleModel.findById(roleId);
        if (role) {
            if (role.isSuperAdmin) {
                return next();
            }
            if (role.permissions.includes(permission)) {
                return next();
            }
            throw new forbiddenException('Not enough permissions')
        }
        else {
            throw new UnauthorisedException('Falied to fetch role')
        }
    } catch (error) {
        handleException(res, 'Access denied', error)
    }
};

export default roleMiddleware;