import nodemailer from "nodemailer";
import { config } from "../config";

export const transporter = nodemailer.createTransport({
   service:"gmail",
    auth: {
        user: config.email.Emailuser,
        pass: config.email.AppPass,
    },
});