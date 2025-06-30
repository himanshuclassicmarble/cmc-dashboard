"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {ZoomIn, Palette, Sparkles, X, ChevronLeft, ChevronRight, Grid3X3 } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/data/products"
import { marbleColors } from "@/data/colors"
import { productImages } from "@/data/bentoData"
import { DialogTitle } from "@radix-ui/react-dialog"

interface ProductShowcaseProps {
  selectedProduct: Product | null
}

interface ImageWithCategory {
  url: string
  category: string
}

const ProductShowcase = ({ selectedProduct }: ProductShowcaseProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogImageIndex, setDialogImageIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  if (!selectedProduct) {
    return (
      <Card className="w-full h-[calc(100vh-10rem)] flex items-center justify-center">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-20 h-20">
              <div className="w-full h-full bg-muted rounded-2xl flex items-center justify-center">
                <Palette className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Select a Marble</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Get images for the selected product with category information
  const productImageData = productImages[selectedProduct.id] || {}
  const categories = ["all", ...Object.keys(productImageData)]

  // Create images array with category information
  const imagesWithCategory: ImageWithCategory[] =
    selectedCategory === "all"
      ? Object.entries(productImageData).flatMap(([category, urls]) => urls.map((url) => ({ url, category })))
      : (productImageData[selectedCategory] || []).map((url) => ({ url, category: selectedCategory }))

  const handleImageClick = (imageIndex: number) => {
    setDialogImageIndex(imageIndex)
    setDialogOpen(true)
  }

  const currentColor = marbleColors.find((color) => color.id === selectedProduct.colorId)

  return (
    <div className="w-full relative">
      {/* Responsive Header with proper z-index */}
      <div className="p-0 gap-2 rounded-none shadow-none border-0 relative z-20">
          <div className="p-2 lg:h-12 md:h-12">
          {/* Mobile Layout - Stacked */}
          <div className="flex flex-col gap-3 sm:hidden h-full justify-center">
            {/* First Row - Product Info */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-3 h-3 rounded-full border border-muted shadow-sm flex-shrink-0"
                style={{ backgroundColor: currentColor?.hexColor }}
              />
              <h1 className="text-sm font-medium truncate flex-1 min-w-0">
                {selectedProduct.name}
              </h1>
              <Badge variant="outline" className="text-xs px-2 py-0.5 font-medium tracking-wide flex-shrink-0">
                {currentColor?.name}
              </Badge>
            </div>
            
            {/* Second Row - Controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-7 min-w-[100px] text-xs px-2">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="min-w-[160px]">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all"
                          ? "All Images"
                          : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">{imagesWithCategory.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tablet Layout - Wrapped */}
          <div className="hidden sm:flex lg:hidden flex-wrap items-center justify-between gap-3 h-full">
            {/* Left Side */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-3 h-3 rounded-full border border-muted shadow-sm flex-shrink-0"
                  style={{ backgroundColor: currentColor?.hexColor }}
                />
                <h1 className="text-sm font-medium truncate">
                  {selectedProduct.name}
                </h1>
              </div>
              
              <Badge variant="outline" className="text-xs px-2 py-0.5 font-medium tracking-wide flex-shrink-0">
                {currentColor?.name}
              </Badge>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-8 min-w-[120px] text-sm px-2">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="min-w-[180px]">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all"
                        ? "All Images"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Grid3X3 className="w-4 h-4" />
                <span className="text-sm font-medium">{imagesWithCategory.length}</span>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Single Row */}
          <div className="hidden lg:flex items-center justify-between gap-4 h-full">
            {/* Left Side */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-3 h-3 rounded-full border border-muted shadow-sm flex-shrink-0"
                  style={{ backgroundColor: currentColor?.hexColor }}
                />
                <h1 className="text-base font-medium truncate">
                  {selectedProduct.name}
                </h1>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant="outline" className="text-xs px-2 py-0.5 font-medium tracking-wide">
                  {currentColor?.name}
                </Badge>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-8 min-w-[140px] text-sm px-2">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="min-w-[200px]">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all"
                        ? "All Images"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Grid3X3 className="w-4 h-4" />
                <span className="text-sm font-medium">{imagesWithCategory.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Image Gallery */}
      <Card className="w-full h-full p-0 gap-2 rounded-none shadow-none border border-border relative z-10">
        <CardContent className="p-2">
          {imagesWithCategory.length > 0 ? (
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-2">
                {imagesWithCategory.map((imageData, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 basis-full sm:basis-1/2 lg:basis-1/3 transition-all"
                  >
                    <div
                      className="relative w-full h-[calc(100vh-13rem)] group cursor-pointer overflow-hidden bg-muted hover:shadow-md transition-all duration-300"
                      onClick={() => handleImageClick(index)}
                    >
                      {/* Image */}
                      <Image
                        src={imageData.url}
                        alt={`${selectedProduct.name} - ${imageData.category}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category Badge */}
                      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        <Badge
                          variant="secondary"
                          className="bg-background/80 text-foreground text-xs font-medium"
                        >
                          {imageData.category.charAt(0).toUpperCase() + imageData.category.slice(1)}
                        </Badge>
                      </div>

                      {/* View Button */}
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-7 px-2 shadow-sm text-xs"
                        >
                          <ZoomIn className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Carousel Arrows */}
              <CarouselPrevious className="hidden md:flex -left-4" />
              <CarouselNext className="hidden md:flex -right-4" />
            </Carousel>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted flex items-center justify-center">
                <Grid3X3 className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium">
                No images available for this category
              </p>
              <p className="text-muted-foreground/60 text-sm mt-1">
                Try selecting a different category
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Premium Fullscreen Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 border-none bg-black z-[9999]">
          <div className="relative w-full h-full overflow-hidden">
            {/* Top Overlay Bar */}
            <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-2 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
                {/* Product Name Badge */}
                <Badge variant="outline" className="bg-black/30 text-white border-white/30 backdrop-blur-sm text-xs sm:text-sm flex-shrink-0">
                  {selectedProduct.name}
                </Badge>

                {/* Color Indicator - Hidden on very small screens */}
                <div className="hidden xs:flex items-center gap-2 flex-shrink-0">
                  <div
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: currentColor?.hexColor }}
                  />
                  <span className="text-white/80 text-xs sm:text-sm font-medium truncate">{currentColor?.name}</span>
                </div>

                {/* Category Badge - Hidden on small screens */}
                {imagesWithCategory[dialogImageIndex] && (
                  <Badge
                    variant="secondary"
                    className="hidden sm:inline-flex bg-black/30 text-white/90 border-white/20 backdrop-blur-sm text-xs"
                  >
                    {imagesWithCategory[dialogImageIndex].category.charAt(0).toUpperCase() +
                      imagesWithCategory[dialogImageIndex].category.slice(1)}
                  </Badge>
                )}
              </div>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm flex-shrink-0"
                onClick={() => setDialogOpen(false)}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>

            {/* Fullscreen Image */}
            {imagesWithCategory[dialogImageIndex] && (
              <Image
                src={imagesWithCategory[dialogImageIndex].url || "/placeholder.svg"}
                alt={`${selectedProduct.name} - ${imagesWithCategory[dialogImageIndex].category}`}
                fill
                className="object-cover"
                priority
              />
            )}

            {/* Bottom Overlay Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center">
              <Badge
                variant="outline"
                className="bg-black/30 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
              >
                {dialogImageIndex + 1} of {imagesWithCategory.length}
              </Badge>
            </div>

            {/* Navigation Arrows */}
            {imagesWithCategory.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 border-white/30 backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10"
                  onClick={() =>
                    setDialogImageIndex((prev) =>
                      prev === 0 ? imagesWithCategory.length - 1 : prev - 1
                    )
                  }
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 border-white/30 backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10"
                  onClick={() =>
                    setDialogImageIndex((prev) =>
                      prev === imagesWithCategory.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductShowcase