"use client"

import { useState } from "react"
import { AlertTriangle, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface ManipulationAnalysisProps {
  tokenId: string
  riskLevel: "low" | "medium" | "high" | "critical" | "none"
}

export default function ManipulationAnalysis({ tokenId, riskLevel }: ManipulationAnalysisProps) {
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
    tradingPairs: [
      {
        pair: "TOKEN/ETH",
        volume: riskLevel === "critical" ? 85 : riskLevel === "high" ? 70 : riskLevel === "medium" ? 50 : 30,
        suspicious: riskLevel === "critical" || riskLevel === "high",
      },
      {
        pair: "TOKEN/USDT",
        volume: riskLevel === "critical" ? 10 : riskLevel === "high" ? 20 : riskLevel === "medium" ? 30 : 40,
        suspicious: false,
      },
      {
        pair: "TOKEN/WBTC",
        volume: riskLevel === "critical" ? 5 : riskLevel === "high" ? 10 : riskLevel === "medium" ? 20 : 30,
        suspicious: false,
      },
    ],
    timePatterns: [
      {
        time: "00:00-04:00",
        activity: riskLevel === "critical" ? 45 : riskLevel === "high" ? 35 : riskLevel === "medium" ? 15 : 10,
        suspicious: riskLevel === "critical" || riskLevel === "high",
      },
      {
        time: "04:00-08:00",
        activity: riskLevel === "critical" ? 15 : riskLevel === "high" ? 10 : riskLevel === "medium" ? 10 : 15,
        suspicious: false,
      },
      {
        time: "08:00-12:00",
        activity: riskLevel === "critical" ? 5 : riskLevel === "high" ? 15 : riskLevel === "medium" ? 25 : 25,
        suspicious: false,
      },
      {
        time: "12:00-16:00",
        activity: riskLevel === "critical" ? 10 : riskLevel === "high" ? 15 : riskLevel === "medium" ? 20 : 20,
        suspicious: false,
      },
      {
        time: "16:00-20:00",
        activity: riskLevel === "critical" ? 5 : riskLevel === "high" ? 10 : riskLevel === "medium" ? 15 : 20,
        suspicious: false,
      },
      {
        time: "20:00-00:00",
        activity: riskLevel === "critical" ? 20 : riskLevel === "high" ? 15 : riskLevel === "medium" ? 15 : 10,
        suspicious: riskLevel === "critical",
      },
    ],
    relatedWallets: riskLevel === "critical" ? 12 : riskLevel === "high" ? 8 : riskLevel === "medium" ? 3 : 0,
    suspiciousPatterns: [
      { name: "Circular Trading", detected: riskLevel === "critical" || riskLevel === "high" },
      { name: "Self-Trading", detected: riskLevel === "critical" || riskLevel === "high" },
      { name: "Layering", detected: riskLevel === "critical" },
      { name: "Spoofing", detected: riskLevel === "critical" },
      { name: "Front-Running", detected: riskLevel === "high" || riskLevel === "medium" },
    ],
  })

  const getColorClass = (risk: string) => {
    switch (risk) {
      case "critical":
        return "text-red-500"
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      default:
        return "text-green-400"
    }
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Market Manipulation Analysis</h3>
        <div className="flex items-center gap-2">
          <AlertTriangle className={`h-5 w-5 ${getColorClass(riskLevel)}`} />
          <span className={`font-medium ${getColorClass(riskLevel)}`}>
            {riskLevel === "critical"
              ? "Critical Risk"
              : riskLevel === "high"
                ? "High Risk"
                : riskLevel === "medium"
                  ? "Medium Risk"
                  : "Low Risk"}
          </span>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patterns">Trading Patterns</TabsTrigger>
          <TabsTrigger value="wallets">Wallet Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">Pump & Dump Risk Score</div>
                <div
                  className={`text-xl font-bold ${metrics.pumpDumpScore > 70 ? "text-red-400" : metrics.pumpDumpScore > 40 ? "text-yellow-400" : "text-green-400"}`}
                >
                  {metrics.pumpDumpScore}/100
                </div>
              </div>
              <Progress
                value={metrics.pumpDumpScore}
                className="h-2 w-full bg-gray-700"
                indicatorClassName={`${metrics.pumpDumpScore > 70 ? "bg-red-500" : metrics.pumpDumpScore > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              />
              <div className="text-xs text-gray-400">
                {metrics.pumpDumpScore > 70
                  ? "High likelihood of pump and dump scheme"
                  : metrics.pumpDumpScore > 40
                    ? "Some suspicious price movements detected"
                    : "Natural price movements"}
              </div>
            </div>

            <div className="space-y-2 rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">Wash Trading Percentage</div>
                <div
                  className={`text-xl font-bold ${metrics.washTradingPercent > 50 ? "text-red-400" : metrics.washTradingPercent > 20 ? "text-yellow-400" : "text-green-400"}`}
                >
                  {metrics.washTradingPercent}%
                </div>
              </div>
              <Progress
                value={metrics.washTradingPercent}
                className="h-2 w-full bg-gray-700"
                indicatorClassName={`${metrics.washTradingPercent > 50 ? "bg-red-500" : metrics.washTradingPercent > 20 ? "bg-yellow-500" : "bg-green-500"}`}
              />
              <div className="text-xs text-gray-400">
                {metrics.washTradingPercent > 50
                  ? "Majority of volume appears to be wash trading"
                  : metrics.washTradingPercent > 20
                    ? "Some suspicious trading between related wallets"
                    : "Minimal suspicious trading activity"}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <h4 className="mb-3 text-sm font-medium">Key Metrics</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Price Volatility</span>
                  <span
                    className={`text-sm ${
                      metrics.priceVolatility === "Extreme" || metrics.priceVolatility === "High"
                        ? "text-red-400"
                        : metrics.priceVolatility === "Moderate"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {metrics.priceVolatility}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Trade Frequency</span>
                  <span
                    className={`text-sm ${
                      metrics.tradeFrequency === "Suspicious"
                        ? "text-red-400"
                        : metrics.tradeFrequency === "Irregular"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {metrics.tradeFrequency}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Large Transactions</span>
                  <span
                    className={`text-sm ${
                      metrics.largeTransactions === "Coordinated" || metrics.largeTransactions === "Suspicious"
                        ? "text-red-400"
                        : metrics.largeTransactions === "Occasional"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {metrics.largeTransactions}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Buy/Sell Ratio</span>
                  <span
                    className={`text-sm ${
                      metrics.buyToSellRatio === "Highly Imbalanced" || metrics.buyToSellRatio === "Imbalanced"
                        ? "text-red-400"
                        : metrics.buyToSellRatio === "Slightly Imbalanced"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {metrics.buyToSellRatio}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <h4 className="mb-3 text-sm font-medium">Suspicious Patterns</h4>
              <div className="space-y-2">
                {metrics.suspiciousPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{pattern.name}</span>
                    <span className={`text-sm ${pattern.detected ? "text-red-400" : "text-green-400"}`}>
                      {pattern.detected ? "Detected" : "Not Detected"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium">Trading Pair Distribution</h4>
            <div className="space-y-3">
              {metrics.tradingPairs.map((pair, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{pair.pair}</span>
                    <span className={`text-sm ${pair.suspicious ? "text-red-400" : "text-gray-400"}`}>
                      {pair.volume}% {pair.suspicious && <AlertTriangle className="ml-1 inline h-3 w-3" />}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-700">
                    <div
                      className={`h-1.5 rounded-full ${pair.suspicious ? "bg-red-500" : "bg-amber-500"}`}
                      style={{ width: `${pair.volume}%` }}
                    ></div>
                  </div>
                  {pair.suspicious && <div className="text-xs text-red-400">Suspicious concentration in this pair</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium">Trading Time Patterns</h4>
            <div className="space-y-3">
              {metrics.timePatterns.map((time, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{time.time} UTC</span>
                    <span className={`text-sm ${time.suspicious ? "text-red-400" : "text-gray-400"}`}>
                      {time.activity}% {time.suspicious && <AlertTriangle className="ml-1 inline h-3 w-3" />}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-700">
                    <div
                      className={`h-1.5 rounded-full ${time.suspicious ? "bg-red-500" : "bg-amber-500"}`}
                      style={{ width: `${time.activity}%` }}
                    ></div>
                  </div>
                  {time.suspicious && (
                    <div className="text-xs text-red-400">
                      Unusual activity concentration during low-liquidity hours
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-4">
          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Related Wallet Clusters</h4>
              <div
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${metrics.relatedWallets > 5 ? "bg-red-900/50 text-red-400" : metrics.relatedWallets > 0 ? "bg-yellow-900/50 text-yellow-400" : "bg-green-900/50 text-green-400"}`}
              >
                {metrics.relatedWallets} clusters detected
              </div>
            </div>

            {metrics.relatedWallets > 0 ? (
              <div className="mt-3 space-y-3">
                <div className="text-sm text-gray-300">
                  {metrics.relatedWallets > 5
                    ? "Multiple related wallet clusters detected trading with each other, strong indication of wash trading."
                    : metrics.relatedWallets > 0
                      ? "Some related wallets detected that may be engaging in coordinated trading."
                      : "No related wallet clusters detected."}
                </div>

                {metrics.relatedWallets > 0 && (
                  <div className="rounded-md bg-gray-800 p-3">
                    <div className="mb-2 text-sm font-medium">Top Suspicious Cluster</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-red-400" />
                        <span>Wallets trade exclusively with each other</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-red-400" />
                        <span>Trades occur in circular patterns</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-red-400" />
                        <span>Trades happen at regular intervals</span>
                      </div>
                      {metrics.relatedWallets > 5 && (
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-red-400" />
                          <span>Wallets funded from same source</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-3 text-sm text-gray-300">
                No suspicious wallet clusters detected. Trading appears to be coming from diverse, unrelated sources.
              </div>
            )}
          </div>

          {metrics.relatedWallets > 0 && (
            <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <h4 className="mb-3 text-sm font-medium">Wash Trading Analysis</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Wash Trading Volume</span>
                  <span
                    className={`text-sm ${metrics.washTradingPercent > 50 ? "text-red-400" : metrics.washTradingPercent > 20 ? "text-yellow-400" : "text-green-400"}`}
                  >
                    {metrics.washTradingPercent}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div
                    className={`h-2 rounded-full ${metrics.washTradingPercent > 50 ? "bg-red-500" : metrics.washTradingPercent > 20 ? "bg-yellow-500" : "bg-green-500"}`}
                    style={{ width: `${metrics.washTradingPercent}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">
                  {metrics.washTradingPercent > 50
                    ? "Majority of trading volume appears to be artificial"
                    : metrics.washTradingPercent > 20
                      ? "Significant portion of trading volume may be artificial"
                      : "Minimal suspicious trading activity detected"}
                </div>

                {metrics.washTradingPercent > 20 && (
                  <div className="mt-2 rounded-md bg-red-950/20 p-2 text-xs text-red-400">
                    <div className="font-medium">Warning:</div>
                    <div>
                      Trading volume may be artificially inflated to create an illusion of liquidity and activity.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
