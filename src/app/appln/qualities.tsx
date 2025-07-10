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
          className="p-1 flex md:flex-col sm:flex-row md:space-y-3 sm:space-x-1"
          ref={scrollAreaRef}
        >
          {displayedQualities.map((item, index) => (
            <div
              key={`${item.color}-${item.qualityGroup}-${index}`}
              data-quality-group={item.qualityGroup} // Add data attribute for easier querying
            >
              <QualityCard item={item} />
            </div>
          ))}
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button onClick={loadMore} variant="outline">
                Load More
              </Button>
            </div>
          )}
        </div>
        <ScrollBar
          orientation="horizontal"
          className="h-1 group-hover:h-3 w-32 bg-foreground/50 rounded-full cursor-pointer absolute mx-auto p-0 transition-all duration-150"
        />
      </ScrollArea>
    </div>
  );
};

export default Qualities;
