import { WebsiteTick } from "./tick";

export type TimePeriod = "24h" | "7d" | "30d";

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ChartDataPoint;
    value?: number;
  }>;
}

export interface StatusTooltipProps extends TooltipProps {
  period: TimePeriod;
}

export interface LineTooltipProps extends TooltipProps {
  period: TimePeriod;
}

export interface ChartDataPoint {
  time: string;
  fullTime: string;
  ms?: number;
  value?: number;
  fill?: string;
  count?: number;
  upCount?: number;
  downCount?: number;
  status?: WebsiteTick["status"];
  index?: number;
}