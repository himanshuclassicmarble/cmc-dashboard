"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, LabelList, ResponsiveContainer } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

import type {CRMChartDataItem, CrmMetricData, LeadMetricData, OpportunityMetricData} from "../../types/crm-chart-types"

interface CRMChartComponentProps {
  data: CRMChartDataItem[]
  totalLeads: LeadMetricData
  totalOpps: OpportunityMetricData
}

const crmChartConfig = {
  leads: {
    label: "Leads",
    color: "var(--chart-1)",
  },
  opportunities: {
    label: "Opportunities",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--foreground)",
  },
} satisfies ChartConfig

const formatNumber = (value: number, decimals = 0): string =>
    value.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

interface CRMTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    color: string
    dataKey: string
    payload: CrmMetricData
  }>
  label?: string
}

const CRMCustomTooltip = ({ active, payload, label }: CRMTooltipProps) => {
  if (active && payload && payload.length) {
    return (
        <div className="rounded-sm border bg-background p-2 shadow-none">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[10px]">CRM Performance</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center gap-1">
              <span className="text-[10px] text-muted-foreground">Day:</span>
              <span className="font-semibold text-[10px]">{label}</span>
            </div>
            {payload.map((entry, index) => (
                <div key={index} className="flex justify-between items-center gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                    <span className="text-[10px] text-muted-foreground">
                  {entry.dataKey === "leads" ? "Leads" : "Opportunities"}:
                </span>
                  </div>
                  <span className="font-semibold text-[10px]">{formatNumber(entry.value)}</span>
                </div>
            ))}
          </div>
        </div>
    )
  }
  return null
}

interface ChartDataPoint {
  day: string
  leads: number
  opportunities: number
  id: string
}

const Chart = ({ data }: { data: ChartDataPoint[] }) => {
  if (!data || data.length === 0) {
    return (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No chart data available</p>
        </div>
    )
  }

  return (
      <div className="w-full h-[90%]">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={crmChartConfig} className="h-full w-full">
            <BarChart
                data={data}
                layout="horizontal"
                margin={{ top: 15, right: 5, left: 5, bottom: 0 }}
                barCategoryGap={4}
                barGap={1}
            >
              <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.2} />
              <XAxis
                  dataKey="day"
                  type="category"
                  tickLine={false}
                  tickMargin={2}
                  axisLine={false}
                  tick={{
                    fill: "var(--muted-foreground)",
                    fontWeight: 500,
                    fontSize: 9,
                  }}
              />
              <YAxis type="number" hide />
              <ChartTooltip cursor={{ fill: "rgba(0, 0, 0, 0.03)" }} content={<CRMCustomTooltip />} />
              <Bar dataKey="leads" fill="var(--chart-1)" radius={[1, 1, 0, 0]}>
                <LabelList
                    dataKey="leads"
                    position="top"
                    offset={2}
                    className="fill-foreground font-medium"
                    fontSize={8}
                    formatter={(value: number) => formatNumber(value)}
                />
              </Bar>
              <Bar dataKey="opportunities" fill="var(--chart-2)" radius={[1, 1, 0, 0]} barSize={12}>
                <LabelList
                    dataKey="opportunities"
                    position="top"
                    offset={2}
                    className="fill-foreground font-semibold"
                    fontSize={8}
                    formatter={(value: number) => formatNumber(value)}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </div>
  )
}

export const CRMChartComponent: React.FC<CRMChartComponentProps> = ({ data, totalLeads, totalOpps }) => {
  const [activeTab, setActiveTab] = useState<"quantity" | "numbers">("quantity")

  const transformedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) {
      return []
    }

    return data
        .filter((item) => {
          if (!item || !item.day) return false
          if (!item.leads || typeof item.leads !== "object") return false
          if (!item.opportunities || typeof item.opportunities !== "object") return false
          return true
        })
        .map((item, index) => ({
          day: item.day,
          leads: {
            quantity: Number(item.leads.leadQuantity) || 0,
            numbers: Number(item.leads.leadNumbers) || 0,
          },
          opportunities: {
            quantity: Number(item.opportunities.oppQuantity) || 0,
            numbers: Number(item.opportunities.oppNumbers) || 0,
          },
          id: `${item.day}-${index}`,
        }))
  }, [data])

  const sanitizedTotals = useMemo(() => {
    return {
      leads: {
        quantity: Number(totalLeads?.leadQuantity) || 0,
        numbers: Number(totalLeads?.leadNumbers) || 0,
      },
      opportunities: {
        quantity: Number(totalOpps?.oppQuantity) || 0,
        numbers: Number(totalOpps?.oppNumbers) || 0,
      },
    }
  }, [totalLeads, totalOpps])

  const displayChartData = transformedData.map((item) => ({
    day: item.day,
    leads: item.leads[activeTab],
    opportunities: item.opportunities[activeTab],
    id: `${item.id}-${activeTab}`,
  }))

  if (!data || !Array.isArray(data) || transformedData.length === 0) {
    return (
        <Card className="w-full flex flex-col">
          <CardTitle className="px-4 pt-4 pb-2 border-b">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">CRM Data</h3>
            </div>
          </CardTitle>
          <CardContent className="flex-1 flex items-center justify-center p-4">
            <p className="text-sm text-muted-foreground">No data available</p>
          </CardContent>
        </Card>
    )
  }

  return (
      <Card className="w-full h-full p-2 gap-2 flex flex-col">
        <CardTitle className="px-0.5 border-b flex-shrink-0">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-base font-semibold">CRM Performance</h3>
          </div>
        </CardTitle>

        <CardContent className="flex-1 flex p-0 gap-2 min-h-0">
          <div className="w-1/4 flex flex-col gap-2 p-0 flex-shrink-0">
            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
                <span className="text-[10px] uppercase font-medium text-muted-foreground">Leads</span>
              </div>
              <div className="space-y-1">
                <div
                    className={`flex flex-col w-full justify-between text-xs border py-0.5 px-1.5 rounded-sm ${
                        activeTab === "quantity"
                            ? "border-[hsl(var(--chart-1))] bg-[hsl(var(--chart-1)_/_0.05)]"
                            : "border-border"
                    }`}
                >
                <span className="text-[10px] text-muted-foreground">
                  Quantity:
                </span>
                  <span className="font-semibold text-base">{formatNumber(sanitizedTotals.leads.quantity)} <span className="text-[8px] text-muted-foreground">Sq.ft</span></span>
                </div>
                <div
                    className={`flex flex-col w-full justify-between text-[10px] border py-0.5 px-1.5 rounded-sm ${
                        activeTab === "numbers"
                            ? "border-[hsl(var(--chart-1))] bg-[hsl(var(--chart-1)_/_0.05)]"
                            : "border-border"
                    }`}
                >
                  <span className="text-muted-foreground">Numbers:</span>
                  <span className="font-semibold text-base">{formatNumber(sanitizedTotals.leads.numbers)}</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
                <span className="text-[10px] uppercase font-medium text-muted-foreground">
                Opportunities
              </span>
              </div>
              <div className="space-y-1">
                <div
                    className={`flex flex-col w-full justify-between text-xs border py-0.5 px-1.5 rounded-sm ${
                        activeTab === "quantity"
                            ? "border-[hsl(var(--chart-2))] bg-[hsl(var(--chart-2)_/_0.05)]"
                            : "border-border"
                    }`}
                >
                <span className="text-[10px] text-muted-foreground">
                  Quantity:
                </span>
                  <span className="font-semibold text-base">{formatNumber(sanitizedTotals.opportunities.quantity)} <span className="text-[8px] text-muted-foreground">Sq.ft</span></span>
                </div>
                <div
                    className={`flex flex-col w-full justify-between text-[10px] border py-0.5 px-1.5 rounded-sm ${
                        activeTab === "numbers"
                            ? "border-[hsl(var(--chart-2))] bg-[hsl(var(--chart-2)_/_0.05)]"
                            : "border-border"
                    }`}
                >
                  <span className="text-muted-foreground">Numbers:</span>
                  <span className="font-semibold text-base">{formatNumber(sanitizedTotals.opportunities.numbers)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-l border-border"></div>

          <div className="flex-1 flex flex-col min-h-0">
            <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as "quantity" | "numbers")}
                className="flex-1 flex flex-col min-h-0"
            >
              <div className="flex items-center justify-between flex-shrink-0">
                <TabsList className="h-7 p-0.5 bg-muted/50">
                  <TabsTrigger value="numbers" className="text-xs">
                    Numbers
                  </TabsTrigger>
                  <TabsTrigger value="quantity" className="text-xs">
                    Quantity
                  </TabsTrigger>
                </TabsList>

              </div>

              <TabsContent value="quantity" className="flex-1 mt-0 min-h-0 p-0 gap-0">
                <div className="w-full border border-t"></div>

                <div className="flex items-center gap-3 p-2  text-[8px]">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--chart-1)" }} />
                    <span className="text-muted-foreground">Leads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--chart-2)" }} />
                    <span className="text-muted-foreground">Opportunities</span>
                  </div>
                </div>
                <Chart data={displayChartData} />
              </TabsContent>

              <TabsContent value="numbers" className="flex-1 mt-0 min-h-0 p-0 gap-0">
                <div className="w-full border border-t"></div>
                <div className="flex items-center gap-3 p-2  text-[8px]">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--chart-1)" }} />
                    <span className="text-muted-foreground">Leads</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "var(--chart-2)" }} />
                    <span className="text-muted-foreground">Opportunities</span>
                  </div>
                </div>
                <Chart data={displayChartData} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
  )
}
