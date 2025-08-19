"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { QualitiesType, QualitySearchProps } from "./types";

const QualitySearch = ({
  qualities,
  className,
  placeholder = "Search qualities...",
}: QualitySearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedQuality = searchParams.get("qualityGroup") || "";
  const selectedColor = searchParams.get("color") || "";

  // Set initial input value based on selected filters
  useEffect(() => {
    if (selectedColor && selectedQuality) {
      setInputValue(`${selectedColor} - ${selectedQuality}`);
    } else if (selectedColor) {
      setInputValue(selectedColor);
    } else if (selectedQuality) {
      setInputValue(`Quality: ${selectedQuality}`);
    } else {
      setInputValue("");
    }
  }, [selectedColor, selectedQuality]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const applyFilter = (color: string | null, qualityGroup: string | null) => {
    const query = new URLSearchParams(searchParams.toString());
    const same = color === selectedColor && qualityGroup === selectedQuality;

    if (same) {
      query.delete("qualityGroup");
      query.delete("color");
      setInputValue("");
    } else {
      if (color) query.set("color", color);
      if (qualityGroup) query.set("qualityGroup", qualityGroup);

      // Update input value
      if (color && qualityGroup) {
        setInputValue(`${color} - ${qualityGroup}`);
      } else if (color) {
        setInputValue(color);
      } else if (qualityGroup) {
        setInputValue(`Quality: ${qualityGroup}`);
      }
    }

    router.replace(`?${query.toString()}`, { scroll: false });
    setOpen(false);
  };

  const clearFilter = () => {
    const query = new URLSearchParams(searchParams.toString());
    query.delete("qualityGroup");
    query.delete("color");
    router.replace(`?${query.toString()}`, { scroll: false });
    setInputValue("");
    setOpen(false);
  };

  const hasFilter = !!(selectedQuality || selectedColor);

  // Filter qualities based on input value
  const filteredQualities = qualities.filter((item) => {
    const searchTerm = inputValue.toLowerCase();
    const colorMatch = item.color?.toLowerCase().includes(searchTerm);
    const qualityMatch = item.qualityGroup?.toLowerCase().includes(searchTerm);
    return colorMatch || qualityMatch;
  });

  return (
    <div className={cn("w-full relative", className)} ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 text-sm bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        {hasFilter && (
          <X
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              clearFilter();
            }}
          />
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-lg">
          <Command shouldFilter={false}>
            <CommandList className="max-h-60 overflow-y-auto ">
              {/* Add Cancel button at the top */}
              <CommandGroup>
                <CommandItem
                  onSelect={() => setOpen(false)}
                  className="cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </CommandItem>
              </CommandGroup>

              {filteredQualities.length === 0 && inputValue && (
                <CommandEmpty>No qualities found.</CommandEmpty>
              )}

              {hasFilter && (
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      clearFilter();
                    }}
                    className="cursor-pointer"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              )}

              {/* Group qualities by color */}
              {Object.entries(
                filteredQualities.reduce(
                  (acc, item) => {
                    const color = item.color || "Unknown";
                    if (!acc[color]) acc[color] = [];
                    acc[color].push(item);
                    return acc;
                  },
                  {} as Record<string, QualitiesType[]>,
                ),
              ).map(([color, items]) => (
                <CommandGroup key={color} heading={color}>
                  {items.map((item, i) => {
                    const isSelected =
                      selectedColor === item.color &&
                      selectedQuality === item.qualityGroup;
                    return (
                      <CommandItem
                        key={`${item.color}-${item.qualityGroup}-${i}`}
                        onSelect={() =>
                          applyFilter(item.color, item.qualityGroup)
                        }
                        className="text-sm cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0",
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
        </div>
      )}
    </div>
  );
};

export default QualitySearch;
