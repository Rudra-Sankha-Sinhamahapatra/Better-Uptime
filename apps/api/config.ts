import dotenv from "dotenv";

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 3001,
  },
  rabbitmq: {
   queueName: "website_monitoring",
   rabbitMqUrl: process.env.AMQP_URL,
  },
}