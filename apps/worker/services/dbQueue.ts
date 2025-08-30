import prisma, { WebsiteStatus } from "@repo/db/client";
import { queueDowntimeEmail, queueUptimeEmail } from "./emailQueue";
import type { DbJob } from "../types/queueJobs";
import { dbConsumer as consumer, producer } from "../lib/redis";

const QUEUE_NAME = "db-operations";
const MAX_RETRIES = 3;

export const queueDbOperation = async (data: DbJob) => {
    const jobWithRetries = { ...data, retries: 0 };
    console.log("➡️ [queueDbOperation] About to lpush to Redis");
    await producer.lpush(QUEUE_NAME, JSON.stringify(jobWithRetries));
    console.log("✅ [queueDbOperation] lpush done");
};

export const startDbQueueProcessor = async () => {
    console.log("Starting simple redis queue processor for DB operations");

    while (true) {
        try {
            const result = await consumer.brpop(QUEUE_NAME, 0);
            if (!result) continue;
            const job = JSON.parse(result[1]) as DbJob & { retries?: number };
            job.retries = job.retries ?? 0;

            console.log(
                "Processing DB job for website",
                job.websiteId,
                "with status",
                job.status
            );
            const website = await prisma.website.findUnique({
                where: { id: job.websiteId },
                select: { id: true },
            });

            if (!website) {
                console.warn(`Website ${job.websiteId} no longer exists. Dropping job.`);
                continue;
            }

            try {
                await prisma.websiteTick.create({
                    data: {
                        response_time_ms: job.responseTimeMs,
                        status: job.status,
                        regionId: job.regionId,
                        websiteId: job.websiteId,
                    },
                });
            } catch (error) {
                console.error(
                    `Failed to push to db for websiteId: ${job.websiteId}`,
                    error
                );
                if (job.retries < MAX_RETRIES) {
                    job.retries += 1;
                    await new Promise((res) => setTimeout(res, 1000 * job.retries!));
                    await producer.lpush(QUEUE_NAME, JSON.stringify(job));
                    console.log(
                        `Re-queued job for websiteId: ${job.websiteId}, retry: ${job.retries}`
                    );
                } else {
                    console.error(
                        `Job for websiteId: ${job.websiteId} failed after ${MAX_RETRIES} retries. Dropping job.`
                    );
                }
                continue;
            }

            if (
                job.status === WebsiteStatus.Down &&
                job.previousStatus === WebsiteStatus.Up
            ) {
                await queueDowntimeEmail(job.userEmail, job.url);
            } else if (
                job.status === WebsiteStatus.Up &&
                job.previousStatus === WebsiteStatus.Down
            ) {
                await queueUptimeEmail(job.userEmail, job.url);
            }
        } catch (error) {
            console.error("Error processing DB job from Redis queue:", error);
        }
    }
};

export const closeDbQueue = async () => {
    try {
        await producer.quit();
        await consumer.quit();
        console.log("DB queue (Redis) closed successfully");
    } catch (error) {
        console.error("Error closing DB queue (Redis):", error);
    }
};