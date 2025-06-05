import { WebsiteStatus } from "@repo/db/client";

export interface MonitoringResult {
    responseTimeMs: number;
    status: WebsiteStatus;
}