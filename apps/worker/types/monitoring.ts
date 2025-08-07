import { WebsiteStatus } from "@repo/db/client";

export interface MonitoringResult {
    responseTimeMs: number;
    status: WebsiteStatus;
}
export interface Region {
    id:string,
    name: string
}