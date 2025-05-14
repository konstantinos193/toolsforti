"use client"

import { useState } from "react"
import { BarChart3, Activity, AlertTriangle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ManipulationMetricsProps {
  tokenId: string
  tokenName: string
  riskLevel: "low" | "medium" | "high" | "critical" | "none"
}

export function ManipulationMetrics({ tokenId, tokenName, riskLevel }: ManipulationMetricsProps) {
  // In a real app, you would fetch this data from an API
  const [metrics, setMetrics] = useState({
    pumpDumpScore: riskLevel === "critical" ? 92 : riskLevel === "high" ? 78 : riskLevel === "medium" ? 45 : 12,
    washTradingPercent: riskLevel === "critical" ? 95 : riskLevel === "high" ? 65 : riskLevel === "medium" ? 30 : 5,
    priceVolatility:
      riskLevel === "critical"
        ? "Extreme"
        : riskLevel === "high"
          ? "High"
          : riskLevel === "medium"
            ? "Moderate"
            : "Low",
    tradeFrequency:
      riskLevel === "critical"
        ? "Suspicious"
        : riskLevel === "high"
          ? "Irregular"
          : riskLevel === "medium"
            ? "Varied"
            : "Normal",
    largeTransactions:
      riskLevel === "critical"
        ? "Coordinated"
        : riskLevel === "high"
          ? "Suspicious"
          : riskLevel === "medium"
            ? "Occasional"
            : "Natural",
    buyToSellRatio:
      riskLevel === "critical"
        ? "Highly Imbalanced"
        : riskLevel === "high"
          ? "Imbalanced"
          : riskLevel === "medium"
            ? "Slightly Imbalanced"
            : "Balanced",
  })

  const getColorClass = (risk: string) => {
    switch (risk) {
      case "critical":
        return "text-red-500 bg-red-950/20 border-red-500/30"
      case "high":
        return "text-red-400 bg-red-950/20 border-red-500/30"
      case "medium":
        return "text-yellow-400 bg-yellow-950/20 border-yellow-500/30"
      default:
        return "text-green-400 bg-green-950/20 border-green-500/30"
    }
  }

  const getIcon = (risk: string) => {
    switch (risk) {
      case "critical":
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <Activity className="h-4 w-4" />
      default:
        return <BarChart3 className="h-4 w-4" />
    }
  }

  const getTitle = (risk: string) => {
    switch (risk) {
      case "critical":
        return "Severe Market Manipulation Detected"
      case "high":
        return "Market Manipulation Detected"
      case "medium":
        return "Potential Market Manipulation"
      default:
        return "No Market Manipulation Detected"
    }
  }

  return (
    <div className={`rounded-md border p-3 ${getColorClass(riskLevel)}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          {getIcon(riskLevel)}
          <span>{getTitle(riskLevel)}</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">
                These metrics analyze trading patterns to detect potential market manipulation such as pump and dump
                schemes or wash trading.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2 rounded-md bg-gray-800/50 p-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Pump & Dump Score</span>
            <span
              className={
                metrics.pumpDumpScore > 70
                  ? "text-red-400"
                  : metrics.pumpDumpScore > 40
                    ? "text-yellow-400"
                    : "text-green-400"
              }
            >
              {metrics.pumpDumpScore}/100
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-700">
            <div
              className={`h-1.5 rounded-full ${metrics.pumpDumpScore > 70 ? "bg-red-500" : metrics.pumpDumpScore > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              style={{ width: `${metrics.pumpDumpScore}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-2 rounded-md bg-gray-800/50 p-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Wash Trading</span>
            <span
              className={
                metrics.washTradingPercent > 50
                  ? "text-red-400"
                  : metrics.washTradingPercent > 20
                    ? "text-yellow-400"
                    : "text-green-400"
              }
            >
              {metrics.washTradingPercent}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-700">
            <div
              className={`h-1.5 rounded-full ${metrics.washTradingPercent > 50 ? "bg-red-500" : metrics.washTradingPercent > 20 ? "bg-yellow-500" : "bg-green-500"}`}
              style={{ width: `${metrics.washTradingPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between rounded-md bg-gray-800/50 p-2">
          <span className="text-gray-400">Price Volatility</span>
          <span
            className={
              metrics.priceVolatility === "Extreme" || metrics.priceVolatility === "High"
                ? "text-red-400"
                : metrics.priceVolatility === "Moderate"
                  ? "text-yellow-400"
                  : "text-green-400"
            }
          >
            {metrics.priceVolatility}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-md bg-gray-800/50 p-2">
          <span className="text-gray-400">Trade Frequency</span>
          <span
            className={
              metrics.tradeFrequency === "Suspicious"
                ? "text-red-400"
                : metrics.tradeFrequency === "Irregular"
                  ? "text-yellow-400"
                  : "text-green-400"
            }
          >
            {metrics.tradeFrequency}
          </span>
        </div>
      </div>
    </div>
  )
}
