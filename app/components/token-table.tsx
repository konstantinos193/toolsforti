"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Token } from "../types/token"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, BarChart3, MessageCircle, Shield, ShieldCheck, TrendingUp } from "lucide-react"

interface TokenTableProps {
  tokens: Token[]
}

export default function TokenTable({ tokens }: TokenTableProps) {
  const formatNumber = (num: number | undefined | null) => {
    if (typeof num !== 'number' || isNaN(num)) return "N/A";
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  const formatBTC = (num: number | undefined | null) => {
    if (typeof num !== 'number' || isNaN(num)) return "0";
    return num.toFixed(8).replace(/\.?0+$/, '');
  }

  const formatUSD = (num: number | undefined | null) => {
    if (typeof num !== 'number' || isNaN(num)) return "0";
    return `$${num.toFixed(2)}`;
  }

  const getChangeClass = (change: string | null) => {
    if (!change || change === "-") return "text-gray-400"
    const value = parseFloat(change)
    return value >= 0 ? "text-green-500" : "text-red-500"
  }

  const getStatusColor = (status?: string) => {
    if (!status) return "text-gray-400"
    switch (status) {
      case "Verified":
        return "text-green-500"
      case "Unverified":
        return "text-yellow-500"
      case "Suspicious":
        return "text-red-500"
      default:
        return "text-gray-400"
    }
  }

  const getRiskText = (riskLevel?: string) => {
    if (!riskLevel) return "Unknown"
    switch (riskLevel) {
      case "low":
        return "Low Risk"
      case "medium":
        return "Medium Risk"
      case "high":
        return "High Risk"
      case "critical":
        return "Critical Risk"
      default:
        return "Unknown"
    }
  }

  const getRiskIcon = (riskLevel?: string) => {
    if (!riskLevel) return null
    switch (riskLevel) {
      case "low":
        return <ShieldCheck className="h-4 w-4 text-green-500" />
      case "medium":
        return <Shield className="h-4 w-4 text-yellow-500" />
      case "high":
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getBadgeClass = (riskLevel?: string) => {
    if (!riskLevel) return "bg-gray-600 hover:bg-gray-700"
    switch (riskLevel) {
      case "low":
        return "bg-green-600 hover:bg-green-700"
      case "medium":
        return "bg-yellow-600 hover:bg-yellow-700"
      case "high":
        return "bg-red-600 hover:bg-red-700"
      case "critical":
        return "bg-red-700 hover:bg-red-800"
      default:
        return "bg-gray-600 hover:bg-gray-700"
    }
  }

  const filteredTokens = tokens

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredTokens.map((token) => (
        <Link
          key={token.id}
          href={`/analyze/${token.id}`}
          className="block rounded-lg border border-gray-800 bg-gray-900 p-4 transition-all hover:border-amber-500/50 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-800">
                <Image src={token.logo || "/placeholder.svg"} alt={token.name} width={40} height={40} unoptimized />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{token.name}</h3>
                  <span className="text-sm text-gray-400">{token.ticker}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{token.address}</span>
                  <Badge variant="outline" className="border-gray-700 text-gray-300">
                    ODIN
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-medium">{token.marketCap}</div>
                <div className="text-xs text-gray-400">{token.sats} sats</div>
              </div>
              <Badge className={getBadgeClass(token.riskLevel)}>{getRiskText(token.riskLevel)}</Badge>
              {getRiskIcon(token.riskLevel)}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2 text-sm">
            <div className="rounded-md bg-gray-800 p-2">
              <div className="text-xs text-gray-400">Age</div>
              <div className="flex items-center gap-1">
                <span>{token.age}</span>
              </div>
            </div>
            <div className="rounded-md bg-gray-800 p-2">
              <div className="text-xs text-gray-400">24h Change</div>
              <div
                className={`flex items-center gap-1 ${token.change24h === "-" ? "text-gray-400" : token.change24h?.includes("-") ? "text-red-500" : "text-green-500"}`}
              >
                <span>{token.change24h}</span>
              </div>
            </div>
            <div className="rounded-md bg-gray-800 p-2">
              <div className="text-xs text-gray-400">Volume</div>
              <div className="flex flex-col gap-1">
                <span>{formatBTC(token.volume.btc)} BTC</span>
                <span className="text-xs text-gray-400">{formatUSD(token.volume.usd)}</span>
              </div>
            </div>
            <div className="rounded-md bg-gray-800 p-2">
              <div className="text-xs text-gray-400">Txns</div>
              <div className="flex items-center gap-1">
                <span>{formatNumber(token.txns)}</span>
              </div>
            </div>
            <div className="rounded-md bg-gray-800 p-2">
              <div className="text-xs text-gray-400">Ascended</div>
              <div className="flex items-center gap-1">
                <span>
                  {token.ascended.direction === "up" ? "+" : "-"}
                  {token.ascended.percent}%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div
              className={`rounded-md border p-3 ${
                token.riskLevel === "low"
                  ? "border-green-500/30 bg-green-950/20"
                  : token.riskLevel === "medium"
                    ? "border-yellow-500/30 bg-yellow-950/20"
                    : "border-red-500/30 bg-red-950/20"
              }`}
            >
              <div
                className={`mb-1 flex items-center gap-2 text-sm font-medium ${
                  token.riskLevel === "low"
                    ? "text-green-400"
                    : token.riskLevel === "medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                {token.riskLevel === "low" ? (
                  <ShieldCheck className="h-4 w-4" />
                ) : token.riskLevel === "medium" ? (
                  <Shield className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                <span>{token.marketManipulation?.title || "Market Analysis"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {token.marketManipulation?.details?.map((detail, index) => (
                  <div key={index} className="flex items-center gap-1 text-gray-300">
                    <BarChart3 className="h-3 w-3 text-gray-400" />
                    <span>{detail}</span>
                  </div>
                )) || "No market data available"}
              </div>
            </div>
            <div
              className={`rounded-md border p-3 ${
                token.riskLevel === "low"
                  ? "border-green-500/30 bg-green-950/20"
                  : token.riskLevel === "medium"
                    ? "border-yellow-500/30 bg-yellow-950/20"
                    : "border-red-500/30 bg-red-950/20"
              }`}
            >
              <div
                className={`mb-1 flex items-center gap-2 text-sm font-medium ${
                  token.riskLevel === "low"
                    ? "text-green-400"
                    : token.riskLevel === "medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{token.socialActivity?.title || "Social Analysis"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {token.socialActivity?.details?.map((detail, index) => (
                  <div key={index} className="flex items-center gap-1 text-gray-300">
                    <TrendingUp className="h-3 w-3 text-gray-400" />
                    <span>{detail}</span>
                  </div>
                )) || "No social data available"}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
