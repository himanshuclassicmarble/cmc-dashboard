"use client";
import type React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PerformanceCardTypes } from "../types/performance-card-types";

// Utility functions with proper typing
const formatValue = (value: number, decimals = 2): string =>
  value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

const formatPercentage = (value: number): string =>
  `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;

// Growth/loss icon component
interface GrowthIconProps {
  isNegative: boolean;
  className?: string;
}

const GrowthIcon: React.FC<GrowthIconProps> = ({ isNegative, className }) => {
  const IconComponent = isNegative ? TrendingDown : TrendingUp;
  return <IconComponent className={className} />;
};

// Mobile Performance Card Component
interface MobilePerformanceCardProps {
  data: PerformanceCardTypes;
}

const MobilePerformanceCard: React.FC<MobilePerformanceCardProps> = ({
  data,
}) => {
  const isNegativeGrowth = data.metrics.goly < 0;
  const isAchievementGood = data.metrics.ach >= 60;

  return (
    <Card className="w-full h-20 ">
      <CardContent className="p-3 flex items-center justify-between h-full gap-2">
        {/* Left Section - Main Metrics */}
        <div className="flex flex-col justify-center min-w-0 flex-1 gap-1">
          <div className="flex items-center gap-1">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {data.title}
            </h3>
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-0.5 px-1.5 py-0 text-[0.65rem] font-medium shrink-0 rounded-full",
                isNegativeGrowth
                  ? "border-red-200 text-red-600 dark:border-red-700 dark:text-red-400"
                  : "border-green-200 text-green-600 dark:border-green-700 dark:text-green-400",
              )}
            >
              <GrowthIcon isNegative={isNegativeGrowth} className="h-3 w-3" />
              {formatPercentage(data.metrics.goly)}
            </Badge>
          </div>
          <div className="flex items-baseline gap-1.5">
            <div className="text-base font-bold text-primary">
              {formatValue(data.metrics.cy)}{" "}
              {data.unit && (
                <span className="text-xs font-medium text-muted-foreground ml-0.5">
                  {data.unit}
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              vs {formatValue(data.metrics.py)} {data.unit}
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground">
            {data.subtitle}
          </span>
        </div>

        {/* Right Section - Achievement & Budget */}
        <div className="flex flex-col items-end justify-center gap-0.5 shrink-0">
          <div className="text-[0.65rem] font-medium text-muted-foreground uppercase tracking-wider">
            Achievement
          </div>
          <div
            className={cn(
              "text-sm font-semibold flex items-center gap-0.5",
              isAchievementGood
                ? "text-green-600 dark:text-green-400"
                : "text-orange-600 dark:text-orange-400",
            )}
          >
            <GrowthIcon
              isNegative={!isAchievementGood}
              className="h-3.5 w-3.5"
            />
            {formatValue(data.metrics.ach, 1)}%
          </div>
          <div className="text-[0.65rem] text-muted-foreground text-right">
            Target: {formatValue(data.metrics.budget)} {data.unit}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Desktop Performance Card Component (original without accordion)
interface PerformanceCardProps {
  data: PerformanceCardTypes;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({ data }) => {
  const isNegativeGrowth = data.metrics.goly < 0;
  const isAchievementGood = data.metrics.ach >= 60;

  const budgetAchievementContent = (
    <div className="space-y-1.5">
      {/* Budget vs Achievement */}
      <div className="border-t border-border pt-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="space-y-1">
            <div className="text-[9px] xs:text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Budget Target
            </div>
            <div className="text-xs sm:text-sm font-medium text-foreground">
              {formatValue(data.metrics.budget)}
              {data.unit && (
                <span className="text-[9px] xs:text-[10px] sm:text-xs text-muted-foreground ml-1">
                  {data.unit}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[9px] xs:text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Achievement
            </div>
            <div
              className={cn(
                "text-xs sm:text-sm font-semibold flex items-center gap-1",
                isAchievementGood
                  ? "text-green-600 dark:text-green-400"
                  : "text-orange-600 dark:text-orange-400",
              )}
            >
              <GrowthIcon isNegative={!isAchievementGood} className="h-3 w-3" />
              {formatValue(data.metrics.ach, 1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Version */}
      <div className="block md:hidden">
        <MobilePerformanceCard data={data} />
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block">
        <Card className="h-full w-full p-1.5 gap-1.5">
          <CardHeader className="p-2">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <div className="flex flex-wrap items-center gap-1.5 min-w-0 max-w-[70%]">
                <div className="min-w-0 w-full flex flex-col gap-1">
                  <CardTitle className="text-lg sm:text-sm font-medium text-foreground truncate">
                    {data.title}
                  </CardTitle>
                  <span className="text-[10px] text-muted-foreground">
                    {data.subtitle}
                  </span>
                </div>
              </div>

              <Badge
                variant="outline"
                className={cn(
                  "flex items-center gap-1 px-1.5 py-1 text-base xs:text-[10px] sm:text-sm font-semibold shrink-0 rounded-full border-2",
                  isNegativeGrowth
                    ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800",
                )}
              >
                <GrowthIcon
                  isNegative={isNegativeGrowth}
                  className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                />
                {formatPercentage(data.metrics.goly)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-1.5 p-0">
            {/* Current Year & Previous Year - Side by side */}
            <div className="grid grid-cols-2 gap-1.5">
              <div className="space-y-1 border border-border rounded-lg px-2 py-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Current Year
                </div>
                <div className="text-base lg:text-lg font-bold text-foreground">
                  {formatValue(data.metrics.cy)}
                  {data.unit && (
                    <span className="text-xs font-medium text-muted-foreground ml-1">
                      {data.unit}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-1 border border-border rounded-lg px-2 py-2">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Previous Year
                </div>
                <div className="text-base lg:text-lg font-bold text-foreground">
                  {formatValue(data.metrics.py)}
                  {data.unit && (
                    <span className="text-xs font-medium text-muted-foreground ml-1">
                      {data.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Budget & Achievement Content */}
            <div className="px-2">{budgetAchievementContent}</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
