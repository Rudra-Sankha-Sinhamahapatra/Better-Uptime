import type { Channel, Message } from "amqplib";
import { checkWebsite } from "../monitoring";
import prisma, { WebsiteStatus } from "@repo/db/client";
import {  queueContactFormEmail } from "../services/emailQueue";
import { queueDbOperation } from "../services/dbQueue";
import type { Region } from "../types/monitoring";

export const processMessage = async (
    message: Message,
    channel: Channel,
    defaultRegion: Region,
): Promise<void> => {
    try {
       await new Promise(resolve => setTimeout(resolve, 100)); 
       
        const data = JSON.parse(message.content.toString());

        // contact form 
        if (data.type === 'contact_form') {
            console.log("Processing contact form message:", {
                name: data.data.name,
                email: data.data.email,
                queryType: data.data.queryType,
                isLoggedIn: data.data.isLoggedIn
            });

            await queueContactFormEmail(data.data);
            console.log("Contact form email queued successfully");
            channel.ack(message);
            return;
        }

        //  website monitoring messages 
        console.log("Processing website monitoring message", {
            websiteId: data.websiteId,
            url: data.url,
        });

        const [result, website, previousTick] = await Promise.all([
            checkWebsite(data.url),
            prisma.website.findUnique({
                where: { id: data.websiteId },
                include: { user: true }
            }),
            prisma.websiteTick.findFirst({
                where: { websiteId: data.websiteId },
                orderBy: { createdAt: 'desc' }
            })
        ]);

        if (!result) {
            console.error("No result from checkWebsite", data.url);
            channel.nack(message, false, false);
            return;
        }

        if (!website) {
            console.error("Website not found", data.websiteId);
            channel.nack(message, false, false);
            return;
        }

        await queueDbOperation({
            websiteId: data.websiteId,
            responseTimeMs: result.responseTimeMs,
            status: result.status,
            regionId: defaultRegion.id,
            userEmail: website.user.email,
            url: data.url,
            previousStatus: previousTick?.status as WebsiteStatus
        });

        console.log(`Check completed for ${data.url}:`, result);
        channel.ack(message);
    } catch (error) {
        console.error("Error processing message", error);
        channel.nack(message, false, false);
    }
}