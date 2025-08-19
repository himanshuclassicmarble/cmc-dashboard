"use client";

import type React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface LeadMetricData {
  leadQuantity: number;
  leadNumbers: number;
}

interface OpportunityMetricData {
  oppQuantity: number;
  oppNumbers: number;
}

interface CRMCardProps {
  totalLeads: LeadMetricData;
  totalOpps: OpportunityMetricData;
  title?: string;
}

// Utility functions
const formatValue = (value: number, decimals = 2): string =>
  value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export const CRMCard: React.FC<CRMCardProps> = ({
  totalLeads,
  totalOpps,
  title = "CRM Data",
}) => {
  return (
    <div className="">
      <Card className="w-full p-1.5 gap-1">
        <CardHeader className="p-2">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <div className="flex flex-wrap items-center gap-1.5 min-w-0 max-w-[70%]">
              <div className="min-w-0 w-full flex flex-col gap-1">
                <CardTitle className="text-sm font-medium text-foreground truncate flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  {title}
                </CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-1.5 p-0">
          <div className="grid grid-cols-2 gap-1.5">
            {/* Leads */}
            <div className="space-y-1 border border-border rounded-lg px-2 py-2">
              <div className="text-xs pb-2 font-medium text-muted-foreground uppercase border-b border-border tracking-wide">
                Open Leads
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">
                Numbers
              </div>
              <div className="text-base font-bold text-foreground">
                {totalLeads.leadNumbers.toLocaleString()}
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">
                Quantity
              </div>
              <div className="text-base font-bold text-foreground flex items-center">
                {formatValue(totalLeads.leadQuantity)}
                <span className="text-xs font-bold ml-1">K</span>
                <span className="text-[10px] ml-1 text-muted-foreground">
                  sq.ft
                </span>
              </div>
            </div>

            {/* Opportunities */}
            <div className="space-y-1 border border-border rounded-lg px-2 py-2">
              <div className="text-xs font-medium text-muted-foreground uppercase border-b border-border pb-2 tracking-wide">
                Open Opportunities
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">
                Numbers
              </div>
              <div className="text-base font-bold text-foreground">
                {totalOpps.oppNumbers.toLocaleString()}
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">
                Quantity
              </div>
              <div className="text-base font-bold text-foreground flex items-center">
                {formatValue(totalOpps.oppQuantity)}
                <span className="text-xs font-bold ml-1">K</span>
                <span className="text-[10px] ml-1 text-muted-foreground">
                  sq.ft
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
