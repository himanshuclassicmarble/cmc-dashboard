"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { MarbleColor } from "@/data/colors"
import { Check } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ColorSelectorProps {
  colors: MarbleColor[]
  selectedColor: MarbleColor | null
  onColorSelect: (color: MarbleColor | null) => void
}

const ColorSelector = ({ colors, selectedColor, onColorSelect }: ColorSelectorProps) => {
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({})

  const handleColorSelect = (color: MarbleColor) => {
    onColorSelect(selectedColor?.id === color.id ? null : color)
  }

  // Image loading handlers
  const handleImageLoad = (colorId: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [colorId]: false }))
  }

  const handleImageLoadStart = (colorId: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [colorId]: true }))
  }

  return (
    <div className="w-full space-y-4">
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
        }}
        className="w-full no-scrollbar"
      >
        <CarouselContent className="flex gap-3">
          {colors.map((color) => {
            const isSelected = selectedColor?.id === color.id
            const isImageLoading = imageLoadingStates[color.id]

            return (
              <CarouselItem key={color.id} className="basis-[150px] snap-center">
                <Card
                  className={`p-0 group cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] overflow-hidden h-[72px] rounded-none border-2 ${
                    isSelected
                      ? "border-primary shadow-md scale-[1.01] bg-primary/5"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                  onClick={() => handleColorSelect(color)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleColorSelect(color)
                    }
                  }}
                  aria-label={`Select ${color.name} color`}
                >
                  <CardContent className="p-0 h-full relative">
                    {/* Color Image */}
                    <Image
                      src={color.image}
                      alt={color.name}
                      fill
                      loading="lazy"
                      className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                        isImageLoading ? "opacity-0" : "opacity-100"
                      }`}
                      onLoadingComplete={() => handleImageLoad(color.id)}
                      onLoadStart={() => handleImageLoadStart(color.id)}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    
                    {/* Color Name */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white font-medium text-xs leading-tight drop-shadow-sm truncate">
                        {color.name}
                      </h3>
                    </div>
                    
                    {/* Selection Indicator - Updated to match MarbleCarousel */}
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <div className="w-4 h-4 bg-primary rounded-none flex items-center justify-center shadow-sm border border-primary-foreground">
                          <Check className="w-2 h-2 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                    
                    {/* Color Swatch */}
                    <div
                      className="absolute top-2 left-2 w-3 h-3 border border-white shadow-sm"
                      style={{ backgroundColor: color.hexColor }}
                    />

                    {/* Hover/Selection Overlay - Added to match MarbleCarousel */}
                    <div className={`absolute inset-0 transition-opacity duration-200 ${
                      isSelected ? "bg-primary/10 opacity-100" : "bg-primary/5 opacity-0 group-hover:opacity-100"
                    }`} />
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default ColorSelector