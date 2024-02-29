import nodemailer from 'nodemailer';
import { ConfigData } from '../config/config.js';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFile } from 'fs/promises';
import { UnprocessableEntityException } from '../exceptions.js';

export async function sendEmail(mailTo, subject, templateName, context) {
    const templateFileName = `${templateName}.ejs`;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const templatePath = path.join(__dirname, '../templates', templateFileName);
    const templateContent = await readFile(templatePath, 'utf-8')
    const mailerDsn = ConfigData.mail.dsn;
    const transporter = nodemailer.createTransport(mailerDsn);
    const html = ejs.render(templateContent, context);
    const mailOptions = {
        from: ConfigData.mail.from,
        to: mailTo,
        subject: subject,
        html: html,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new UnprocessableEntityException('Failed to send mail');
        }
        console.log(`Email sent: ${info.response}`);
    });
}