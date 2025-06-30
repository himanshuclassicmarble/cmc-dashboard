"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import type { Product } from "@/data/products"
import type { MarbleColor } from "@/data/colors"
import { X, Package, ArrowRight, Search, Check } from "lucide-react"
import { useState } from "react"

interface MarbleCarouselProps {
  products: Product[]
  selectedColor: MarbleColor | null
  selectedProduct: Product | null
  onClearFilter: () => void
  onProductSelect: (product: Product) => void
  isLoading?: boolean
}

const MarbleCarousel = ({
  products,
  selectedColor,
  selectedProduct,
  onClearFilter,
  onProductSelect,
  isLoading = false,
}: MarbleCarouselProps) => {
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)

  // Filter products based on color and search query
  const filteredProducts = searchQuery
    ? products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : selectedColor
      ? products.filter((product) => product.colorId === selectedColor.id)
      : products

  // Image loading handlers
  const handleImageLoad = (productId: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [productId]: false }))
  }

  const handleImageLoadStart = (productId: string) => {
    setImageLoadingStates((prev) => ({ ...prev, [productId]: true }))
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border">
              <CardContent className="p-2 flex gap-2">
                <Skeleton className="h-20 w-20 rounded-none" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col max-h-full">
      {/* Search and Header */}
      <div className="p-2 flex flex-col gap-2 border-b flex-shrink-0">
        {/* Search Command with Popover */}
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full h-8 justify-start text-muted-foreground bg-background text-sm border-border hover:bg-accent hover:text-accent-foreground transition-colors">
              <Search className="w-4 h-4 mr-2 text-muted-foreground" />
              {searchQuery || "Search marbles..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0 border-border shadow-lg" align="start">
            <Command>
              <CommandInput
                placeholder="Search marbles..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="text-sm border-0 focus:ring-0"
                aria-label="Search marbles by name"
              />
              <CommandList className="max-h-60">
                <CommandEmpty className="py-6 text-center text-muted-foreground">No marbles found.</CommandEmpty>
                <CommandGroup>
                  {filteredProducts.map((product) => (
                    <CommandItem
                      key={product.id}
                      value={product.name}
                      onSelect={() => {
                        onProductSelect(product)
                        setSearchQuery("")
                        setSearchOpen(false)
                      }}
                      className="flex items-center gap-2 text-sm py-2 px-2 hover:bg-accent transition-colors"
                    >
                      <div className="w-6 h-6 relative rounded-none overflow-hidden border border-border">
                        <Image
                          src={product.image }
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-foreground">{product.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-foreground leading-tight">
              {selectedColor ? `${selectedColor.name}` : "Marble Collection"}
            </h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-sm">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
            </span>
          </div>
          {(selectedColor || searchQuery) && (
            <Button
              variant="outline"
              onClick={() => {
                onClearFilter()
                setSearchQuery("")
              }}
              className="text-xs text-muted-foreground hover:text-foreground hover:bg-accent border-border gap-1 px-2 py-1 transition-colors"
              aria-label="Clear filters"
            >
              <X className="w-3 h-3" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Product Display */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-2">
            <Card className="border-border">
              <CardContent className="text-center py-10">
                <div className="mx-auto w-10 h-10 bg-muted rounded-sm flex items-center justify-center mb-2 shadow-sm">
                  <Package className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2">No Products Found</h3>
                <p className="text-xs text-muted-foreground mb-4">No matching marble products. View all products.</p>
                <Button
                  onClick={() => {
                    onClearFilter()
                    setSearchQuery("")
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs gap-1 px-2 py-1 shadow-sm transition-colors"
                >
                  All Products
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Small Screen - Horizontal Carousel */}
            <div className="md:hidden h-full p-2">
              <Carousel
                className="w-full h-full"
                opts={{
                  align: "start",
                  loop: false,
                }}
              >
                <CarouselContent className="h-full -ml-2">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProduct?.id === product.id
                    const isImageLoading = imageLoadingStates[product.id]

                    return (
                      <CarouselItem key={product.id} className="pl-2 basis-3/2 sm:basis-1/2">
                        <Card
                          className={`p-0 group cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] overflow-hidden h-24 rounded-none border-2 ${
                            isSelected
                              ? "border-primary shadow-md scale-[1.01] bg-primary/5"
                              : "border-border hover:border-primary/50 bg-card"
                          }`}
                          onClick={() => onProductSelect(product)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              onProductSelect(product)
                            }
                          }}
                          aria-label={`Select ${product.name}`}
                        >
                          <CardContent className="p-0 h-full relative">
                            {isImageLoading && (
                              <div className="absolute inset-0 z-10">
                                <Skeleton className="w-full h-full rounded-none" />
                              </div>
                            )}
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              loading="lazy"
                              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                                isImageLoading ? "opacity-0" : "opacity-100"
                              }`}
                              onLoadingComplete={() => handleImageLoad(product.id)}
                              onLoadStart={() => handleImageLoadStart(product.id)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2">
                              <h3 className="text-white font-medium text-xs leading-tight drop-shadow-sm truncate">
                                {product.name}
                              </h3>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2">
                                <div className="w-4 h-4 bg-primary rounded-none flex items-center justify-center shadow-sm border border-primary-foreground">
                                  <Check className="w-2 h-2 text-primary-foreground" />
                                </div>
                              </div>
                            )}
                            <div className={`absolute inset-0 transition-opacity duration-200 ${
                              isSelected ? "bg-primary/10 opacity-100" : "bg-primary/5 opacity-0 group-hover:opacity-100"
                            }`} />
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-1 bg-background border-border hover:bg-accent shadow-sm" />
                <CarouselNext className="right-1 bg-background border-border hover:bg-accent shadow-sm" />
              </Carousel>
            </div>

            {/* Medium and Large Screens - Horizontal Carousel */}
            <div className="hidden md:block lg:hidden h-full p-2">
              <Carousel
                className="w-full h-full"
                opts={{
                  align: "start",
                  loop: false,
                }}
              >
                <CarouselContent className="h-full -ml-2">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProduct?.id === product.id
                    const isImageLoading = imageLoadingStates[product.id]

                    return (
                      <CarouselItem key={product.id} className="pl-2 basis-1/3 lg:basis-1/4">
                        <Card
                          className={`p-0 group cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] overflow-hidden h-24 rounded-none border-2 ${
                            isSelected
                              ? "border-primary shadow-md scale-[1.01] bg-primary/5"
                              : "border-border hover:border-primary/50 bg-card"
                          }`}
                          onClick={() => onProductSelect(product)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              onProductSelect(product)
                            }
                          }}
                          aria-label={`Select ${product.name}`}
                        >
                          <CardContent className="p-0 h-full relative">
                            {isImageLoading && (
                              <div className="absolute inset-0 z-10">
                                <Skeleton className="w-full h-full rounded-none" />
                              </div>
                            )}
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              loading="lazy"
                              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                                isImageLoading ? "opacity-0" : "opacity-100"
                              }`}
                              onLoadingComplete={() => handleImageLoad(product.id)}
                              onLoadStart={() => handleImageLoadStart(product.id)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                            <div className="absolute bottom-2 left-2 right-2">
                              <h3 className="text-white font-medium text-xs leading-tight drop-shadow-sm truncate">
                                {product.name}
                              </h3>
                            </div>
                            {isSelected && (
                              <div className="absolute top-2 right-2">
                                <div className="w-4 h-4 bg-primary rounded-none flex items-center justify-center shadow-sm border border-primary-foreground">
                                  <Check className="w-2 h-2 text-primary-foreground" />
                                </div>
                              </div>
                            )}
                            <div className={`absolute inset-0 transition-opacity duration-200 ${
                              isSelected ? "bg-primary/10 opacity-100" : "bg-primary/5 opacity-0 group-hover:opacity-100"
                            }`} />
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious className="left-1 bg-background border-border hover:bg-accent shadow-sm" />
                <CarouselNext className="right-1 bg-background border-border hover:bg-accent shadow-sm" />
              </Carousel>
            </div>

            {/* Large Screens - Scrollable Grid */}
            <div className="hidden lg:block h-full p-2">
              <ScrollArea className="h-[calc(100vh-15rem)] w-full">
                <div className="grid grid-cols-1 gap-2 pb-2">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProduct?.id === product.id
                    const isImageLoading = imageLoadingStates[product.id]

                    return (
                      <Card
                        key={product.id}
                        className={`p-0 group cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] overflow-hidden h-24 rounded-none border-2 ${
                          isSelected
                            ? "border-primary scale-[1.01] bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50 bg-card"
                        }`}
                        onClick={() => onProductSelect(product)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            onProductSelect(product)
                          }
                        }}
                        aria-label={`Select ${product.name}`}
                      >
                        <CardContent className="p-0 h-full relative">
                          {isImageLoading && (
                            <div className="absolute inset-0 z-10">
                              <Skeleton className="w-full h-full rounded-none" />
                            </div>
                          )}
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            loading="lazy"
                            className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                              isImageLoading ? "opacity-0" : "opacity-100"
                            }`}
                            onLoadingComplete={() => handleImageLoad(product.id)}
                            onLoadStart={() => handleImageLoadStart(product.id)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2">
                            <h3 className="text-white font-medium text-xs leading-tight drop-shadow-sm truncate">
                              {product.name}
                            </h3>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2">
                              <div className="w-4 h-4 bg-primary rounded-none flex items-center justify-center shadow-sm border border-primary-foreground">
                                <Check className="w-2 h-2 text-primary-foreground" />
                              </div>
                            </div>
                          )}
                          <div className={`absolute inset-0 transition-opacity duration-200 ${
                            isSelected ? "bg-primary/10 opacity-100" : "bg-primary/5 opacity-0 group-hover:opacity-100"
                          }`} />
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </ScrollArea>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MarbleCarousel