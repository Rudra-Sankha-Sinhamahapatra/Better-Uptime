import Queue  from "bull";
import { config } from "../config";
import { sendEmail } from "./nodemailer";
import type { ContactFormEmailData } from "../types/contact";

interface EmailJob {
    to: string;
    subject: string;
    text: string;
    websiteUrl?: string;
    status: 'down' | 'up' | 'contact'
    retries?: number
}


const emailQueue = new Queue<EmailJob>('email-notifications',config.redis.redisURL, {
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000
        },
        removeOnComplete: true,
        removeOnFail: false
    }
})

emailQueue.process(async (job) => {
    const { to,subject,text } = job.data;

    try {
        await sendEmail(to,subject,text);
        console.log(`Email sent successfully to ${to}`);
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error);
        throw error; 
    }
})

emailQueue.on('failed', (job,error) => {
    console.error(`Job ${job.id} failed after ${job.opts.attempts} attempts:`, error);
})

export const queueEmail = async (emailData: EmailJob) => {
    try {
        const job = await emailQueue.add(emailData, {
            priority: emailData.status === 'down' ? 1 : emailData.status === 'contact' ? 2 : 3
        })
        console.log(`Email job ${job.id} added to queue`);
        return job;
    } catch (error) {
        console.error('Failed to add email to queue:', error);
        throw error;
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
        await emailQueue.close();
        console.log('Email queue closed successfully');
    } catch (error) {
        console.error('Error closing email queue:', error);
    }
};