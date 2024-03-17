import mongoose from "mongoose";
import { ConfigData } from "./src/config/config.js";
import roleModel from "./src/models/role-model.js";
import employeeModel from "./src/models/employee-model.js";
import { defaultRoles } from "./seed.data.js";

const connection = mongoose.connect(ConfigData.database.dsn)

connection
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => console.log('Error connecting database', err));

const seedDb = async () => {
    // Seed role
    await Promise.all(defaultRoles.map(async (role) => {
        await roleModel.updateOne({ name: role.name }, role, { upsert: true });
    }))
    console.log('Default roles seeded');

    // Seed superAdmin
    const superAdminRole = await roleModel.findOne({ name: 'SUPER ADMIN' });
    const superAdmin = {
        "firstName": "Super Admin",
        "username": "super_admin",
        "email": "superadmin@gmail.com",
        "password": "$2a$10$jC3k/hCLEK2l6g076ZfovuHx7lhLQi.d6J9FX41sJfNSVyNQfB5B.",
        "mobile": 1234567890,
        "role": superAdminRole._id.toString()
    }
    await employeeModel.updateOne({
        username: "super_admin",
        email: "superadmin@gmail.com",
    }, superAdmin, { upsert: true });
    console.log('Default super admin employee seeded');
}

seedDb().then(() => {
    mongoose.connection.close();
})

