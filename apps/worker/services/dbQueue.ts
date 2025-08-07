import Queue  from "bull";
import { config } from "../config";
import prisma, { WebsiteStatus } from "@repo/db/client";
import { queueDowntimeEmail, queueUptimeEmail } from "./emailQueue";

interface DbJob {
    websiteId: string;
    responseTimeMs: number;
    status: WebsiteStatus;
    regionId: string;
    userEmail: string;
    url: string;
    previousStatus?: WebsiteStatus;
}

const REDIS_URL = config.redis.redisURL;

if (!REDIS_URL) {
    throw new Error("Redis URL is not defined in the configuration");
}
const dbQueue = new Queue<DbJob>('db-operations', REDIS_URL, {
    defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 3,
        removeOnFail: 10,
    },
});

dbQueue.process(async (job) => {
    const { websiteId, responseTimeMs, status, regionId, userEmail, url, previousStatus } = job.data;
   console.log(`Processing DB job for website ${websiteId} with status ${status}`);
    try {
    await prisma.websiteTick.create({
        data: {
            response_time_ms: responseTimeMs,
            status,
            regionId,
            websiteId
        }
    });
    } catch(error) {
        console.error('Failed to push to db');
        throw error; 
    }
if(status === WebsiteStatus.Down && previousStatus === WebsiteStatus.Up) {
    await queueDowntimeEmail(userEmail, url);
} else if(status === WebsiteStatus.Up && previousStatus === WebsiteStatus.Down) {
     await queueUptimeEmail(userEmail, url);
}
});

export const queueDbOperation = async (data: DbJob) => {
    return dbQueue.add(data);
}

export const closeDbQueue = async () => {
    await dbQueue.close();
}