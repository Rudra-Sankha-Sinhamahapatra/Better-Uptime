export type Website = {
    id: string;
    name: string;
    url: string;
    timeAdded: string;
    latestTick?: {
      status: 'Up' | 'Down' | 'Unknown';
      response_time_ms: number;
      createdAt: string;
    }
  }

  export interface AddWebsiteProps {
    onWebsiteAdded?: () => Promise<void>;
}
