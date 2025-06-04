import express from "express";
import cors from "cors";
import { allWebsites, createWebsite, getWebsiteById } from "./controllers/website";
import { connectToRabbitMQ } from "./services/rabbitmq";
import { config } from "./config";
import { shutdown } from "./utils/shutdown";
import { queueHealth } from "./controllers/queue";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/queue-health", queueHealth);

app.get("/website", allWebsites);

app.post("/website", createWebsite);

app.get("/website/:websiteId", getWebsiteById);

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("uncaughtException",  (error)=> {
  console.error("Uncaught Exception: ", error);
  shutdown();
});

const startServer = async () => {
  try {
    await connectToRabbitMQ();

    app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();