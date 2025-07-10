"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearchParams } from "next/navigation";
import ApplnImgCard from "./appln-img-card";
import { ApplnImgType } from "./types";

const ApplnImg = ({
  applnImgs,
}: {
  applnImgs: ApplnImgType[] | null | undefined;
}) => {
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("color") || "";
  const selectedQualityGroup = searchParams.get("qualityGroup") || "";
  const selectedAppln = searchParams.get("appln") || "";

  // Filter images based on color, quality, and application
  let filteredImages = applnImgs;
  if (selectedColor) {
    filteredImages = filteredImages?.filter(
      (img) => img.color === selectedColor,
    );
  }
  if (selectedQualityGroup) {
    filteredImages = filteredImages?.filter(
      (img) => img.qualityGroup === selectedQualityGroup,
    );
  }
  if (selectedAppln && selectedAppln !== "all") {
    filteredImages = filteredImages?.filter(
      (img) => img.appln === selectedAppln,
    );
  }

  return (
    <div className="w-full overflow-hidden p-0">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-full relative"
      >
        <CarouselContent>
          {(filteredImages?.length ?? 0) > 0 ? (
            filteredImages?.map((item, index) => (
              <CarouselItem
                key={`${item.code}-${item.appln}-${index}`}
                className="shrink-0 grow-0 basis-full  sm:basis-full lg:basis-1/2"
              >
                <ApplnImgCard
                  code={item.code ?? ""}
                  color={item.color ?? ""}
                  qualityGroup={item.qualityGroup ?? ""}
                  appln={item.appln ?? ""}
                  imageName={item.filename ?? ""}
                  className="h-[calc(100vh-8rem)] w-full"
                />
              </CarouselItem>
            ))
          ) : (
            <div className="w-full py-4 text-center text-gray-600 pl-2">
              No products found
            </div>
          )}
        </CarouselContent>
        {/* Navigation Buttons */}
        {(filteredImages?.length ?? 0) > 0 && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 bg-black/60 hover:bg-black/80 border-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-300" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 bg-black/60 hover:bg-black/80 border-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-300" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default ApplnImg;
