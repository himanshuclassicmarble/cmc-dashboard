"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-[calc(100vh-3rem)] bg-background overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-12 h-full overflow-hidden">
          {/* Left Section (Sidebar) */}
          <div className="col-span-2 flex flex-col gap-2 p-2">
            {/* Quality Search and Filter Select */}
            <div className="space-y-2">
              {/* QualitySearch Placeholder */}
              <Skeleton className="h-10 w-full rounded-xl md:rounded-lg" />
              {/* FilterSelect Placeholder */}
              <Skeleton className="h-10 w-full rounded-xl md:rounded-lg" />
            </div>

            {/* Qualities Section Placeholder */}
            <div className="flex-1 space-y-2 overflow-y-auto">
              {[...Array(10)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-20 w-full rounded-xl md:rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Right Section (Main Content) */}
          <div className="col-span-10 flex flex-col">
            {/* Filter Colors Placeholder */}
            <div className="p-1">
              <div className="flex w-full space-x-2 overflow-hidden">
                {[...Array(10)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-14 w-32 shrink-0 rounded-xl md:rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Application Images Section Placeholder */}
            <div className="flex-1 p-2">
              <div className="relative h-full w-full">
                <Skeleton className="h-[calc(100vh-8rem)] w-full rounded-xl md:rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex flex-col gap-2 p-1">
            {/* Filter Controls */}
            <div className="bg-card rounded-lg border shadow-sm space-y-2 p-2">
              {/* QualitySearch Placeholder */}
              <Skeleton className="h-10 w-full rounded-xl md:rounded-lg" />
              {/* FilterSelect Placeholder */}
              <Skeleton className="h-10 w-full rounded-xl md:rounded-lg" />
              {/* Colors Placeholder */}
              <div className="flex w-full space-x-2 overflow-hidden">
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-14 w-32 shrink-0 rounded-xl md:rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-card rounded-lg border shadow-sm space-y-2">
              {/* Qualities Section Placeholder */}
              <div className="flex w-full space-x-2 overflow-hidden">
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-20 w-32 shrink-0 rounded-md"
                  />
                ))}
              </div>

              {/* Images Section Placeholder */}
              <section className="p-2">
                <Skeleton className="h-[calc(100vh-16rem)] w-full rounded-md" />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
