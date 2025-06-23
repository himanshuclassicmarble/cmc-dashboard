"use client";

import { Bar, Line, ComposedChart, CartesianGrid, XAxis, YAxis, LabelList, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartConfig } from "@/components/ui/chart";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ===================== TYPES =====================

interface YearData {
  value: number;
  quantity: number;
}

interface AnalyticsDataPoint {
  month: string;
  currentYear: YearData;
  previousYear: YearData;
  target: YearData;
}

interface ChartDataPoint {
  month: string;
  currentYear: number;
  previousYear: number;
  target: number;
  id: string;
}

interface AnalyticsChartProps {
  data: AnalyticsDataPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value?: number;
    dataKey?: string;
    color?: string;
    name?: string;
  }>;
  label?: string;
}

// ===================== CONSTANTS =====================

const SCREEN_BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 1024,
} as const;

const CHART_CONFIG: ChartConfig = {
  currentYear: {
    label: "Current Year",
    color: "var(--chart-1)",
  },
  previousYear: {
    label: "Previous Year", 
    color: "var(--chart-2)",
  },
  target: {
    label: "Target",
    color: "var(--chart-3)",
  },
};

const CHART_MARGINS = {
  top: 25,
  right: 20,
  left: 0,
  bottom: 0,
};

// ===================== UTILITIES =====================

const formatValue = (value: number, decimals = 0): string =>
  value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const getScreenSize = (width: number) => {
  if (width < SCREEN_BREAKPOINTS.MOBILE) return 'mobile';
  if (width < SCREEN_BREAKPOINTS.TABLET) return 'tablet';
  return 'desktop';
};

const getFontSize = (screenSize: string) => {
  switch (screenSize) {
    case 'mobile': return 8;
    case 'tablet': return 9;
    default: return 10;
  }
};

const getVisibleDataCount = (screenSize: string) => {
  switch (screenSize) {
    case 'mobile': return 4;
    case 'tablet': return 6;
    default: return Infinity;
  }
};

// ===================== HOOKS =====================

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState('desktop');

  const updateScreenSize = useCallback(() => {
    if (typeof window === "undefined") return;
    setScreenSize(getScreenSize(window.innerWidth));
  }, []);

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [updateScreenSize]);

  return screenSize;
};

const useDataTransform = (data: AnalyticsDataPoint[]) => {
  return useCallback((metric: "value" | "quantity"): ChartDataPoint[] => {
    if (!Array.isArray(data) || data.length === 0) return [];

    return data
      .filter(item => 
        item?.month &&
        item?.currentYear &&
        item?.previousYear &&
        item?.target &&
        typeof item.currentYear === "object" &&
        typeof item.previousYear === "object" &&
        typeof item.target === "object"
      )
      .map((item, index) => ({
        month: item.month,
        currentYear: Number(item.currentYear[metric]) || 0,
        previousYear: Number(item.previousYear[metric]) || 0,
        target: Number(item.target[metric]) || 0,
        id: `${item.month}-${metric}-${index}`,
      }));
  }, [data]);
};

// ===================== COMPONENTS =====================

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-sm border bg-background/95 backdrop-blur-sm p-2 shadow-none">
      <div className="space-y-1.5">
        <div className="flex justify-between items-center gap-3">
          <span className="text-[10px] text-muted-foreground">Month:</span>
          <span className="text-[10px] font-semibold">{label}</span>
        </div>
        {payload.map((entry, index) => {
          const value = entry.value ?? 0;
          const dataKey = entry.dataKey ?? entry.name ?? '';
          const color = entry.color ?? '';
          
          return (
            <div key={`tooltip-${dataKey}-${index}`} className="flex justify-between items-center gap-1">
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "w-2.5 h-2.5", 
                    dataKey === "target" ? "rounded-full" : "rounded-sm"
                  )}
                  style={{ backgroundColor: color }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {CHART_CONFIG[dataKey as keyof typeof CHART_CONFIG]?.label || dataKey}:
                </span>
              </div>
              <span className="text-[10px] font-semibold tabular-nums">
                {formatValue(value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChartLegend = () => (
  <div className="flex flex-wrap gap-4">
    {Object.entries(CHART_CONFIG).map(([key, { label, color }]) => (
      <div key={key} className="flex items-center gap-2">
        <div
          className={cn(
            key === "target" ? "w-3 h-1.5 rounded-full" : "w-3 h-3 rounded-sm"
          )}
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
    ))}
  </div>
);

const Chart = ({ data, screenSize }: { data: ChartDataPoint[]; screenSize: string }) => {
  const fontSize = getFontSize(screenSize);
  const isMobile = screenSize === 'mobile';

  if (!data?.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">No chart data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartContainer config={CHART_CONFIG} className="h-[300px] w-full">
        <ComposedChart
          data={data}
          margin={CHART_MARGINS}
          barCategoryGap="20%"
          barGap={3}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.3} 
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontWeight: 500,
              fontSize: fontSize,
            }}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{
              fill: "hsl(var(--muted-foreground))",
              fontWeight: 500,
              fontSize: fontSize - 1,
            }}
            tickFormatter={(value) => formatValue(value, 0)}
          />

          <ChartTooltip 
            cursor={{ fill: "hsl(var(--muted)/20)" }} 
            content={<CustomTooltip />} 
          />

          <Bar
            dataKey="currentYear"
            fill="var(--color-currentYear)"
            name="currentYear"
            radius={[0, 0, 0, 0]}
          >
            <LabelList
              dataKey="currentYear"
              position="top"
              offset={8}
              className="fill-foreground font-medium"
              fontSize={fontSize}
              formatter={formatValue}
            />
          </Bar>

          <Bar
            dataKey="previousYear"
            fill="var(--color-previousYear)"
            name="previousYear"
            radius={[0, 0, 0, 0]}
          >
            <LabelList
              dataKey="previousYear"
              position="top"
              offset={8}
              className="fill-foreground font-medium"
              fontSize={fontSize}
              formatter={formatValue}
            />
          </Bar>

          <Line
            type="monotone"
            dataKey="target"
            stroke="var(--color-target)"
            strokeWidth={3}
            dot={{
              fill: "var(--color-target)",
              strokeWidth: 2,
              r: 5,
            }}
            activeDot={{
              r: 7,
              stroke: "var(--color-target)",
              strokeWidth: 2,
              fill: "hsl(var(--background))",
            }}
            name="target"
          >
            <LabelList
              dataKey="target"
              position="top"
              fill="var(--color-target)"
              fontSize={fontSize}
              fontWeight="600"
              offset={12}
              formatter={formatValue}
            />
          </Line>
        </ComposedChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
};

const ScrollControl = ({ 
  scrollPosition, 
  onScrollChange, 
  maxScroll, 
  visibleData, 
  visibleDataCount, 
  totalDataLength 
}: {
  scrollPosition: number;
  onScrollChange: (value: number[]) => void;
  maxScroll: number;
  visibleData: ChartDataPoint[];
  visibleDataCount: number;
  totalDataLength: number;
}) => (
  <div className="space-y-3 pt-4 border-t">
    <Slider
      value={[scrollPosition]}
      onValueChange={onScrollChange}
      max={maxScroll}
      min={0}
      step={1}
      className="w-full"
    />
    <div className="text-center">
      <span className="text-sm font-medium text-muted-foreground">
        {visibleData[0]?.month} - {visibleData[visibleData.length - 1]?.month}
        <span className="ml-2 text-xs opacity-70">
          ({visibleDataCount} of {totalDataLength})
        </span>
      </span>
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <Card className="w-full mx-auto">
    <CardContent className="flex items-center justify-center p-8">
      <p className="text-muted-foreground">{message}</p>
    </CardContent>
  </Card>
);

// ===================== MAIN COMPONENT =====================

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState<"value" | "quantity">("value");
  
  const screenSize = useScreenSize();
  const transformData = useDataTransform(data);

  // Memoized calculations
  const visibleDataCount = useMemo(() => getVisibleDataCount(screenSize), [screenSize]);
  const needsScrolling = screenSize !== 'desktop';
  const maxScroll = Math.max(0, (data?.length || 0) - visibleDataCount);

  const currentData = useMemo(() => transformData(activeTab), [transformData, activeTab]);
  
  const visibleData = useMemo(() => {
    return needsScrolling 
      ? currentData.slice(scrollPosition, scrollPosition + visibleDataCount)
      : currentData;
  }, [currentData, needsScrolling, scrollPosition, visibleDataCount]);

  const handleScrollChange = useCallback((value: number[]) => {
    setScrollPosition(value[0]);
  }, []);

  // Reset scroll position when tab changes
  useEffect(() => {
    setScrollPosition(0);
  }, [activeTab]);

  // Error states
  if (!data || !Array.isArray(data)) {
    return <ErrorState message="No data provided" />;
  }

  if (currentData.length === 0) {
    return <ErrorState message="Invalid data format" />;
  }

  return (
    <Card className="w-full mx-auto p-2">
      <CardContent className="p-2 space-y-2">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "value" | "quantity")}
          className="w-full"
        >
          {/* Header */}
          <div className="flex flex-wrap flex-col md:flex-row md:items-center md:justify-between sm:flex-row sm:items-center sm:justify-between gap-1">
            <TabsList className="grid w-full sm:w-auto grid-cols-2 bg-muted/50">
              <TabsTrigger
                value="value"
                className="text-sm font-medium data-[state=active]:bg-background"
              >
                Value
              </TabsTrigger>
              <TabsTrigger
                value="quantity"
                className="text-sm font-medium data-[state=active]:bg-background"
              >
                Quantity
              </TabsTrigger>
            </TabsList>
            <ChartLegend />
          </div>

          {/* Chart Content */}
          <TabsContent value="value" className="mt-0">
            <Chart data={visibleData} screenSize={screenSize} />
          </TabsContent>

          <TabsContent value="quantity" className="mt-0">
            <Chart data={visibleData} screenSize={screenSize} />
          </TabsContent>
        </Tabs>

        {/* Scroll Control */}
        {needsScrolling && (
          <ScrollControl
            scrollPosition={scrollPosition}
            onScrollChange={handleScrollChange}
            maxScroll={maxScroll}
            visibleData={visibleData}
            visibleDataCount={visibleDataCount}
            totalDataLength={data.length}
          />
        )}
      </CardContent>
    </Card>
  );
}