import amqp from "amqplib";
import { config } from "../config";
import type { AmqpChannel, AmqpConnection } from "../types/amqp";


let connection: AmqpConnection | null = null;
let channel: AmqpChannel | null = null;

export async function connectToRabbitMQ() {
    try {
        if(connection && channel) {
            console.log("Connection & channel already established");
            return true;
        }

        connection = await amqp.connect(config.rabbitmq.rabbitMqUrl as string);

        connection.on('error', (err) => {
            console.error('🔴 RabbitMQ Connection Error:', err);
            channel = null;
        });

        connection.on('close', () => {
            console.log('🔴 RabbitMQ Connection Closed');
            channel = null;
        });
        
        channel = await connection.createChannel();

        channel.on('error', (err) => {
            console.error('🔴 RabbitMQ Channel Error:', err);
        });

        channel.on('close', () => {
            console.log('🔴 RabbitMQ Channel Closed');
        });

        await channel.assertQueue(config.rabbitmq.queueName, {
            durable: true 
        });

        console.log("Channel Created");
        console.log("Queue Connection Established");
        return true;
    } catch (error) {
        console.error("Failed to initialize RabbitMQ connection ", error);
       await closeQueue();
        throw error;
    }
}

export const closeQueue = async () => {
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
        console.log("Error closing queue: ",error)
    } finally {
        channel = null;
        connection = null;
    }
}