"use client"

import { useState } from "react"
import { Info, TrendingUp, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

// Token data interface
interface Token {
  id: string
  name: string
  symbol: string
  logo: string
  chain: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  holders: number
  verified?: boolean
  riskLevel?: "low" | "medium" | "high"
}

export default function TokenTable() {
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      logo: "/ethereum-logo.png",
      chain: "Ethereum",
      price: 3245.67,
      change24h: 2.34,
      marketCap: 389456000000,
      volume24h: 15678000000,
      holders: 4500000,
      verified: true,
      riskLevel: "low",
    },
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      logo: "/bitcoin-logo.png",
      chain: "Bitcoin",
      price: 61245.89,
      change24h: -1.23,
      marketCap: 1189456000000,
      volume24h: 32678000000,
      holders: 8900000,
      verified: true,
      riskLevel: "low",
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      logo: "/solana-logo.png",
      chain: "Solana",
      price: 145.32,
      change24h: 5.67,
      marketCap: 62456000000,
      volume24h: 4678000000,
      holders: 1200000,
      verified: true,
      riskLevel: "low",
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ADA",
      logo: "/placeholder.svg?key=ktalh",
      chain: "Cardano",
      price: 0.45,
      change24h: -0.89,
      marketCap: 15456000000,
      volume24h: 678000000,
      holders: 3500000,
      verified: true,
      riskLevel: "low",
    },
    {
      id: "binancecoin",
      name: "Binance Coin",
      symbol: "BNB",
      logo: "/placeholder.svg?key=b3o7r",
      chain: "Binance",
      price: 567.89,
      change24h: 1.45,
      marketCap: 87456000000,
      volume24h: 2678000000,
      holders: 2100000,
      verified: true,
      riskLevel: "low",
    },
    {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "DOGE",
      logo: "/dogecoin-logo.png",
      chain: "Bitcoin",
      price: 0.12,
      change24h: 12.34,
      marketCap: 16456000000,
      volume24h: 3678000000,
      holders: 4800000,
      verified: true,
      riskLevel: "medium",
    },
    {
      id: "shiba-inu",
      name: "Shiba Inu",
      symbol: "SHIB",
      logo: "/shiba-inu-logo.png",
      chain: "Ethereum",
      price: 0.00002345,
      change24h: 8.76,
      marketCap: 13456000000,
      volume24h: 1678000000,
      holders: 1200000,
      verified: true,
      riskLevel: "high",
    },
    {
      id: "polkadot",
      name: "Polkadot",
      symbol: "DOT",
      logo: "/polkadot-logo.png",
      chain: "Polkadot",
      price: 6.78,
      change24h: -2.34,
      marketCap: 8456000000,
      volume24h: 578000000,
      holders: 900000,
      verified: true,
      riskLevel: "low",
    },
  ])

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B"
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K"
    }
    return num.toString()
  }

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return price.toFixed(8)
    } else if (price < 1) {
      return price.toFixed(4)
    } else if (price < 10) {
      return price.toFixed(2)
    } else {
      return price.toFixed(2)
    }
  }

  const getRiskBadge = (risk?: string) => {
    if (!risk) return null

    switch (risk) {
      case "low":
        return <Badge className="bg-green-600 hover:bg-green-700">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-red-600 hover:bg-red-700">High Risk</Badge>
      default:
        return null
    }
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-1">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-xs uppercase text-gray-400">
              <th className="px-4 py-3 text-left">Token</th>
              <th className="px-4 py-3 text-left">Chain</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">24h Change</th>
              <th className="px-4 py-3 text-right">Market Cap</th>
              <th className="px-4 py-3 text-right">Volume (24h)</th>
              <th className="px-4 py-3 text-right">Holders</th>
              <th className="px-4 py-3 text-center">Risk Level</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-800">
                      <Image src={token.logo || "/placeholder.svg"} alt={token.name} width={32} height={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-medium">
                        <Link href={`/token/${token.id}`} className="hover:text-amber-400">
                          {token.name}
                        </Link>
                        {token.verified && <Info className="h-4 w-4 text-blue-400" />}
                      </div>
                      <div className="text-xs text-gray-400">{token.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm">{token.chain}</td>
                <td className="px-4 py-4 text-right font-medium">${formatPrice(token.price)}</td>
                <td className={`px-4 py-4 text-right ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                  <div className="flex items-center justify-end gap-1">
                    {token.change24h >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(token.change24h)}%
                  </div>
                </td>
                <td className="px-4 py-4 text-right">${formatNumber(token.marketCap)}</td>
                <td className="px-4 py-4 text-right">${formatNumber(token.volume24h)}</td>
                <td className="px-4 py-4 text-right">{formatNumber(token.holders)}</td>
                <td className="px-4 py-4 text-center">{getRiskBadge(token.riskLevel)}</td>
                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/token/${token.id}`}
                      className="rounded-md bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300 hover:bg-gray-700"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/analyze/${token.id}`}
                      className="rounded-md bg-amber-600 px-3 py-1 text-xs font-medium text-white hover:bg-amber-500"
                    >
                      Analyze
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
