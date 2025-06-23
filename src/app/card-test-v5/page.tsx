"use client";
import React from "react";
import { PerformanceCardTypes } from "./types/performance-card-types";
import { PerformanceCard } from "./components/performance-card";
import { performanceCardData } from "./data/performance-card-data";
import AnalyticsChart from "./components/analytics-chart";
import { AnalyticsChartData } from "./data/analytics-chart-data";
import { HoldSoldChart } from "@/app/card-test-v5/components/hold-sold-chart";
import { sampleHoldSoldData } from "./data/hold-sold-data";
import FilterHeader from "@/app/card-test-v5/components/FilterHeader";
import { CRMCard } from "./components/crm-card";

const CardTestV6: React.FC = () => {
    const crmTotalLeads = { leadQuantity: 270, leadNumbers: 7400 };
    const crmTotalOpps = { oppQuantity: 300, oppNumbers: 299 };
    const holdSoldTotalHeld = { holdQuantity: 90, holdNumbers: 90 };
    const holdSoldTotalSold = { soldQuantity: 200, soldNumbers: 200 };

    const renderPerformanceCards = () => (
        performanceCardData.map((item: PerformanceCardTypes) => (
            <PerformanceCard key={item.title} data={item} />
        ))
    );

    const renderCRMCard = () => (
        <CRMCard
            totalLeads={crmTotalLeads}
            totalOpps={crmTotalOpps}
        />
    );

    const renderHoldSoldChart = (customTotalHeld = holdSoldTotalHeld) => (
        <HoldSoldChart
            totalHeld={customTotalHeld}
            totalSold={holdSoldTotalSold}
            chartData={sampleHoldSoldData}
        />
    );

    return (
        <div className="h-auto w-full flex flex-col">
            <header>
                <FilterHeader />
            </header>
            
            <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col p-2 gap-2 overflow-hidden">
                {/* Large Screens (lg+): Side-by-side layout with cards/chart on left, CRM/Hold-Sold charts on right */}
                <div className="hidden lg:flex flex-col gap-2 flex-1 min-h-0">
                    <div className="flex flex-row gap-2 flex-1 min-h-0 overflow-hidden">
                        <div className="w-2/3 flex flex-col gap-2">
                            <div className="grid grid-cols-3 gap-2">
                                {renderPerformanceCards()}
                            </div>
                        </div>
                        <div className="w-1/3 h-full">
                            {renderCRMCard()}
                        </div>
                    </div>
                    
                    <div className="flex flex-row gap-2 flex-shrink-0 min-h-0">
                        <div className="w-2/3 min-h-0">
                            <AnalyticsChart data={AnalyticsChartData} />
                        </div>
                        <div className="w-1/3">
                            {renderHoldSoldChart()}
                        </div>
                    </div>
                </div>

                {/* Medium Screens (md to lg): Stacked layout with CRM/Hold-Sold charts in a row at bottom */}
                <div className="hidden md:flex lg:hidden flex-col gap-2 flex-1 min-h-0">
                    <div className="grid grid-cols-2 gap-2 flex-shrink-0">
                        {renderPerformanceCards()}
                            {renderCRMCard()}
                    </div>
                    
                    
                    <div className="flex flex-row  gap-2 flex-shrink-0">
                        <div className="w-7/12">
                        <AnalyticsChart data={AnalyticsChartData} />
                        </div>
                        <div className=" w-full">

                            {renderHoldSoldChart()}
                        </div>
                    </div>
                </div>

                {/* Small Screens (below md): All components stacked vertically */}
                <div className="flex md:hidden flex-col gap-2 flex-1 min-h-0">
                    
                    <div className="grid grid-cols-1 gap-2 flex-shrink-0">
                        {renderPerformanceCards()}
                        {renderCRMCard()}
                    </div>
                    
                    <div className="flex-shrink-0">
                        <AnalyticsChart data={AnalyticsChartData} />
                    </div>
                    
                    <div className="flex-shrink-0">
                        {renderHoldSoldChart({ holdQuantity: 200, holdNumbers: 200 })}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CardTestV6;