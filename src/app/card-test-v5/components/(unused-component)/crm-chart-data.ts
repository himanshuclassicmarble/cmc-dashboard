import { CRMChartDataItem } from "./crm-chart-types"

export const sampleCRMData: CRMChartDataItem[] = [
  { day: "00-07", leads: { leadQuantity: 25, leadNumbers: 2.5 }, opportunities: { oppQuantity: 8, oppNumbers: 1.2 } },
  { day: "08-15", leads: { leadQuantity: 32, leadNumbers: 3.1 }, opportunities: { oppQuantity: 12, oppNumbers: 2.0 } },
  { day: "15-30", leads: { leadQuantity: 28, leadNumbers: 2.8 }, opportunities: { oppQuantity: 15, oppNumbers: 2.5 } },
  { day: "31-60", leads: { leadQuantity: 35, leadNumbers: 3.6 }, opportunities: { oppQuantity: 18, oppNumbers: 3.1 } },
  { day: "61-90", leads: { leadQuantity: 30, leadNumbers: 2.9 }, opportunities: { oppQuantity: 14, oppNumbers: 2.3 } },
  { day: "91-180", leads: { leadQuantity: 22, leadNumbers: 2.0 }, opportunities: { oppQuantity: 9, oppNumbers: 1.4 } },
  { day: "180-Abv", leads: { leadQuantity: 20, leadNumbers: 1.8 }, opportunities: { oppQuantity: 7, oppNumbers: 1.1 } },
]