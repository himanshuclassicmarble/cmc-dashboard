"use client";
import type React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Package, TrendingUp } from "lucide-react";
import type {
  ChartDataItem,
  HoldSoldChartProps,
} from "../types/hold-sold-types";
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    color: string;
    dataKey: string;
    payload: ChartDataItem;
  }>;
  label?: string;
}
// Constants
const CHART_CONFIG = {
  soldStock: {
    label: "Sold Stock",
    color: "var(--chart-1)",
  },
  holdStock: {
    label: "Hold Stock",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--foreground)",
  },
} satisfies ChartConfig;
const CHART_MARGINS = {
  left: 0,
  top: 15,
  right: 0,
  bottom: 0, // Reduced bottom margin
};
// Utility functions
const formatValue = (value: number, decimals = 2): string =>
  value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
const calculateResponsiveFontSize = (windowWidth: number): number =>
  Math.min(8, Math.max(6, windowWidth / 120));
// Custom components
const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0].payload;
  return (
    <div className="rounded-lg border bg-background p-2 shadow-lg min-w-[150px]">
      <div className="flex items-center gap-1">
        <span className="font-semibold text-[10px]">Daily Distribution</span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center gap-1">
          <span className="text-[10px] text-muted-foreground">Days:</span>
          <span className="font-semibold text-[10px]">{label}</span>
        </div>
        <div className="flex justify-between items-center gap-1">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: CHART_CONFIG.soldStock.color }}
            />
            <span className="text-[10px] text-muted-foreground">Sold:</span>
          </div>
          <span className="font-semibold text-[10px]">
            {formatValue(data.soldStock)}
          </span>
          <span className="text-[10px] text-muted-foreground">sq.ft</span>
        </div>
        <div className="flex justify-between items-center gap-1">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: CHART_CONFIG.holdStock.color }}
            />
            <span className="text-[10px] text-muted-foreground">Hold:</span>
          </div>
          <span className="font-semibold text-[10px]">
            {formatValue(data.holdStock)}
          </span>
          <span className="text-[10px] text-muted-foreground">sq.ft</span>
        </div>
        <div className="flex justify-between items-center gap-1 border-t pt-1">
          <span className="text-[10px] text-muted-foreground">Total:</span>
          <span className="font-semibold text-[10px]">
            {formatValue(data.totStock)}
          </span>
          <span className="text-[10px] text-muted-foreground">sq.ft</span>
        </div>
      </div>
    </div>
  );
};
const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="w-full h-full flex items-center justify-center">
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);
// Custom hook for responsive font size
const useResponsiveFontSize = () => {
  const [fontSize, setFontSize] = useState(7);
  useEffect(() => {
    const updateFontSize = () => {
      if (typeof window !== "undefined") {
        setFontSize(calculateResponsiveFontSize(window.innerWidth));
      }
    };
    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);
  return fontSize;
};
// Chart component
const Chart: React.FC<{ data: ChartDataItem[] }> = ({ data }) => {
  const fontSize = useResponsiveFontSize();
  if (!data.length) {
    return <EmptyState message="No chart data available" />;
  }
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer
          config={CHART_CONFIG}
          className="h-full lg:h-[180px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            layout="horizontal"
            margin={CHART_MARGINS}
            barGap={3}
          >
            {/* Grid */}
            <CartesianGrid
              stroke="var(--border)"
              strokeOpacity={0.15}
              vertical={false}
            />
            {/* X Axis (days) */}
            <XAxis
              dataKey="day"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize,
                fill: "hsl(var(--muted-foreground))",
                fontWeight: 500,
              }}
            />
            {/* Hide Y axis (just values) */}
            <YAxis type="number" hide />
            {/* Tooltip */}
            <ChartTooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
              content={<CustomTooltip />}
            />
            {/* Sold Stock */}
            <Bar
              dataKey="soldStock"
              fill="var(--chart-1)"
              radius={[0, 0, 0, 0]}
              stackId="stack"
            >
              {/* Sold values inside the bars */}
              <LabelList
                dataKey="soldStock"
                position="center"
                className="font-semibold"
                fontSize={10}
                fill="var(--foreground)"
                formatter={(value: number) => {
                  if (!value || isNaN(value) || value <= 50) return ""; // hide if <= 50
                  return Math.round(value);
                }}
              />
            </Bar>
            {/* Hold Stock */}
            <Bar
              dataKey="holdStock"
              fill="var(--chart-2)"
              radius={[0, 0, 0, 0]}
              stackId="stack"
            >
              {/* Hold values inside the bars */}
              <LabelList
                dataKey="holdStock"
                position="center"
                className="font-semibold"
                fontSize={10}
                fill="var(--foreground)"
                formatter={(value: number) => {
                  if (!value || isNaN(value) || value <= 50) return ""; // hide if <= 50
                  return Math.round(value);
                }}
              />
              {/* Total values on top of bars */}
              <LabelList
                dataKey="totStock"
                position="top"
                offset={4}
                fill="var(--foreground)"
                fontSize={10}
                formatter={(value: number) => {
                  if (!value || isNaN(value)) return "";
                  return Math.round(value).toLocaleString();
                }}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
};
// Main component
export const HoldSoldChartV2: React.FC<HoldSoldChartProps> = ({
  totalHeld,
  totalSold,
  chartData,
}) => {
  const sanitizedData = useMemo(() => {
    if (!chartData || !Array.isArray(chartData)) return [];
    return chartData.filter(
      (item) =>
        item &&
        item.day &&
        typeof item.soldStock === "number" &&
        typeof item.holdStock === "number",
    );
  }, [chartData]);
  const sanitizedTotals = useMemo(
    () => ({
      hold: {
        holdQuantity: Number(totalHeld?.holdQuantity) || 0,
      },
      sold: {
        soldQuantity: Number(totalSold?.soldQuantity) || 0,
      },
    }),
    [totalHeld, totalSold],
  );
  // Empty state
  if (!chartData || sanitizedData.length === 0) {
    return (
      <Card className="h-full w-full flex flex-col">
        <CardHeader className="p-2 pb-0">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">
              Hold/Sold Data
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-4">
          <EmptyState message="No data available" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="p-0 gap-0 h-full w-full flex flex-col">
      <div className="pt-3 px-4 pb-0 text-sm text-foreground flex flex-col items-start gap-0.5">
        <h1 className="flex items-center gap-0.5">
          <TrendingUp className="h-4 w-4 text-primary" />
          Hold / Sold Data
        </h1>
        <p className="text-[10px] text-red-700 font-medium">
          *Stocks data are hidden if{" "}
          <span className="font-semibold">Total Stock ≤ 50</span>. See tooltip
          for details.
        </p>
      </div>
      <CardContent className="flex-1 flex flex-col p-1.5 space-y-2">
        <div className="flex flex-row gap-1">
          <div className="flex-1 border border-border rounded-lg px-1.5 py-1.5">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-wide text-left flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-chart-1 flex-shrink-0" />
              Sold Stock
            </div>
            <div className="space-y-0.5">
              <div className="text-[9px] font-medium text-muted-foreground uppercase tracking-wide text-left">
                Quantity{" "}
                <span className="font-semibold text-foreground">(sq.ft.)</span>
              </div>
              <div className="text-sm font-bold text-primary text-left">
                {formatValue(sanitizedTotals.sold.soldQuantity)}K
              </div>
            </div>
          </div>
          <div className="flex-1 border border-border rounded-lg px-1.5 py-1.5">
            <div className="text-[10px] font-semibold text-foreground uppercase tracking-wide text-left flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-chart-2 flex-shrink-0" />
              Hold Stock
            </div>
            <div className="space-y-0.5">
              <div className="text-[9px] font-medium text-muted-foreground uppercase tracking-wide text-left">
                Quantity{" "}
                <span className="font-semibold text-foreground">(sq.ft.)</span>
              </div>
              <div className="text-sm font-bold text-primary text-left">
                {formatValue(sanitizedTotals.hold.holdQuantity)}K
              </div>
            </div>
          </div>
        </div>
        {/* Chart - takes remaining space */}
        <div className="flex-1 min-h-0">
          <Chart data={sanitizedData} />
        </div>
      </CardContent>
    </Card>
  );
};
