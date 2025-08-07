import amqp from "amqplib";
import { config } from "./config";
import { checkWebsite } from "./monitoring";
import prisma, { WebsiteStatus } from "@repo/db/client";
import type { AmqpChannel, AmqpConnection } from "./types/amqp";
import { closeEmailQueue, queueDowntimeEmail, queueUptimeEmail, queueContactFormEmail } from "./services/emailQueue";
import { closeDbQueue, queueDbOperation } from "./services/dbQueue";


let connection: AmqpConnection | null = null;
let channel: AmqpChannel | null = null;


const closeWorker = async () => {
    try {
        if (channel && !channel.close) {
            console.log("Closing channel");
            await channel.close();
            console.log("Channel closed");
        }
        if (connection && !connection.close) {
            console.log("Closing connection");
            await connection.close();
            console.log("Connection closed");
        }

        await closeEmailQueue();
        await closeDbQueue();
    } catch (error) {
        console.log("Error closing worker connections:", error);
    } finally {
        channel = null;
        connection = null;
    }
}

const startWorker = async () => {
    try {
        const connection = await amqp.connect(config.rabbitmq.rabbitMqUrl as string);
        const channel = await connection.createChannel();

        await channel.prefetch(10);

        await channel.assertQueue(config.rabbitmq.queueName, {
            durable: true,
        });

        console.log("Worker ready to process messages");

        let defaultRegion = await prisma.region.findFirst();
        if (!defaultRegion) {
            defaultRegion = await prisma.region.create({
                data: {
                    name: "Mumbai,India",
                }
            })
        }

        channel.consume(config.rabbitmq.queueName, async (message) => {
            if (!message) return;

            try {
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

                const result = await checkWebsite(data.url);
                if (!result) {
                    console.error("No result from checkWebsite", data.url);
                    channel.nack(message, false, false);
                    return;
                }

                const [website, previousTick] = await Promise.all([
                    prisma.website.findUnique({
                        where: { id: data.websiteId },
                        include: { user: true }
                    }),
                    prisma.websiteTick.findFirst({
                        where: { websiteId: data.websiteId },
                        orderBy: { createdAt: 'desc' }
                    })
                ]);

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
                    userEmail:  website.user.email,
                    url: data.url,
                    previousStatus: previousTick?.status as WebsiteStatus
                })
                console.log(`Check completed for ${data.url}:`, result);
                channel.ack(message);
            } catch (error) {
                console.error("Error processing message", error);
                channel.nack(message, false, false);
            }
        });

        process.on("SIGINT", async () => {
            console.log("\nStarting graceful shutdown...");
            await closeWorker();
            console.log("Graceful shutdown complete");
            process.exit(0);
        })

        process.on("SIGTERM", async () => {
            console.log("\nReceived SIGTERM. Starting graceful shutdown...");
            await closeWorker();
            console.log("Graceful shutdown complete");
            process.exit(0);
        });

        process.on("uncaughtException", async (error) => {
            console.error("Uncaught Exception:", error);
            await closeWorker();
            process.exit(1);
        });

        process.on("unhandledRejection", async (reason, promise) => {
            console.error("Unhandled Rejection at:", promise, "reason:", reason);
            await closeWorker();
            process.exit(1);
        });
    } catch (error: any) {
        console.error("Failed to start worker", error);
        process.exit(1);
    }
}

startWorker();