"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import QualityCard from "./quality-card";
import { QualitiesType } from "./types";

const Qualities = ({ qualities }: { qualities: QualitiesType[] | null }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedQualities, setDisplayedQualities] = useState<QualitiesType[]>(
    [],
  );
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("color");
  const selectedQualityGroup = searchParams.get("qualityGroup") || "";
  const itemsPerPage = 10;

  useEffect(() => {
    if (qualities) {
      // Filter qualities based on selected color
      const filteredQualities = selectedColor
        ? qualities.filter((item) => item.color === selectedColor)
        : qualities;
      const startIndex = 0;
      const endIndex = currentPage * itemsPerPage;
      setDisplayedQualities(filteredQualities.slice(startIndex, endIndex));
    }
  }, [qualities, currentPage, selectedColor]);

  // Scroll to selected quality group when it changes
  useEffect(() => {
    if (selectedQualityGroup && scrollAreaRef.current) {
      const selectedElement = scrollAreaRef.current.querySelector(
        `[data-quality-group="${selectedQualityGroup}"]`,
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedQualityGroup, displayedQualities]);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const hasMore =
    qualities &&
    displayedQualities.length <
      (selectedColor
        ? qualities.filter((item) => item.color === selectedColor).length
        : qualities.length);

  if (!qualities || qualities.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No qualities available</p>
      </div>
    );
  }

  return (
    <div className="md:h-[calc(100vh-9rem)]">
      <ScrollArea className="group h-full w-full">
        <div
          className="p-2 flex flex-row md:flex-col gap-2 md:min-h-0"
          ref={scrollAreaRef}
        >
          {displayedQualities.map((item, index) => (
            <div
              key={`${item.color}-${item.qualityGroup}-${index}`}
              data-quality-group={item.qualityGroup}
              className="flex-shrink-0 w-40 md:w-full"
            >
              <QualityCard item={item} />
            </div>
          ))}

          {hasMore && (
            <div className="flex justify-center items-center py-6 flex-shrink-0 w-32 md:w-full">
              <Button
                onClick={loadMore}
                variant="outline"
                size="sm"
                className="min-w-[100px] bg-background hover:bg-accent hover:text-accent-foreground border-border transition-colors text-xs md:text-sm"
              >
                Load More
              </Button>
            </div>
          )}
        </div>

        {/* Horizontal scrollbar for mobile */}
        <ScrollBar
          orientation="horizontal"
          className="h-1 group-hover:h-2 bg-border/50 rounded-full transition-all duration-200 md:hidden"
        />

        {/* Vertical scrollbar for desktop */}
        <ScrollBar
          orientation="vertical"
          className="w-1 group-hover:w-2 bg-border/50 rounded-full transition-all duration-200 hidden md:block"
        />
      </ScrollArea>
    </div>
  );
};

export default Qualities;
