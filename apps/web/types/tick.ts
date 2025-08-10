export type WebsiteTick = {
    id: string;
    response_time_ms: number;
    status: "Up" | "Down" | "Unknown";
    createdAt: string;
    regionId: string;
  };