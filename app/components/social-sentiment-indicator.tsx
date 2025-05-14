"use client"

import { useState } from "react"
import { MessageCircle, AlertTriangle, Users, Globe } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SocialSentimentIndicatorProps {
  tokenId: string
  tokenName: string
  riskLevel: "low" | "medium" | "high" | "critical" | "none"
}

export function SocialSentimentIndicator({ tokenId, tokenName, riskLevel }: SocialSentimentIndicatorProps) {
  // In a real app, you would fetch this data from an API
  const [metrics, setMetrics] = useState({
    sentimentScore: riskLevel === "critical" ? -85 : riskLevel === "high" ? -65 : riskLevel === "medium" ? 20 : 75,
    mentionVolume: riskLevel === "critical" ? 95 : riskLevel === "high" ? 85 : riskLevel === "medium" ? 60 : 40,
    botProbability: riskLevel === "critical" ? 92 : riskLevel === "high" ? 75 : riskLevel === "medium" ? 35 : 5,
    communityGrowth:
      riskLevel === "critical"
        ? "Suspicious"
        : riskLevel === "high"
          ? "Artificial"
          : riskLevel === "medium"
            ? "Inconsistent"
            : "Organic",
    influencerActivity:
      riskLevel === "critical"
        ? "Paid Promotion"
        : riskLevel === "high"
          ? "Suspicious"
          : riskLevel === "medium"
            ? "Mixed"
            : "Genuine",
    sentimentTrend:
      riskLevel === "critical"
        ? "Manipulated"
        : riskLevel === "high"
          ? "Volatile"
          : riskLevel === "medium"
            ? "Unstable"
            : "Stable",
    platforms: [
      {
        name: "Twitter",
        volume: riskLevel === "critical" ? 85 : riskLevel === "high" ? 70 : riskLevel === "medium" ? 50 : 30,
        sentiment:
          riskLevel === "critical"
            ? "Very Negative"
            : riskLevel === "high"
              ? "Negative"
              : riskLevel === "medium"
                ? "Mixed"
                : "Positive",
        suspicious: riskLevel === "critical" || riskLevel === "high",
      },
      {
        name: "Telegram",
        volume: riskLevel === "critical" ? 95 : riskLevel === "high" ? 80 : riskLevel === "medium" ? 40 : 25,
        sentiment:
          riskLevel === "critical"
            ? "Artificial"
            : riskLevel === "high"
              ? "Suspicious"
              : riskLevel === "medium"
                ? "Mixed"
                : "Positive",
        suspicious: riskLevel === "critical" || riskLevel === "high",
      },
      {
        name: "Reddit",
        volume: riskLevel === "critical" ? 65 : riskLevel === "high" ? 50 : riskLevel === "medium" ? 30 : 20,
        sentiment:
          riskLevel === "critical"
            ? "Negative"
            : riskLevel === "high"
              ? "Mixed"
              : riskLevel === "medium"
                ? "Neutral"
                : "Positive",
        suspicious: riskLevel === "critical",
      },
      {
        name: "Discord",
        volume: riskLevel === "critical" ? 75 : riskLevel === "high" ? 60 : riskLevel === "medium" ? 35 : 25,
        sentiment:
          riskLevel === "critical"
            ? "Suspicious"
            : riskLevel === "high"
              ? "Mixed"
              : riskLevel === "medium"
                ? "Neutral"
                : "Positive",
        suspicious: riskLevel === "critical",
      },
    ],
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
        return <MessageCircle className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getTitle = (risk: string) => {
    switch (risk) {
      case "critical":
        return "Artificial Social Activity"
      case "high":
        return "Suspicious Social Activity"
      case "medium":
        return "Mixed Social Sentiment"
      default:
        return "Healthy Social Sentiment"
    }
  }

  const getSentimentColor = (score: number) => {
    if (score < -50) return "bg-red-500"
    if (score < 0) return "bg-red-400"
    if (score < 30) return "bg-yellow-500"
    return "bg-green-500"
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
              <Globe className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-xs">
                Social sentiment analysis monitors discussions across social media platforms to detect artificial
                promotion, bot activity, and sentiment manipulation.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2 rounded-md bg-gray-800/50 p-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Sentiment Score</span>
            <span
              className={
                metrics.sentimentScore < -50
                  ? "text-red-400"
                  : metrics.sentimentScore < 0
                    ? "text-red-300"
                    : metrics.sentimentScore < 30
                      ? "text-yellow-400"
                      : "text-green-400"
              }
            >
              {metrics.sentimentScore}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-700">
            <div
              className={`h-1.5 rounded-full ${getSentimentColor(metrics.sentimentScore)}`}
              style={{ width: `${Math.abs(metrics.sentimentScore)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Negative</span>
            <span>Positive</span>
          </div>
        </div>

        <div className="space-y-2 rounded-md bg-gray-800/50 p-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Bot Probability</span>
            <span
              className={
                metrics.botProbability > 70
                  ? "text-red-400"
                  : metrics.botProbability > 40
                    ? "text-yellow-400"
                    : "text-green-400"
              }
            >
              {metrics.botProbability}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-gray-700">
            <div
              className={`h-1.5 rounded-full ${metrics.botProbability > 70 ? "bg-red-500" : metrics.botProbability > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              style={{ width: `${metrics.botProbability}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center justify-between rounded-md bg-gray-800/50 p-2">
          <span className="text-gray-400">Community Growth</span>
          <span
            className={
              metrics.communityGrowth === "Suspicious" || metrics.communityGrowth === "Artificial"
                ? "text-red-400"
                : metrics.communityGrowth === "Inconsistent"
                  ? "text-yellow-400"
                  : "text-green-400"
            }
          >
            {metrics.communityGrowth}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-md bg-gray-800/50 p-2">
          <span className="text-gray-400">Influencer Activity</span>
          <span
            className={
              metrics.influencerActivity === "Paid Promotion" || metrics.influencerActivity === "Suspicious"
                ? "text-red-400"
                : metrics.influencerActivity === "Mixed"
                  ? "text-yellow-400"
                  : "text-green-400"
            }
          >
            {metrics.influencerActivity}
          </span>
        </div>
      </div>

      <div className="mt-2 rounded-md bg-gray-800/50 p-2">
        <div className="mb-1 text-xs text-gray-400">Platform Analysis</div>
        <div className="space-y-2">
          {metrics.platforms.map((platform, index) => (
            <div key={index} className="flex items-center text-xs">
              <div className="w-20 text-gray-300">{platform.name}</div>
              <div className="flex-1">
                <div className="h-1.5 w-full rounded-full bg-gray-700">
                  <div
                    className={`h-1.5 rounded-full ${platform.suspicious ? "bg-red-500" : "bg-amber-500"}`}
                    style={{ width: `${platform.volume}%` }}
                  ></div>
                </div>
              </div>
              <div
                className={`ml-2 w-24 text-right ${
                  platform.sentiment === "Very Negative" ||
                  platform.sentiment === "Negative" ||
                  platform.sentiment === "Artificial" ||
                  platform.sentiment === "Suspicious"
                    ? "text-red-400"
                    : platform.sentiment === "Mixed" || platform.sentiment === "Neutral"
                      ? "text-yellow-400"
                      : "text-green-400"
                }`}
              >
                {platform.sentiment}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
