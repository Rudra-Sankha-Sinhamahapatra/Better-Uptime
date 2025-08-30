import { config } from "../config";
import { sendEmail } from "./nodemailer";
import type { ContactFormEmailData } from "../types/contact";
import type { EmailJob } from "../types/queueJobs";
import { emailConsumer as consumer, producer } from "../lib/redis";

const QUEUE_NAME = 'email-notifications';
const MAX_RETRIES = 2;

export const queueEmail = async (emailData: EmailJob) => {
    const jobWithRetries = {...emailData, retries: 0};
    await producer.lpush(QUEUE_NAME, JSON.stringify(jobWithRetries));
    console.log(`Email job added to queue for ${emailData.to}`);
}

export const startEmailQueueProcessor = async () => {
        console.log("Starting simple Redis queue processor for email notifications");
        while(true) {
            try {
                const result = await consumer.brpop(QUEUE_NAME, 0);
                if(!result) continue;
                const job = JSON.parse(result[1]) as EmailJob & { retries?: number };
                job.retries = job.retries ?? 0;

                const { to, subject, text } = job;
            try {
                await sendEmail(to, subject, text);
                console.log(`Email sent successfully to ${to}`);
            } catch (error) {
                console.error(`Failed to send email to ${to}:`, error);
                if (job.retries < MAX_RETRIES) {
                    job.retries += 1;
                    await new Promise(res => setTimeout(res,1000 * job.retries!));
                    await producer.lpush(QUEUE_NAME, JSON.stringify(job));
                    console.log(`Re-emailed successfully to ${to}, retry: ${job.retries}`);
                } else {
                    console.error(`Email job failed to send to : ${to} failed after ${MAX_RETRIES} retries. Dropping job.`);
                }
                continue; 
            }
            } catch (error) {
            console.error("Error processing email job from Redis queue:", error);
        }
        }
}

export const queueDowntimeEmail = async (to: string, websiteUrl: string) => {
    console.log(`Queueing downtime email for ${to} - ${websiteUrl}`);
    return queueEmail({
        to,
        subject: `🔴 Website ${websiteUrl} is down`,
        text: `The website ${websiteUrl} is currently experiencing downtime. Our monitoring system detected this issue and we will notify you when it's back up.`,
        websiteUrl,
        status: 'down'
    });
};

export const queueUptimeEmail = async (to: string, websiteUrl: string) => {
    console.log(`Queueing uptime email for ${to} - ${websiteUrl}`);
    return queueEmail({
        to,
        subject: `✅ Website ${websiteUrl} is back up`,
        text: `Good news! The website ${websiteUrl} is back online and responding normally.`,
        websiteUrl,
        status: 'up'
    });
};

export const queueContactFormEmail = async (contactData: ContactFormEmailData) => {
    const ownerEmail = config.email.Emailuser;
    
    if (!ownerEmail) {
        throw new Error("Owner email not configured");
    }

    console.log(`Queueing contact form email for ${contactData.email} - ${contactData.queryType}`);
    
    const userInfo = contactData.isLoggedIn 
        ? `\n👤 Submitted Form Data:
- Name: ${contactData.name}
- Email: ${contactData.email}

🔐 Original Account Details:
- User ID: ${contactData.userId}
- Account Name: ${contactData.originalName || 'Not available'}
- Account Email: ${contactData.originalEmail || 'Not available'}
- Account Status: Logged in user`
        : `\n👤 User Info:
- Name: ${contactData.name}
- Email: ${contactData.email}
- Account Status: Anonymous user`;

    const emailContent = `
🎯 New Contact Form Submission

📝 Query Type: ${contactData.queryType}

💬 Message:
${contactData.query}
${userInfo}

📅 Submitted: ${new Date(contactData.submittedAt).toLocaleString()}

---
Please respond to: ${contactData.email}
`.trim();

    return queueEmail({
        to: ownerEmail,
        subject: `📨 New Contact Form: ${contactData.queryType} - ${contactData.name}`,
        text: emailContent,
        status: 'contact'
    });
};

export const closeEmailQueue = async () => {
    try {
        await producer.quit();
        await consumer.quit();
        console.log('Email queue (Redis) closed successfully');
    } catch (error) {
        console.error('Error closing email queue (Redis):', error);
    }
};