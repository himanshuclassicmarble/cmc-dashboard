"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";
import { ApplnImgCardProps } from "./types";
import { IMG_PATH_URL } from "@/lib/consts";
import { ImageIcon } from "lucide-react";

const ApplnImgCard = ({
  code,
  color,
  qualityGroup,
  appln,
  imageName,
  className,
}: ApplnImgCardProps) => {
  const imageUrl = `${IMG_PATH_URL}/webp-proj-new/${imageName}`;

  return (
    <Card
      className={cn(
        "group relative p-0 w-full overflow-hidden rounded-md border-0 bg-black shadow-2xl transition-all duration-500 ease-out",
        "select-none",
        className,
      )}
    >
      <CardContent className="relative h-full w-full p-0">
        {imageName ? (
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt={`${code} - ${color}`}
              fill
              className="object-cover object-center"
              quality={90}
            />
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="text-center">
              <div className="mb-4 h-20 w-20 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
                <ImageIcon className="h-10 w-10 text-gray-400" />
              </div>
              <span className="text-lg font-medium text-gray-300">
                Image unavailable
              </span>
            </div>
          </div>
        )}

        {/* Application badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge
            variant="secondary"
            className="bg-black/80 text-white shadow-lg backdrop-blur-md border border-white/20 px-3 py-1 font-medium text-xs"
          >
            {appln}
          </Badge>
        </div>

        <div className="absolute bottom-2 left-0 z-20">
          <div className="bg-gradient-to-r from-black via-black/40 to-transparent pl-2 pr-6 py-2 ">
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-thin text-white tracking-tight">
                  {qualityGroup}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{color}</span>
              </div>
              <div className="h-0.5 w-full bg-gradient-to-r from-yellow-500 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplnImgCard;
