"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { IMG_PATH_CROP, IMG_PATH_URL } from "@/lib/consts";
import { QualitiesType } from "./types";

interface QualityCardProps {
  item: QualitiesType;
  className?: string;
}

const QualityCard = ({ item, className }: QualityCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSelected = searchParams.get("qualityGroup") === item.qualityGroup;
  const colorImage = `${IMG_PATH_URL}/${IMG_PATH_CROP}/${item.imageName}.webp`;

  const handleQualitySelect = () => {
    const query = new URLSearchParams(searchParams.toString());
    if (isSelected) {
      query.delete("qualityGroup");
    } else {
      query.set("qualityGroup", item.qualityGroup ?? "");
    }
    router.push(`?${query.toString()}`, { scroll: false });
  };

  return (
    <Card
      className={cn(
        "relative p-0 m-1 h-20 min-w-32 cursor-pointer overflow-hidden rounded-xl md:rounded-lg border transition-all duration-200",
        isSelected
          ? "ring-2 ring-offset-1 ring-primary"
          : "border-muted hover:border-primary",
        className,
      )}
      role="button"
      tabIndex={0}
      aria-label={`${isSelected ? "Deselect" : "Select"} quality ${item.qualityGroup}`}
      onClick={handleQualitySelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleQualitySelect();
        }
      }}
    >
      <CardContent className="relative h-full w-full p-0 rounded-md">
        {/* Image background */}
        <div className="absolute inset-0 rounded-md overflow-hidden z-0">
          <Image
            src={colorImage}
            alt={`${item.color} swatch`}
            fill
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-2 left-0 z-10 w-full px-2 text-xs font-medium capitalize text-white drop-shadow-sm flex flex-row justify-between items-center gap-4">
          <div className={cn("h-5 text-[10px] font-thin")}>
            {item.qualityGroup}-{item.color}
          </div>
          <div className={cn("h-5 text-[10px] font-semibold")}>
            {(item.count ?? 0).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualityCard;
