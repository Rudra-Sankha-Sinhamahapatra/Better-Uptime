import amqp from "amqplib";
import { config } from "./config";
import { checkWebsite } from "./monitoring";
import prisma, { WebsiteStatus } from "@repo/db/client";
import type { AmqpChannel, AmqpConnection } from "./types/amqp";
import { sendEmail } from "./services/nodemailer";


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
        if(!message) return;

        try {
            const data = JSON.parse(message.content.toString());
            console.log("Processing message", {
                websiteId: data.websiteId,
                url: data.url,
            });

            const result = await checkWebsite(data.url);
            if(!result) {
                console.error("No result from checkWebsite",data.url);
                channel.nack(message,false,false);
                return;
            }

            const tick = await prisma.websiteTick.create({
                data: {
                    response_time_ms:result.responseTimeMs,
                    status: result.status,
                    regionId: defaultRegion.id,
                    websiteId:data.websiteId
                }
            });
            const website = await prisma.website.findUnique({
                where: { id: data.websiteId },
                include: { user: true }
            });    

            if(!website) {
                console.error("Website not found",data.websiteId);
                channel.nack(message,false,false);
                return;
            }

            if(result.status === WebsiteStatus.Down) {
                console.log(`Check completed for ${data.url} with status ${result.status}, response status: ${result.responseStatus}, result: `,result);
                console.log("Sending email to, ",website.user.email);
                // Website is Down , send an email to the user
                await sendEmail(website.user.email,`Website ${data.url} is down`,`The website ${data.url} is down. Please check it.`);
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