import amqp from "amqplib";
import type { Message } from "amqplib";
import { config } from "./config";
import prisma  from "@repo/db/client";
import type { AmqpChannel, AmqpConnection } from "./types/amqp";
import { closeEmailQueue } from "./services/emailQueue";
import { closeDbQueue } from "./services/dbQueue";
import { processMessage } from "./lib/processMessage";

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
        connection = await amqp.connect(config.rabbitmq.rabbitMqUrl as string);
        channel = await connection.createChannel();

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
            });
        }

        if (!channel) {
            throw new Error("Channel not created");
        }

        const activeChannel = channel;
        activeChannel.consume(config.rabbitmq.queueName, async (message: Message | null) => {
            if (!message) return;

            processMessage(message, activeChannel, defaultRegion);
        }, {
            noAck: false
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
};

startWorker();