export type Metric = {
  label: string;
  unit: string;
  value: number;
};

export interface LeadGeneratorData {
  table: string;
  tgt_qty: Metric;
  act_qty: Metric;
  qty_ach: Metric;
  tgt_rev: Metric;
  act_rev: Metric;
  rev_ach: Metric;
  tgt_avg: Metric;
  act_avg: Metric;
}

export const Q2lgData: LeadGeneratorData[] = [
  {
    table: "Q2",
    tgt_qty: { label: "FT2", unit: "000", value: 410.2 },
    act_qty: { label: "FT2", unit: "000", value: 82.5 },
    qty_ach: { label: "", unit: "%", value: 20.1 },
    tgt_rev: { label: "", unit: "Cr", value: 18.5 },
    act_rev: { label: "", unit: "Cr", value: 3.1 },
    rev_ach: { label: "", unit: "%", value: 16.2 },
    tgt_avg: { label: "", unit: "", value: 451 },
    act_avg: { label: "", unit: "", value: 359 },
  },
];

export const Q2YlgData: LeadGeneratorData[] = [
  {
    table: "Year to Quarter",
    tgt_qty: { label: "FT2", unit: "000", value: 1640.8 },
    act_qty: { label: "FT2", unit: "000", value: 287.1 },
    qty_ach: { label: "", unit: "%", value: 17.5 },
    tgt_rev: { label: "", unit: "Cr", value: 74 },
    act_rev: { label: "", unit: "Cr", value: 10.02 },
    rev_ach: { label: "", unit: "%", value: 13.55 },
    tgt_avg: { label: "", unit: "", value: 451 },
    act_avg: { label: "", unit: "", value: 359 },
  },
];
