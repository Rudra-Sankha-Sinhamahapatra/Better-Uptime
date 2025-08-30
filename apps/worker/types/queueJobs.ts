import type { WebsiteStatus } from "@repo/db/client";

export interface EmailJob {
    to: string;
    subject: string;
    text: string;
    websiteUrl?: string;
    status: 'down' | 'up' | 'contact'
    retries?: number
}

export interface DbJob {
    websiteId: string;
    responseTimeMs: number;
    status: WebsiteStatus;
    regionId: string;
    userEmail: string;
    url: string;
    previousStatus?: WebsiteStatus;
    retries?: number;
}
