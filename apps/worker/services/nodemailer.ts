import { config } from "../config";
import { transporter } from "../utils/transporter";


export const sendEmail = async (to: string,subject: string,text: string) => {
    const mailOptions = {
        from: config.email.Emailuser,
        to,
        subject,
        text,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email",error);
        throw error;
    }
}