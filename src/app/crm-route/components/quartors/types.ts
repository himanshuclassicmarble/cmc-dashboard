// types.ts
export type Metric = {
  label: string;
  unit: string;
  value: number;
};

export interface QuartorData {
  table: string;
  tgt_qty: Metric;
  act_qty: Metric;
  qty_ach?: Metric; // Made optional
  tgt_rev: Metric;
  act_rev: Metric;
  rev_ach?: Metric; // Made optional
  tgt_avg: Metric;
  act_avg: Metric;
}

export interface LGDataCardProps {
  quartorToYear: QuartorData[];
}

export interface QualityCardProps {
  lgData: QuartorData[];
}
