import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { allWebsites, createWebsite, getWebsiteById, getWebsiteTicks } from "./controllers/website";
import { connectToRabbitMQ } from "./services/rabbitmq";
import { config } from "./config";
import { shutdown } from "./utils/shutdown";
import { queueHealth } from "./controllers/queue";
import { submitContactForm } from "./controllers/contact";
import { startScheduler } from "./services/scheduler";
import cookieParser from 'cookie-parser';


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-session', 'x-user-id', 'Cookie']
}));

app.get("/queue-health", queueHealth);

app.get("/website", allWebsites);

app.get("/website/:websiteId/ticks", getWebsiteTicks);

app.post("/website", createWebsite);

app.get("/website/:websiteId", getWebsiteById);

app.post("/contact", submitContactForm);

app.get("/",(req,res) => {
  res.status(200).json({
    message:"Healthy Server"
  })
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException",  (error)=> {
  console.error("Uncaught Exception: ", error);
  shutdown();
});

const startServer = async () => {
  try {
    await connectToRabbitMQ();

    await startScheduler();
    app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();