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
  email: {
    Emailuser: process.env.EMAIL_USER,
    AppPass: process.env.EMAIL_PASSWORD,
    Mailto: process.env.MAIL_TO
  },
}