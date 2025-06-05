import prisma from "@repo/db/client";
import cron from "node-cron";
import { publishBatchToQueue } from "./rabbitmq";

const BATCH_SIZE = 100;
const STAGGER_INTERVALS = 6;
const MIN_CHECK_INTERVAL = 1000 * 60 * 5; 

export const startScheduler = () => {
    // Every 5 minutes
    cron.schedule("*/5 * * * *", async () => {
      try {
        const currentBatch = Math.floor(Date.now() / 1000) % STAGGER_INTERVALS;

        const websites = await prisma.website.findMany({
            take: BATCH_SIZE,
            skip: currentBatch * BATCH_SIZE,
            where: {
                OR: [
                    // Websites with no ticks
                    { websiteTicks: { none: {} } },
                   // Case 2: Latest tick is older than 5 minutes
                    {
                        websiteTicks: {
                            none: {
                                createdAt: {
                                    gte: new Date(Date.now() - MIN_CHECK_INTERVAL)
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                id: true,
                url: true,
                timeAdded: true,
                name: true,
                websiteTicks: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                }
            },
            orderBy: {
                timeAdded: "asc",
            },
        });

        if(websites.length > 0) {
            console.log(`Scheduling batch ${currentBatch}: ${websites.length} websites`);
            const messages = websites.map(website => ({
                websiteId: website.id,
                url: website.url,
                name: website.name
            }));
            await publishBatchToQueue(messages); 
            console.log(`Scheduled batch ${currentBatch}: ${websites.length} websites`);
        }
        
      } catch (error) {
        console.error('Scheduler error:', error);
      }
    });
}