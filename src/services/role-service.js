import roleModel from "../models/role-model.js";

class RoleService {
    constructor() { }

    createRole(roleData) {
        const newRole = new roleModel(roleData)
        return newRole.save();
    }

    findById(id) {
        return roleModel.findById(id);
    }

    findByname(name) {
        return roleModel.findOne({ name });
    }

    updateRole(id, roleData) {
        return roleModel.findByIdAndUpdate(id, { $set: roleData }, { new: true })
    }

    deleteRole(id) {
        return roleModel.findByIdAndDelete(id, { new: true })
    }
}

export default new RoleService();
