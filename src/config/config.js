import dotenv from 'dotenv'
dotenv.config();
import path from 'path';
const rootStorage = process.env.STORAGE || path.join(process.cwd(), 'storage');

export const ConfigData = {
    port: parseInt(process.env.PORT) || 3000,
    database: {
        dsn: process.env.MONGO_DSN || 'mongodb://localhost:27017/',
    },
    auth: {
        jwt: {
            secretKey: process.env.JWT_SECRET_KEY || 'demo',
            accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || 604800,
        },
    },
    mail: {
        dsn: process.env.MAILER_DSN || 'hihihi',
        from: process.env.MAIL_FROM || 'demo@gmail.com'
    }
    // storage: {
    //     root: rootStorage,
    //     filesystems: {
    //         tmp: path.join(rootStorage, 'tmp'),
    //     },
    // },
}