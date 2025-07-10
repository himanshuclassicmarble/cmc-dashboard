"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { QualitiesType, QualitySearchProps } from "./types";

const QualitySearch = ({
  qualities,
  className,
  placeholder = "Search...",
}: QualitySearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const selectedQuality = searchParams.get("qualityGroup") || "";
  const selectedColor = searchParams.get("color") || "";

  const displayLabel = () => {
    if (selectedColor && selectedQuality) return `${selectedColor} - ${selectedQuality}`;
    if (selectedColor) return selectedColor;
    if (selectedQuality) return `Quality: ${selectedQuality}`;
    return placeholder;
  };

  const applyFilter = (color: string | null, qualityGroup: string | null) => {
    const query = new URLSearchParams(searchParams.toString());
    const same = color === selectedColor && qualityGroup === selectedQuality;

    if (same) {
      query.delete("qualityGroup");
      query.delete("color");
    } else {
      if (color) query.set("color", color);
      if (qualityGroup) query.set("qualityGroup", qualityGroup);
    }

    router.replace(`?${query.toString()}`, { scroll: false });
    setOpen(false);
  };

  const clearFilter = () => {
    const query = new URLSearchParams(searchParams.toString());
    query.delete("qualityGroup");
    query.delete("color");
    router.replace(`?${query.toString()}`, { scroll: false });
    setOpen(false);
  };

  const hasFilter = !!(selectedQuality || selectedColor);

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="w-full flex items-center justify-between rounded-md border bg-accent px-3 py-2 shadow-sm cursor-pointer">
            <div className="flex items-center gap-2 min-w-0">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="truncate text-sm">{displayLabel()}</span>
            </div>
            {hasFilter && (
              <X
                className="h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter();
                }}
              />
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No quality found.</CommandEmpty>

              {hasFilter && (
                <CommandGroup>
                  <CommandItem onSelect={clearFilter}>
                    <X className="mr-2 h-4 w-4" />
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              )}

              {/* Group qualities by color */}
              {Object.entries(
                qualities.reduce((acc, item) => {
                  const color = item.color || "Unknown";
                  if (!acc[color]) acc[color] = [];
                  acc[color].push(item);
                  return acc;
                }, {} as Record<string, QualitiesType[]>)
              ).map(([color, items]) => (
                <CommandGroup key={color} heading={color}>
                  {items.map((item, i) => {
                    const isSelected =
                      selectedColor === item.color && selectedQuality === item.qualityGroup;

                    return (
                      <CommandItem
                        key={`${item.color}-${item.qualityGroup}-${i}`}
                        onSelect={() => applyFilter(item.color, item.qualityGroup)}
                        className="text-sm"
                        value={`${item.color ?? ""} ${item.qualityGroup ?? ""}`}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span>{item.qualityGroup ?? "Unknown"}</span>
                        {item.count !== null && item.count !== undefined && (
                          <span className="ml-auto text-xs text-muted-foreground">
                            ({item.count})
                          </span>
                        )}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default QualitySearch;
