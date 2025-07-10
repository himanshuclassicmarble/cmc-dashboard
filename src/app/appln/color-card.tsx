"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ColorProps } from "./types";
import Image from "next/image";
import { IMG_PATH_URL } from "@/lib/consts";

const ColorCard = ({ item, className }: ColorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSelected = searchParams.get("color") === item.color;
  const colorImage = `${IMG_PATH_URL}/${item.imgUrl}`;

  const handleColorSelect = () => {
    const query = new URLSearchParams(searchParams.toString());

    if (isSelected) {
      query.delete("color");
      // Keep qualityGroup unchanged when deselecting
    } else {
      query.set("color", item.color ?? "");
      query.delete("qualityGroup"); // Remove qualityGroup on new color selection
    }

    router.replace(`?${query.toString()}`, { scroll: false });
  };

  return (
    <Card
      className={cn(
        "relative p-0 m-1 w-32 h-14 cursor-pointer overflow-hidden rounded-md border transition-all duration-200",
        isSelected
          ? "ring-2 ring-offset-1 ring-primary"
          : "border-muted hover:border-primary",
        className,
      )}
      role="button"
      tabIndex={0}
      aria-label={`${isSelected ? "Deselect" : "Select"} color ${item.color}`}
      onClick={handleColorSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleColorSelect();
        }
      }}
    >
      <CardContent className="relative h-full w-full p-0 rounded-md">
        <div className="absolute inset-0 rounded-md overflow-hidden z-0">
          <Image
            src={colorImage}
            alt={`${item.color} swatch`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 128px, 128px"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 z-10 w-full px-2 text-xs font-medium capitalize text-white drop-shadow-sm flex flex-row justify-between items-center gap-4 ">
          <div className="h-5 text-[10px] font-thin">{item.color}</div>
          <div className="h-5 text-[10px] font-semibold">
            {(item.count ?? 0).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorCard;
