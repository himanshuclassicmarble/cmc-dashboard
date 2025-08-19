export type HoldSoldDataItem = {
  day: string;
  sold: number;
};

export type HoldSoldData = HoldSoldDataItem[];

export type TotalHeld = {
  holdQuantity: number;
  holdNumbers: number;
};

export type TotalSold = {
  soldQuantity: number;
  soldNumbers: number;
};

export interface ChartDataItem {
  day: string;
  totStock: number;
  soldStock: number;
  holdStock: number;
}

export interface HoldSoldChartProps {
  totalHeld: TotalHeld;
  totalSold: TotalSold;
  chartData: ChartDataItem[];
  title?: string;
  subtitle?: string;
}
