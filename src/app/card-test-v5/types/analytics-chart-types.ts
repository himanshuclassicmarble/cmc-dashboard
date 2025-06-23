
export interface AnalyticsData {
  value: number;
  quantity: number;
}

export interface AnalyticsDataPoint {
  month: string;
  currentYear: AnalyticsData;
  previousYear: AnalyticsData;
  target: AnalyticsData;
}

export interface DataPoint {
  month: string;
  currentYear: number;
  previousYear: number;
  target: number;
  id: string;
}
