import prisma from "@repo/db/client";
import cron from "node-cron";
import { publishBatchToQueue } from "./rabbitmq";

const MIN_CHECK_INTERVAL = 1000 * 60 * 5;

export const startScheduler = () => {
    // Every 5 minutes
    cron.schedule("*/5 * * * *", async () => {
        try {
            const websites = await prisma.website.findMany({
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
                            },
                        },
                    ]
                },
                select: {
                    id: true,
                    url: true,
                    timeAdded: true,
                    name: true,
                    user: {
                        select: {
                            email: true,
                            id: true,
                        }
                    },
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

            if (websites.length > 0) {
                const messages = websites.map(website => ({
                    websiteId: website.id,
                    url: website.url,
                    userEmail: website.user.email,
                    userId: website.user.id,
                    name: website.name,
                    previousStatus: website.websiteTicks[0]?.status || null
                }));
                await publishBatchToQueue(messages);
                console.log(`Scheduled ${websites.length} websites for monitoring`);
            }

        } catch (error) {
            console.error('Scheduler error:', error);
        }
    });
}