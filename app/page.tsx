"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, Filter, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TokenTable from "@/app/components/token-table"
import React from "react"
import type { Token } from "./types/token"

interface ApiToken {
  id: string
  name: string
  symbol: string
  contractStatus: "Verified" | "Unverified" | "Suspicious"
  riskLevel: "low" | "medium" | "high" | "critical"
  age: string
  created_time: string
  marketCap: string
  sats: string
  change5m: string
  change1h: string
  change6h: string
  change24h: string
  volume: {
    btc: number
    usd: number
  }
  txns: string
  ascended: {
    direction: "up" | "down"
    percent: number
  }
  verified: boolean
  risk: {
    level: "low" | "medium" | "high" | "critical"
    score: number
  }
  btc: {
    price: string
    change: string
  }
  usd: {
    price: string
    change: string
  }
}

function parseMarketCap(marketCap: string): number {
  if (!marketCap) return 0;
  // Remove $ and commas, handle K/M/B
  const match = marketCap.match(/\$?([\d.]+)([KMB])?/i);
  if (!match) return 0;
  let [, num, unit] = match;
  let value = parseFloat(num);
  switch ((unit || '').toUpperCase()) {
    case 'B': value *= 1e9; break;
    case 'M': value *= 1e6; break;
    case 'K': value *= 1e3; break;
  }
  return value;
}

function parseAgeToSeconds(age: string): number {
  if (!age || age === "Unknown") return 0;
  const value = parseInt(age);
  if (isNaN(value)) return 0;
  
  if (age.endsWith('s')) return value;
  if (age.endsWith('m')) return value * 60;
  if (age.endsWith('h')) return value * 3600;
  if (age.endsWith('d')) return value * 86400;
  if (age.endsWith('mo')) return value * 2592000;
  if (age.endsWith('y')) return value * 31536000;
  return 0;
}

function isValidContractStatus(status: unknown): status is "Verified" | "Unverified" | "Suspicious" {
  return typeof status === "string" && ["Verified", "Unverified", "Suspicious"].includes(status)
}

function isValidRiskLevel(level: unknown): level is "low" | "medium" | "high" | "critical" {
  return typeof level === "string" && ["low", "medium", "high", "critical"].includes(level)
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tokens, setTokens] = useState<Token[]>([])
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalTokens, setTotalTokens] = useState(0)
  const ITEMS_PER_PAGE = 50
  const [filters, setFilters] = useState({
    riskLevels: {
      low: false,
      medium: false,
      high: false,
    },
    chains: [],
    contractVerified: null,
    liquidityLocked: null,
  })
  const [sortField, setSortField] = useState("timestamp")
  const [sortDirection, setSortDirection] = useState("desc")

  const formatOdinTokenData = (token: Token) => {
    return {
      ...token,
      ageValue: parseAgeToSeconds(token.age),
      marketManipulation: {
        title:
          token.riskLevel === "low"
            ? "No Market Manipulation Detected"
            : token.riskLevel === "medium"
              ? "Potential Market Manipulation"
              : "Market Manipulation Detected",
        details:
          token.riskLevel === "low"
            ? ["Natural price movement patterns", "Diverse trading addresses"]
            : token.riskLevel === "medium"
              ? ["Unusual trading patterns detected", "30% of trades from related wallets"]
              : ["Abnormal price spikes followed by sharp drops", "Circular trading patterns detected"],
      },
      socialActivity: {
        title:
          token.riskLevel === "low"
            ? "Healthy Social Sentiment"
            : token.riskLevel === "medium"
              ? "Mixed Social Sentiment"
              : "Suspicious Social Activity",
        details:
          token.riskLevel === "low"
            ? ["Organic community growth", "Genuine discussion topics"]
            : token.riskLevel === "medium"
              ? ["Recent spike in social mentions", "Sentiment polarization"]
              : ["Coordinated shill campaign detected", "Bot-like promotion patterns"],
      },
    }
  }

  useEffect(() => {
    async function fetchTokens() {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/tokens?page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
        const data = await res.json();
        const mapped = Array.isArray(data.tokens)
          ? data.tokens.map(mapApiTokenToToken)
          : [];
        console.log('API Response:', data.tokens.slice(0, 3)); // Log first 3 tokens
        setTokens(prev => currentPage === 1 ? mapped : [...prev, ...mapped]);
        setTotalTokens(data.total || 0);
        setHasMore(mapped.length === ITEMS_PER_PAGE);
      } catch (err) {
        console.error("Failed to fetch tokens", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTokens();
  }, [currentPage]);

  // Debounced search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on new search
      setFilteredTokens([]); // Clear filtered tokens
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Optimize filtering logic
  useEffect(() => {
    if (!tokens.length) return;

    const startIndex = 0;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    let result = tokens.slice(startIndex, endIndex);

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.ticker.toLowerCase().includes(query) ||
          token.address.toLowerCase().includes(query),
      )
    }

    // Apply risk level filters
    const selectedRiskLevels = Object.entries(filters.riskLevels)
      .filter(([_, selected]) => selected)
      .map(([level]) => level)

    if (selectedRiskLevels.length > 0) {
      result = result.filter((token) => selectedRiskLevels.includes(token.riskLevel ?? ""))
    }

    // Apply chain filters - for ODIN, all tokens are on ODIN platform
    if (filters.chains.length > 0) {
      // For ODIN tokens, we could filter by other properties if needed
    }

    // Apply contract verification filter
    if (filters.contractVerified !== null) {
      result = result.filter((token) => {
        const isVerified = ["Verified", "Audited", "Established"].includes(token.contractStatus ?? "");
        return filters.contractVerified ? isVerified : !isVerified
      })
    }

    // Apply sorting
    console.log('Before sorting:', result.slice(0, 3).map(t => ({ age: t.age, ageValue: t.ageValue })));
    result = sortTokens(result)
    console.log('After sorting:', result.slice(0, 3).map(t => ({ age: t.age, ageValue: t.ageValue })));

    // Format the tokens with ODIN-specific data
    result = result.map(formatOdinTokenData)

    setFilteredTokens(result)
  }, [searchQuery, tokens, filters, sortField, sortDirection, currentPage])

  const sortTokens = (tokens: Token[]): Token[] => {
    return [...tokens].sort((a, b) => {
      if (sortField === "timestamp") {
        const aValue = a.timestamp ?? 0;
        const bValue = b.timestamp ?? 0;
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else if (typeof a[sortField as keyof Token] === "number" && typeof b[sortField as keyof Token] === "number") {
        const aValue = a[sortField as keyof Token] as number;
        const bValue = b[sortField as keyof Token] as number;
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      } else if (typeof a[sortField as keyof Token] === "string" && typeof b[sortField as keyof Token] === "string") {
        const aValue = a[sortField as keyof Token] as string;
        const bValue = b[sortField as keyof Token] as string;
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="border-b border-gray-800 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Image src="/images/forseti-logo.png" alt="Forseti" width={40} height={40} className="h-10 w-10" />
              <span className="text-2xl font-bold text-gray-100">Forsetti Scan</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                className="w-64 rounded-md border border-gray-700 bg-gray-800 pl-10 text-sm text-white placeholder-gray-400"
                placeholder="Search token name or ticker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-1">
          {isLoading && currentPage === 1 ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              <TokenTable tokens={filteredTokens} />
              {hasMore && (
                <div className="flex justify-center p-4">
                  <Button 
                    onClick={loadMore}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? 'Loading...' : 'Load More'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

function mapApiTokenToToken(apiToken: ApiToken): Token {
  const token: Token = {
    id: apiToken.id,
    name: apiToken.name,
    ticker: apiToken.symbol,
    address: apiToken.id,
    logo: `https://images.odin.fun/token/${apiToken.id}`,
    age: apiToken.age,
    ageValue: parseAgeToSeconds(apiToken.age),
    timestamp: new Date(apiToken.created_time).getTime() || 0,
    marketCap: apiToken.marketCap,
    marketCapValue: parseMarketCap(apiToken.marketCap),
    sats: typeof apiToken.sats === "number" ? apiToken.sats : Number(apiToken.sats) || 0,
    change5m: apiToken.change5m,
    change1h: apiToken.change1h,
    change6h: apiToken.change6h,
    change24h: apiToken.change24h,
    volume: {
      btc: apiToken.volume?.btc ?? 0,
      usd: apiToken.volume?.usd ?? 0,
    },
    txns: Number(apiToken.txns) || 0,
    ascended: apiToken.ascended ?? { percent: 0, direction: "up" },
    verified: apiToken.verified,
    info: false,
  };
  if (isValidContractStatus(apiToken.contractStatus)) {
    token.contractStatus = apiToken.contractStatus;
  }
  if (isValidRiskLevel(apiToken.risk)) {
    token.riskLevel = apiToken.risk;
  }
  return token;
}