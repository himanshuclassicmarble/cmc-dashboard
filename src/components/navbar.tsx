import React from 'react'
import DarkModeToggle from './dark-mode-toggle'

const Navbar = () => {
  return (
    <nav className="h-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div className="font-semibold text-lg">
            Logo
          </div>
          
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar