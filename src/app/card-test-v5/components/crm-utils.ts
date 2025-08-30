
export type CRMRawData = {
  leads: number
  opportunity: number
  sales: number
}

export const calculateCRMChartData = (raw: CRMRawData) => {
  const { leads, opportunity, sales } = raw

  return [
    {
      name: "Leads",
      counts: leads,
      change: "100%",
      fill: "#3b82f6",
    },
    {
      name: "Opportunity",
      counts: opportunity,
      change: `${((opportunity / leads) * 100).toFixed(1)}%`,
      fill: "#f59e0b",
    },
    {
      name: "Sales",
      counts: sales,
      change: `${((sales / leads) * 100).toFixed(1)}%`,
      fill: "#10b981",
    },
  ]
}
