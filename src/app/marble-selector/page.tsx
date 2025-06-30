"use client"
import { useState } from "react"
import ColorSelector from "./component/color-selector"
import ProductBentoGrid from "./component/product-bento-grid"
import { marbleColors, MarbleColor } from "@/data/colors"
import { marbleProducts, Product } from "@/data/products"
import MarbleCarousel from "./component/marble-carousel"

const MarbleFilter = () => {
  const [selectedColor, setSelectedColor] = useState<MarbleColor | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleColorSelect = (color: MarbleColor | null) => {
    setSelectedColor(color)
    setSelectedProduct(null)
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
  }
  
  const colorSelector = (
    <ColorSelector
      colors={marbleColors}
      selectedColor={selectedColor} 
      onColorSelect={handleColorSelect} 
    />
  )
  
  const marbleCarousel = (
    <MarbleCarousel
      products={marbleProducts}
      selectedColor={selectedColor} 
      selectedProduct={selectedProduct}
      onClearFilter={() => handleColorSelect(null)}
      onProductSelect={handleProductSelect}
    />
  )

  const productBentoGrid = (
    <ProductBentoGrid
      selectedProduct={selectedProduct}
    />
  )

  return (
    <>
      {/* Large screen */}
      <div className="hidden relative h-[calc(100vh-2.5rem)] max-w-6xl mx-auto lg:block w-full bg-background overflow-hidden">
        {/* Header - Color Selector */}
        <div className="relative z-30 border-b border-muted p-2 shadow-sm bg-background">
          {colorSelector}
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden relative z-10">
          {/* Sidebar - Product Carousel */}
          <div className="w-1/4 p-2 relative z-20 bg-background">
            {marbleCarousel}
          </div>
          
          {/* Main Content - Bento Grid */}
          <div className="flex-1 p-2 overflow-y-auto relative z-10">
            {productBentoGrid}
          </div>
        </div>
      </div>
      
      {/* Medium screen */}
      <div className="hidden p-2 sm:flex md:flex lg:hidden flex-col relative min-h-screen">
        {/* Main content area with proper spacing for bottom bar */}
        <div className="flex-1 relative z-10">
          {productBentoGrid}
        </div>
        
        {/* Fixed bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-muted p-2 z-40 shadow-lg">
          <div className="space-y-2">
            {marbleCarousel}
            {colorSelector}
          </div>
        </div>
      </div>

      {/* Small screen - mobile layout */}
      <div className="block sm:hidden relative min-h-screen">
        {/* Main content with bottom padding */}
        <div className="pb-40 relative z-10">
          {productBentoGrid}
        </div>
        
        {/* Fixed bottom controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-muted p-2 z-40 shadow-lg">
          <div className="space-y-3">
            {marbleCarousel}
            {colorSelector}
          </div>
        </div>
      </div>
    </>
  )
}

export default MarbleFilter