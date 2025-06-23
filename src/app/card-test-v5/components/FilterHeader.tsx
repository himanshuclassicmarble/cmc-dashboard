"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronDown, User, Building2, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the Executive interface
interface Executive {
    id: number
    name: string
    designation: string
    email: string
    avatar: string
}

const marbleTypes = [
    "Artificial",
    "Natural",
    "Ceramic",
]

const executives: Executive[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        designation: "Sales Director",
        email: "sarah.johnson@company.com",
        avatar: "https://github.com/shadcn.png",
    },
    {
        id: 2,
        name: "Michael Chen",
        designation: "Regional Manager",
        email: "michael.chen@company.com",
        avatar: "https://github.com/evilrabbit.png",
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        designation: "Account Executive",
        email: "emily.rodriguez@company.com",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 4,
        name: "David Thompson",
        designation: "Business Development",
        email: "david.thompson@company.com",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 5,
        name: "Lisa Wang",
        designation: "Senior Sales Rep",
        email: "lisa.wang@company.com",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 6,
        name: "James Wilson",
        designation: "Territory Manager",
        email: "james.wilson@company.com",
        avatar: "/placeholder.svg?height=32&width=32",
    },
]

const timePeriods = [
    { value: "Today", label: "Today" },
    { value: "MTD", label: "MTD" },
    { value: "YTD", label: "YTD" }
]

export default function Component() {
    const [activeTab, setActiveTab] = useState("Today")
    const [selectedMarble, setSelectedMarble] = useState("")
    const [selectedExecutive, setSelectedExecutive] = useState<Executive | null>(null)
    const [open, setOpen] = useState(false)
    const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false)

    // Get current date information
    const currentDate = new Date()
    const getDateDisplay = () => {
        switch (activeTab) {
            case "Today":
                return currentDate.toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                })
            case "MTD":
                return currentDate.toLocaleDateString('en-GB', { 
                    month: 'long', 
                    year: 'numeric' 
                })
            case "YTD":
                // Financial year starts from April 1st
                const currentYear = currentDate.getFullYear()
                const currentMonth = currentDate.getMonth() + 1
                const fyStartYear = currentMonth >= 4 ? currentYear : currentYear - 1
                const fyEndYear = fyStartYear + 1
                return `FY ${fyStartYear}-${fyEndYear.toString().slice(-2)}`
            default:
                return ""
        }
    }

    return (
        <div className="w-full h-8 bg-background border-b border-border">
            <div className="container mx-auto px-3 h-full">
                <div className="flex items-center justify-between h-full gap-2 sm:gap-3">
                    {/* Left side - Tabs/Dropdown with Date */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Desktop Tabs */}
<div className="hidden sm:flex items-center gap-2">
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
        <TabsList className="grid grid-cols-3 h-6 p-0.5 bg-muted/50 border border-border/50">
            {timePeriods.map((period) => (
                <TabsTrigger
                    key={period.value}
                    value={period.value}
                    className={cn(
                        "text-xs px-2 h-5 font-medium transition-all duration-200",
                        "text-muted-foreground hover:text-foreground",
                        "data-[state=active]:bg-blue-500 data-[state=active]:text-foreground",
                        "data-[state=active]:shadow-none data-[state=active]:border data-[state=active]:border-border/50",
                        "hover:bg-muted/30 rounded-sm"
                    )}
                >
                    {period.label}
                </TabsTrigger>
            ))}
        </TabsList>
    </Tabs>
    
    {/* Date display for desktop */}
    <div className="flex items-center gap-1 px-2 py-0.5 bg-muted/30 border border-border/50 rounded-md">
        <Calendar className="h-3 w-3 text-muted-foreground" />
        <span className="text-xs font-medium text-foreground">
            {getDateDisplay()}
        </span>
    </div>
</div>
                        {/* Mobile Dropdown with Date */}
                        <div className="flex sm:hidden items-center gap-2">
                            <DropdownMenu open={periodDropdownOpen} onOpenChange={setPeriodDropdownOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-6 px-2 text-xs rounded-sm border-border bg-background hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {activeTab}
                                        <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-32 rounded-md border border-border bg-popover">
                                    {timePeriods.map((period) => (
                                        <DropdownMenuItem
                                            key={period.value}
                                            onClick={() => {
                                                setActiveTab(period.value)
                                                setPeriodDropdownOpen(false)
                                            }}
                                            className={cn(
                                                "text-xs rounded-sm py-1.5 px-2 font-medium cursor-pointer",
                                                activeTab === period.value && "bg-accent text-accent-foreground"
                                            )}
                                        >
                                            <Check className={cn("mr-2 h-3 w-3", activeTab === period.value ? "opacity-100" : "opacity-0")} />
                                            {period.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            
                            {/* Date display for mobile */}
                            <div className="flex items-center px-1.5 py-0.5 bg-accent border border-border rounded-sm">
                                <span className="text-xs font-medium text-accent-foreground">
                                    {getDateDisplay()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Filters */}
                    <div className="flex items-center gap-2">
                        {/* Marble Type Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={cn(
                                        "h-6 px-2 text-xs rounded-sm border-border bg-background hover:bg-accent hover:text-accent-foreground",
                                        selectedMarble && "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                                    )}
                                >
                                    {/* Mobile: Show icon only */}
                                    <div className="flex items-center sm:hidden">
                                        <Building2 className="h-3 w-3" />
                                        {selectedMarble && (
                                            <div className="ml-1 w-1.5 h-1.5 bg-primary rounded-full"></div>
                                        )}
                                    </div>
                                    {/* Desktop: Show text */}
                                    <div className="hidden sm:flex items-center">
                                        <Building2 className="h-3 w-3 mr-1" />
                                        <span className="truncate max-w-16">
                                            {selectedMarble || "Division"}
                                        </span>
                                    </div>
                                    <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 rounded-md border border-border bg-popover">
                                <DropdownMenuItem
                                    onClick={() => setSelectedMarble("")}
                                    className={cn(
                                        "text-xs rounded-sm py-1.5 px-2 font-medium cursor-pointer",
                                        !selectedMarble && "bg-accent text-accent-foreground"
                                    )}
                                >
                                    <Check className={cn("mr-2 h-3 w-3", !selectedMarble ? "opacity-100" : "opacity-0")} />
                                    All Types
                                </DropdownMenuItem>
                                {marbleTypes.map((marble) => (
                                    <DropdownMenuItem
                                        key={marble}
                                        onClick={() => setSelectedMarble(marble)}
                                        className={cn(
                                            "text-xs rounded-sm py-1.5 px-2 font-medium cursor-pointer",
                                            selectedMarble === marble && "bg-accent text-accent-foreground"
                                        )}
                                    >
                                        <Check className={cn("mr-2 h-3 w-3", selectedMarble === marble ? "opacity-100" : "opacity-0")} />
                                        {marble}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Executive Selection Combobox */}
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={cn(
                                        "h-6 px-2 text-xs rounded-sm border-border bg-background hover:bg-accent hover:text-accent-foreground",
                                        selectedExecutive && "bg-secondary/50 border-secondary text-secondary-foreground hover:bg-secondary/70"
                                    )}
                                >
                                    {/* Mobile: Show avatar or user icon */}
                                    <div className="flex items-center sm:hidden">
                                        {selectedExecutive ? (
                                            <Avatar className="h-4 w-4">
                                                <AvatarImage src={selectedExecutive.avatar} />
                                                <AvatarFallback className="text-xs bg-secondary">
                                                    {selectedExecutive.name
                                                        .split(" ")
                                                        .map((n: string) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                        ) : (
                                            <User className="h-3 w-3" />
                                        )}
                                    </div>
                                    
                                    {/* Desktop: Show full content */}
                                    <div className="hidden sm:flex items-center">
                                        {selectedExecutive ? (
                                            <div className="flex items-center gap-1">
                                                <Avatar className="h-4 w-4">
                                                    <AvatarImage src={selectedExecutive.avatar} />
                                                    <AvatarFallback className="text-xs bg-secondary">
                                                        {selectedExecutive.name
                                                            .split(" ")
                                                            .map((n: string) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="truncate font-medium max-w-20">
                                                    {selectedExecutive.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <>
                                                <User className="mr-1 h-3 w-3" />
                                                <span className="truncate max-w-16">Executives</span>
                                            </>
                                        )}
                                    </div>
                                    
                                    <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-0 rounded-md border border-border bg-popover">
                                <Command className="bg-popover">
                                    <CommandInput placeholder="Search executives..." className="h-8 text-xs border-0 focus:ring-0" />
                                    <CommandList>
                                        <CommandEmpty className="text-xs py-4 text-center text-muted-foreground">No executive found.</CommandEmpty>
                                        <CommandGroup className="p-1">
                                            <CommandItem
                                                onSelect={() => {
                                                    setSelectedExecutive(null)
                                                    setOpen(false)
                                                }}
                                                className="p-2 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2 w-full">
                                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted">
                                                        <User className="h-3 w-3 text-muted-foreground" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-xs font-medium">All Executives</div>
                                                        <div className="text-xs text-muted-foreground">Show all</div>
                                                    </div>
                                                    <Check
                                                        className={cn("ml-auto h-3 w-3", selectedExecutive === null ? "opacity-100" : "opacity-0")}
                                                    />
                                                </div>
                                            </CommandItem>
                                            {executives.map((executive) => (
                                                <CommandItem
                                                    key={executive.id}
                                                    onSelect={() => {
                                                        setSelectedExecutive(executive)
                                                        setOpen(false)
                                                    }}
                                                    className="p-2 rounded-sm hover:bg-accent transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2 w-full">
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={executive.avatar} />
                                                            <AvatarFallback className="text-xs bg-muted">
                                                                {executive.name
                                                                    .split(" ")
                                                                    .map((n: string) => n[0])
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-xs font-medium truncate">{executive.name}</div>
                                                            <div className="text-xs text-muted-foreground truncate">{executive.designation}</div>
                                                            <div className="text-xs text-muted-foreground truncate">{executive.email}</div>
                                                        </div>
                                                        <Check
                                                            className={cn(
                                                                "ml-auto h-3 w-3",
                                                                selectedExecutive?.id === executive.id ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </div>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    )
}