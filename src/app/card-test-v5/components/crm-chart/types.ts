export interface CrmDataPoint {
  name: string;
  counts: number;
  quantity: number;
  change: string;
  fill?: string;
}

export interface CrmDataProps {
  chartData: CrmDataPoint[];
}

export interface CRMCardProps {
  data: CrmDataPoint[];
}
