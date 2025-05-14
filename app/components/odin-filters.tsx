"use client"

import { useState } from "react"
import { Filter, ArrowDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface OdinFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

type FilterState = {
  age: string | null
  marketCap: string | null
  ascended: string | null
}

export default function OdinFilters({ onFilterChange }: OdinFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    age: null, // null, "1mo", "2mo", "3mo", "4mo+"
    marketCap: null, // null, "under1m", "1m-5m", "5m-10m", "10m+"
    ascended: null, // null, "up", "down"
  })

  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (category: keyof FilterState, value: string | null) => {
    const newFilters = {
      ...activeFilters,
      [category]: activeFilters[category] === value ? null : value,
    }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters = {
      age: null,
      marketCap: null,
      ascended: null,
    }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(Boolean).length
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center gap-2 ${
          getActiveFilterCount() > 0 ? "border-cyan-500 text-cyan-400" : "border-gray-700 text-gray-400"
        }`}
      >
        <Filter className="h-4 w-4" />
        <span>Filter</span>
        {getActiveFilterCount() > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-medium text-black">
            {getActiveFilterCount()}
          </span>
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 ${
              activeFilters.age ? "border-cyan-500 text-cyan-400" : "border-gray-700 text-gray-400"
            }`}
          >
            <span>Age</span>
            {activeFilters.age && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-medium text-black">
                1
              </span>
            )}
            <ArrowDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-gray-900 text-white border border-gray-800">
          <DropdownMenuLabel>Filter by Age</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.age === "1mo" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("age", "1mo")}
            >
              1 Month
              {activeFilters.age === "1mo" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.age === "2mo" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("age", "2mo")}
            >
              2 Months
              {activeFilters.age === "2mo" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.age === "3mo" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("age", "3mo")}
            >
              3 Months
              {activeFilters.age === "3mo" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.age === "4mo+" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("age", "4mo+")}
            >
              4+ Months
              {activeFilters.age === "4mo+" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 ${
              activeFilters.marketCap ? "border-cyan-500 text-cyan-400" : "border-gray-700 text-gray-400"
            }`}
          >
            <span>Market Cap</span>
            {activeFilters.marketCap && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-medium text-black">
                1
              </span>
            )}
            <ArrowDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-gray-900 text-white border border-gray-800">
          <DropdownMenuLabel>Filter by Market Cap</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.marketCap === "under1m" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("marketCap", "under1m")}
            >
              Under $1M
              {activeFilters.marketCap === "under1m" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.marketCap === "1m-5m" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("marketCap", "1m-5m")}
            >
              $1M - $5M
              {activeFilters.marketCap === "1m-5m" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.marketCap === "5m-10m" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("marketCap", "5m-10m")}
            >
              $5M - $10M
              {activeFilters.marketCap === "5m-10m" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.marketCap === "10m+" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("marketCap", "10m+")}
            >
              $10M+
              {activeFilters.marketCap === "10m+" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 ${
              activeFilters.ascended ? "border-cyan-500 text-cyan-400" : "border-gray-700 text-gray-400"
            }`}
          >
            <span>Ascended</span>
            {activeFilters.ascended && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-medium text-black">
                1
              </span>
            )}
            <ArrowDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-gray-900 text-white border border-gray-800">
          <DropdownMenuLabel>Filter by Ascended</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.ascended === "up" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("ascended", "up")}
            >
              Ascending
              {activeFilters.ascended === "up" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`flex items-center justify-between cursor-pointer ${
                activeFilters.ascended === "down" ? "bg-cyan-950/30 text-cyan-400" : ""
              }`}
              onClick={() => handleFilterChange("ascended", "down")}
            >
              Descending
              {activeFilters.ascended === "down" && <Check className="h-4 w-4 text-cyan-400" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {getActiveFilterCount() > 0 && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
          <X className="mr-1 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
