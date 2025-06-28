import dotenv from "dotenv";

dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 3002,
  },
  rabbitmq: {
   queueName: "website_monitoring",
   rabbitMqUrl: process.env.AMQP_URL,
  },
  email: {
    Emailuser: process.env.EMAIL_USER,
    AppPass: process.env.EMAIL_PASSWORD,
  },
  redis: {
    redisURL: process.env.REDIS_URL || "redis://localhost:6379"
  }
}