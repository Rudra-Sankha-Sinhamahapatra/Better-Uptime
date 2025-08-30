import Redis  from "ioredis"
import { config } from "../config"

const REDIS_URL = config.redis.redisURL;

const redisOptions = REDIS_URL.startsWith('rediss://')
  ? { tls: { rejectUnauthorized: false } }
  : {};

export const producer = new Redis(REDIS_URL, redisOptions);
export const dbConsumer = new Redis(REDIS_URL, redisOptions);
export const emailConsumer = new Redis(REDIS_URL, redisOptions);

producer.on("connect", () => {
    console.log("Redis subscriber connected");
});

producer.on("error", (error) => {
    console.error("Redis subscriber error:", error);
});

 dbConsumer.on("connect", () => {
    console.log("Redis subscriber connected");
});

 dbConsumer.on("error", (error) => {
    console.error("Redis subscriber error:", error);
});

 emailConsumer.on("connect", () => {
    console.log("Redis subscriber connected");
});

 emailConsumer.on("error", (error) => {
    console.error("Redis subscriber error:", error);
});