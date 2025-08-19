"use client";
import React, { useEffect, useRef } from "react";
import ColorCard from "./color-card";
import { ColorType } from "./types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

const Colors = ({ colors }: { colors: ColorType[] | null }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("color") || "";

  useEffect(() => {
    if (selectedColor && scrollAreaRef.current) {
      const selectedIndex = colors?.findIndex(
        (item) => item.color === selectedColor,
      );
      if (selectedIndex !== undefined && selectedIndex !== -1) {
        const selectedElement = scrollAreaRef.current.querySelector(
          `[data-color="${selectedColor}"]`,
        );
        if (selectedElement) {
          selectedElement.scrollIntoView({
            behavior: "smooth",
            inline: "center",
          });
        }
      }
    }
  }, [selectedColor, colors]);

  return (
    <div className="w-full">
      {colors && colors.length > 0 ? (
        <ScrollArea className="group w-full whitespace-nowrap  p-0">
          <div className="flex w-max space-x-2" ref={scrollAreaRef}>
            {colors.map((item, index) => (
              <div
                key={index}
                className="w-32 shrink-0"
                data-color={item.color} // Add data attribute for easier querying
              >
                <ColorCard item={item} />
              </div>
            ))}
          </div>
          <ScrollBar
            orientation="horizontal"
            className="h-1 group-hover:h-3 w-32 bg-foreground/50 rounded-full cursor-pointer absolute mx-auto p-0 transition-all duration-150"
          />
        </ScrollArea>
      ) : (
        <div className="flex h-24 w-full items-center justify-center rounded-md border border-dashed">
          <p className="text-sm text-muted-foreground">No colors available</p>
        </div>
      )}
    </div>
  );
};

export default Colors;
