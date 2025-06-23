"use client"
import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users } from "lucide-react"

// Types based on your CRM data structure
interface LeadMetricData {
  leadQuantity: number
  leadNumbers: number
}

interface OpportunityMetricData {
  oppQuantity: number
  oppNumbers: number
}

interface CRMCardProps {
  totalLeads: LeadMetricData
  totalOpps: OpportunityMetricData
  title?: string
  subtitle?: string
}

// Utility functions
const formatValue = (value: number, decimals = 0): string =>
  value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

// Mobile CRM Card Component
interface MobileCRMCardProps {
  totalLeads: LeadMetricData
  totalOpps: OpportunityMetricData
  title: string
  subtitle: string
}

const MobileCRMCard: React.FC<MobileCRMCardProps> = ({ totalLeads, totalOpps, title, subtitle }) => {
  return (
    <Card className="w-full h-20">
      <CardContent className="p-3 flex items-center justify-between h-full gap-2">
        {/* Left Section - Leads */}
        <div className="flex flex-col justify-center min-w-0 flex-1 gap-1">
          <div className="flex items-center gap-1">
            <h3 className="text-sm font-semibold text-foreground truncate">{title}</h3>
            <div className="w-2 h-2 rounded-full bg-chart-1" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <div className="text-base font-bold text-primary">
              {formatValue(totalLeads.leadNumbers)}
              <span className="text-xs font-medium text-muted-foreground ml-0.5">Leads</span>
            </div>
            <div className="text-xs text-muted-foreground">{formatValue(totalLeads.leadQuantity)} Sq.ft</div>
          </div>
          <span className="text-[10px] text-muted-foreground">{subtitle}</span>
        </div>

        {/* Right Section - Opportunities */}
        <div className="flex flex-col items-end justify-center gap-0.5 shrink-0">
          <div className="text-[0.65rem] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-chart-2" />
            Opportunities
          </div>
          <div className="text-sm font-semibold text-foreground">{formatValue(totalOpps.oppNumbers)}</div>
          <div className="text-[0.65rem] text-muted-foreground text-right">
            {formatValue(totalOpps.oppQuantity)} Sq.ft
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main CRM Card Component
export const CRMCard: React.FC<CRMCardProps> = ({
  totalLeads,
  totalOpps,
  subtitle
}) => {
  return (
    <>
      {/* Desktop Version */}
      <div className="lg:h-50">
        <Card className="h-full w-full p-1.5 gap-1.5">
          <CardHeader className="p-2">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <div className="flex flex-wrap items-center gap-1.5 min-w-0 max-w-[70%]">
                <div className="min-w-0 w-full flex flex-col gap-1">
                  <CardTitle className="text-lg sm:text-sm font-medium text-foreground truncate flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    CRM Data
                  </CardTitle>
                  <span className="text-[10px] text-muted-foreground">{subtitle}</span>
                </div>
              </div>

            </div>
          </CardHeader>

          <CardContent className="space-y-1.5 p-0">
            {/* Leads & Opportunities - Side by side */}
            <div className="grid grid-cols-2 gap-1.5">
              {/* Leads Card */}
              <div className="space-y-2 border border-border rounded-lg px-2 py-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-chart-1" />
                  Leads
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Numbers</div>
                    <div className="text-base lg:text-lg font-bold text-foreground">
                      {formatValue(totalLeads.leadNumbers)}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                      Quantity
                    </div>
                    <div className="text-base lg:text-lg font-bold text-foreground">
                      {formatValue(totalLeads.leadQuantity)}
                      <span className="text-xs font-medium text-muted-foreground ml-1">Sq.ft</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opportunities Card */}
              <div className="space-y-2 border border-border rounded-lg px-2 py-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-chart-2" />
                  Opportunities
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">Numbers</div>
                    <div className="text-base lg:text-lg font-bold text-foreground">
                      {formatValue(totalOpps.oppNumbers)}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                      Quantity
                    </div>
                    <div className="text-base lg:text-lg font-bold text-foreground">
                      {formatValue(totalOpps.oppQuantity)}
                      <span className="text-xs font-medium text-muted-foreground ml-1">Sq.ft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}