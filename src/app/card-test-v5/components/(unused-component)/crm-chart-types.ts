export type LeadMetricData = {
  leadQuantity: number
  leadNumbers: number
}

export type OpportunityMetricData = {
  oppQuantity: number
  oppNumbers: number
}

export type CrmMetricData = {
  leadQuantity: number
  leadNumbers: number
  oppQuantity: number
  oppNumbers: number
}

export type CRMChartDataItem = {
  day: string
  leads: LeadMetricData
  opportunities: OpportunityMetricData
}

export type TransformedDataPoint = {
  day: string
  leads: {
    quantity: number
    numbers: number
  }
  opportunities: {
    quantity: number
    numbers: number
  }
  id: string
}
