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
  top: 0,
  right: 25,
  bottom: 20,
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

  const chartMetrics = useMemo(() => {
    if (!data.length) return { maxValue: 0, minValueForInsideLabel: 0 };

    const maxValue = Math.max(...data.map((item) => item.totStock));
    return {
      maxValue,
      minValueForInsideLabel: maxValue * 0.1,
    };
  }, [data]);

  if (!data.length) {
    return <EmptyState message="No chart data available" />;
  }

  const { minValueForInsideLabel } = chartMetrics;

  return (
    <div className="w-full overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer
          config={CHART_CONFIG}
          className="h-full w-full max-h-[400px]"
        >
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={CHART_MARGINS}
            barGap={5}
            barSize={16}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeOpacity={0.2}
            />
            <YAxis
              dataKey="day"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize,
                fill: "hsl(var(--muted-foreground))",
                fontWeight: 500,
              }}
              tickMargin={2}
              width={40}
            />
            <XAxis type="number" dataKey="totStock" hide />
            <ChartTooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.03)" }}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey="soldStock"
              fill="var(--chart-1)"
              radius={[0, 0, 0, 0]}
              stackId="stack"
            >
              <LabelList
                dataKey="day"
                position="insideLeft"
                offset={2}
                className="fill-white font-medium"
                fontSize={fontSize}
                style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                formatter={(value: string, entry: ChartDataItem) => {
                  if (!entry || typeof entry.soldStock !== "number") return "";
                  return entry.soldStock >= minValueForInsideLabel ? value : "";
                }}
              />
            </Bar>
            <Bar
              dataKey="holdStock"
              fill="var(--chart-2)"
              radius={[0, 0, 0, 0]}
              stackId="stack"
            >
              <LabelList
                dataKey="totStock"
                position="right"
                offset={2}
                className="font-semibold fill-accent-foreground"
                fontSize={fontSize}
                fill="hsl(var(--foreground))"
                formatter={(value: number) => {
                  if (typeof value !== "number") return "";
                  return formatValue(value);
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
      <div className="lg:h-50">
        <Card className="h-full w-full p-1.5 gap-1.5">
          <CardHeader className="p-2">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <div className="flex flex-wrap items-center gap-1.5 min-w-0 max-w-[70%]">
                <div className="min-w-0 w-full flex flex-col gap-1">
                  <CardTitle className="text-lg sm:text-sm font-medium text-foreground truncate flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    Hold/Sold Data
                  </CardTitle>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center p-4">
            <EmptyState message="No data available" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Card className="h-full w-full p-1.5 gap-1.5">
        <CardHeader className="p-2">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <div className="flex flex-wrap items-center gap-1.5 min-w-0 max-w-[70%]">
              <div className="min-w-0 w-full flex flex-col gap-1">
                <CardTitle className="text-lg sm:text-sm font-medium text-foreground truncate flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Hold/sold Data
                </CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-1.5 p-0">
          {/* Stock Summary & Chart - Side by side */}
          <div className="flex flex-col gap-1.5">
            {/* Stock Summary Cards - Takes 2 columns */}
            <div className="flex flex-row md:flex-col lg:flex-row gap-1.5">
              {/* Sold Stock Card */}
              <div className="w-full space-y-2 border border-border rounded-lg px-2 py-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-chart-1" />
                  Sold Stock
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    Quantity
                  </div>
                  <div className="text-base lg:text-lg font-bold text-foreground">
                    {formatValue(sanitizedTotals.sold.soldQuantity)}
                    <span className="text-xs font-bold ml-1">K</span>
                    <span className="text-[10px] ml-1 text-muted-foreground">
                      sq.ft
                    </span>
                  </div>
                </div>
              </div>
              {/* Hold Stock Card */}
              <div className="w-full space-y-2 border border-border rounded-lg px-2 py-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-chart-2" />
                  Hold Stock
                </div>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    Quantity
                  </div>
                  <div className="text-base lg:text-lg font-bold text-foreground">
                    {formatValue(sanitizedTotals.hold.holdQuantity)}
                    <span className="text-xs font-bold ml-1">K</span>
                    <span className="text-[10px] ml-1 text-muted-foreground">
                      sq.ft
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="w-full overflow-hidden">
              <Chart data={sanitizedData} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
