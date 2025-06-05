import amqp from "amqplib";
import { config } from "./config";
import { checkWebsite } from "./monitoring";
import prisma, { WebsiteStatus } from "@repo/db/client";
import type { AmqpChannel, AmqpConnection } from "./types/amqp";


let connection: AmqpConnection | null = null;
let channel: AmqpChannel | null = null;


const closeWorker = async () => {
    try {
        if(channel && !channel.close) { 
            console.log("Closing channel");
            await channel.close();
            console.log("Channel closed");
        }
        if(connection && !connection.close) {
            console.log("Closing connection");
            await connection.close();
            console.log("Connection closed");
        }
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
      
      await channel.assertQueue(config.rabbitmq.queueName, {
        durable: true,
      });

      console.log("Worker ready to process messages");

      channel.consume(config.rabbitmq.queueName, async (message) => {
        if(!message) return;

        try {
            const data = JSON.parse(message.content.toString());
            console.log("Processing message", {
                websiteId: data.websiteId,
                url: data.url
            });

            const defaultRegion = await prisma.region.findFirst();
            if (!defaultRegion) {
                throw new Error("No regions configured");
            }

            const result = await checkWebsite(data.url);
            const tick = await prisma.websiteTick.create({
                data: {
                    response_time_ms:result.responseTimeMs,
                    status: result.status,
                    regionId: defaultRegion.id,
                    websiteId:data.websiteId
                }
            });

            if(result.status === WebsiteStatus.Down) {
                console.log(`Check completed for ${data.url} with status ${result.status}, result: `,result);
                // Will send an email to the user
            }

            console.log(`Check completed for ${data.url}:`, result);
            channel.ack(message);
        } catch (error) {
            console.error("Error processing message",error);
            channel.nack(message,false,false);
        }
      });

      process.on("SIGINT",async ()=> {
        console.log("\nStarting graceful shutdown...");
        await closeWorker();
        console.log("Graceful shutdown complete");
        process.exit(0);
      })
    } catch(error :any) {
        console.error("Failed to start worker",error);
        process.exit(1);
    }
}

startWorker();