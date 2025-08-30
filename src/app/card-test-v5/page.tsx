"use client";

import React from "react";
import { PerformanceCardTypes } from "./types/performance-card-types";
import { PerformanceCard } from "./components/performance-card";
import { performanceCardData } from "./data/performance-card-data";
import AnalyticsChart from "./components/analytics-chart";
import { AnalyticsChartData } from "./data/analytics-chart-data";
import FilterHeader from "@/app/card-test-v5/components/FilterHeader";
import { HoldSoldChartV2 } from "./components/hold-sold-chart-v2";
import { sampleStockData } from "./data/hold-sold-data";
import CRMCard from "./components/crm-chart/crm-card";
import { CRMdata } from "./components/crm-chart/data";

const HOLD_SOLD_CONFIG = {
  DEFAULT_HELD: { holdQuantity: 90, holdNumbers: 90 },
  DEFAULT_SOLD: { soldQuantity: 200, soldNumbers: 200 },
} as const;

const CardTestV7: React.FC = () => {
  // Render functions
  const renderPerformanceCards = () =>
    performanceCardData.map((item: PerformanceCardTypes) => (
      <PerformanceCard key={item.title} data={item} />
    ));

  const renderCRMCard = () => <CRMCard data={CRMdata} />;

  const renderAnalyticsChart = () => (
    <AnalyticsChart data={AnalyticsChartData} />
  );

  const renderHoldSoldChart = (
    customTotalHeld = HOLD_SOLD_CONFIG.DEFAULT_HELD,
  ) => (
    <HoldSoldChartV2
      totalHeld={customTotalHeld}
      totalSold={HOLD_SOLD_CONFIG.DEFAULT_SOLD}
      chartData={sampleStockData}
    />
  );

  // Layout components
  const LargeScreenLayout = () => (
    <div className="hidden lg:flex flex-row gap-2 w-full h-screen">
      <div className="flex flex-col gap-1.5 flex-1 h-full">
        <div className="grid grid-cols-3 gap-1.5 w-full">
          {renderPerformanceCards()}
        </div>
        <div className="flex-1">{renderAnalyticsChart()}</div>
      </div>
      <div className="w-[400px] flex flex-col gap-1.5 h-full">
        <div>{renderCRMCard()}</div>
        <div>{renderHoldSoldChart()}</div>
      </div>
    </div>
  );

  const MediumScreenLayout = () => (
    <div className="hidden md:flex lg:hidden flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-2 gap-2 flex-shrink-0">
        {renderPerformanceCards()}
        {renderCRMCard()}
      </div>
      <div className="flex flex-row gap-2 flex-shrink-0">
        <div className="w-7/12">{renderAnalyticsChart()}</div>
        <div className="w-full">{renderHoldSoldChart()}</div>
      </div>
    </div>
  );

  const SmallScreenLayout = () => (
    <div className="flex md:hidden flex-col gap-2 flex-1 min-h-0">
      <div className="grid grid-cols-1 gap-2 flex-shrink-0">
        {renderPerformanceCards()}
        {renderCRMCard()}
      </div>
      <div className="flex-shrink-0">{renderAnalyticsChart()}</div>
      {/* ✅ just reuse default held */}
      <div className="flex-shrink-0">{renderHoldSoldChart()}</div>
    </div>
  );

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {/* Give header a fixed height */}
      <header className="h-14 flex-shrink-0">
        <FilterHeader />
      </header>

      {/* Main now fills exactly remaining height = 100vh - 56px */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col p-2 gap-2 overflow-hidden h-[calc(100vh-3.5rem)]">
        <LargeScreenLayout />
        <MediumScreenLayout />
        <SmallScreenLayout />
      </main>
    </div>
  );
};

export default CardTestV7;
