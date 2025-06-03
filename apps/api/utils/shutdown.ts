import { closeQueue } from "../services/rabbitmq";

let isShuttingDown = false;

export const shutdown = async () => {
    try {
        if(isShuttingDown) {
            console.log("Shutdown already in progress");
            return;
        }
    isShuttingDown = true;
    console.log("\n Starting graceful shutdown..");

      console.log("Shutting down server");
      await closeQueue();
      console.log("Graceful shutdown complete");
      process.exit(0);
    } catch (error) {
      console.error("Failed to connect to RabbitMQ", error);
      process.exit(0);
    }
  }
  