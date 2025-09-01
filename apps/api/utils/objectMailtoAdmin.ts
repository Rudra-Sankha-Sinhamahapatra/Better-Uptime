import { config } from "../config";
import { sendEmail } from "../services/nodemailer";


export async function objectAdminMail (subject: string,text: string) {
    try {
        const mailTo = config.email.Mailto || "";
        await sendEmail(mailTo,subject,text);
    } catch (error) {
        console.log('Failed ', error)
    }
}