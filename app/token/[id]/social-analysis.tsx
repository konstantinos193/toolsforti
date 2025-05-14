"use client"

import { useState } from "react"
import { MessageCircle, TrendingUp, TrendingDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface SocialAnalysisProps {
  tokenId: string
  tokenName: string
  riskLevel: "low" | "medium" | "high" | "critical" | "none"
}

export default function SocialAnalysis({ tokenId, tokenName, riskLevel }: SocialAnalysisProps) {
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
        icon: "/twitter-icon.png",
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
        icon: "/telegram-icon.png",
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
        icon: "/reddit-icon.png",
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
        icon: "/discord-icon.png",
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
    topKeywords: [
      { word: "moon", count: 245, sentiment: "positive" },
      { word: "scam", count: riskLevel === "critical" || riskLevel === "high" ? 189 : 12, sentiment: "negative" },
      { word: "buy", count: 156, sentiment: "positive" },
      { word: "sell", count: riskLevel === "critical" || riskLevel === "high" ? 142 : 45, sentiment: "negative" },
      { word: "pump", count: riskLevel === "critical" || riskLevel === "high" ? 138 : 23, sentiment: "neutral" },
      { word: "legit", count: riskLevel === "low" ? 125 : 35, sentiment: "positive" },
      { word: "rug", count: riskLevel === "critical" || riskLevel === "high" ? 118 : 8, sentiment: "negative" },
      { word: "gem", count: 98, sentiment: "positive" },
    ],
    influencers: [
      {
        name: "CryptoWhale",
        followers: "245K",
        sentiment: riskLevel === "critical" || riskLevel === "high" ? "negative" : "positive",
        suspicious: riskLevel === "critical" || riskLevel === "high",
      },
      {
        name: "TokenGuru",
        followers: "189K",
        sentiment: riskLevel === "critical" || riskLevel === "high" ? "suspicious" : "neutral",
        suspicious: riskLevel === "critical",
      },
      {
        name: "AltcoinDaily",
        followers: "567K",
        sentiment: "neutral",
        suspicious: false,
      },
      {
        name: "CoinBureau",
        followers: "1.2M",
        sentiment: "positive",
        suspicious: false,
      },
    ],
    timePatterns: [
      {
        period: "Last 24h",
        volume: riskLevel === "critical" ? 85 : riskLevel === "high" ? 65 : riskLevel === "medium" ? 45 : 30,
        sentiment: riskLevel === "critical" ? -75 : riskLevel === "high" ? -45 : riskLevel === "medium" ? 10 : 60,
      },
      {
        period: "Last 7d",
        volume: riskLevel === "critical" ? 65 : riskLevel === "high" ? 55 : riskLevel === "medium" ? 40 : 35,
        sentiment: riskLevel === "critical" ? -65 : riskLevel === "high" ? -35 : riskLevel === "medium" ? 15 : 65,
      },
      {
        period: "Last 30d",
        volume: riskLevel === "critical" ? 40 : riskLevel === "high" ? 35 : riskLevel === "medium" ? 30 : 25,
        sentiment: riskLevel === "critical" ? -55 : riskLevel === "high" ? -25 : riskLevel === "medium" ? 25 : 70,
      },
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

  const getSentimentColor = (score: number) => {
    if (score < -50) return "bg-red-500"
    if (score < 0) return "bg-red-400"
    if (score < 30) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getSentimentTextColor = (score: number) => {
    if (score < -50) return "text-red-500"
    if (score < 0) return "text-red-400"
    if (score < 30) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Social Media Analysis</h3>
        <div className="flex items-center gap-2">
          <MessageCircle className={`h-5 w-5 ${getColorClass(riskLevel)}`} />
          <span className={`font-medium ${getColorClass(riskLevel)}`}>
            {riskLevel === "critical"
              ? "Artificial Activity"
              : riskLevel === "high"
                ? "Suspicious Activity"
                : riskLevel === "medium"
                  ? "Mixed Sentiment"
                  : "Healthy Community"}
          </span>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="influencers">Influencers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">Overall Sentiment</div>
                <div className={`text-xl font-bold ${getSentimentTextColor(metrics.sentimentScore)}`}>
                  {metrics.sentimentScore}
                </div>
              </div>
              <Progress
                value={Math.abs(metrics.sentimentScore)}
                className="h-2 w-full bg-gray-700"
                indicatorClassName={getSentimentColor(metrics.sentimentScore)}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Negative</span>
                <span>Positive</span>
              </div>
            </div>

            <div className="space-y-2 rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">Bot Activity Probability</div>
                <div
                  className={`text-xl font-bold ${metrics.botProbability > 70 ? "text-red-400" : metrics.botProbability > 40 ? "text-yellow-400" : "text-green-400"}`}
                >
                  {metrics.botProbability}%
                </div>
              </div>
              <Progress
                value={metrics.botProbability}
                className="h-2 w-full bg-gray-700"
                indicatorClassName={`${metrics.botProbability > 70 ? "bg-red-500" : metrics.botProbability > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              />
              <div className="text-xs text-gray-400">
                {metrics.botProbability > 70
                  ? "High likelihood of bot-driven social activity"
                  : metrics.botProbability > 40
                    ? "Some suspicious social patterns detected"
                    : "Mostly organic social activity"}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <h4 className="mb-3 text-sm font-medium">Key Metrics</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Community Growth</span>
                  <span
                    className={`text-sm ${
                      metrics.communityGrowth === "Suspicious" || metrics.communityGrowth === "Artificial"
                        ? "text-red-400"
                        : metrics.communityGrowth === "Inconsistent"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {metrics.communityGrowth}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Influencer Activity</span>
                  <span
                    className={`text-sm ${
                      metrics.influencerActivity === "Paid Promotion" || metrics.influencerActivity === "Suspicious"
                        ? "text-red-400"
                        : metrics.influencerActivity === "Mixed"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {metrics.influencerActivity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Sentiment Trend</span>
                  <span
                    className={`text-sm ${
                      metrics.sentimentTrend === "Manipulated"
                        ? "text-red-400"
                        : metrics.sentimentTrend === "Volatile" || metrics.sentimentTrend === "Unstable"
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {metrics.sentimentTrend}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Mention Volume</span>
                  <span
                    className={`text-sm ${
                      metrics.mentionVolume > 80 && (riskLevel === "critical" || riskLevel === "high")
                        ? "text-red-400"
                        : metrics.mentionVolume > 50
                          ? "text-yellow-400"
                          : "text-green-400"
                    }`}
                  >
                    {metrics.mentionVolume > 80
                      ? "Very High"
                      : metrics.mentionVolume > 50
                        ? "High"
                        : metrics.mentionVolume > 30
                          ? "Moderate"
                          : "Low"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
              <h4 className="mb-3 text-sm font-medium">Top Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {metrics.topKeywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    className={`${
                      keyword.sentiment === "negative"
                        ? "bg-red-900/50 text-red-400 hover:bg-red-900/70"
                        : keyword.sentiment === "positive"
                          ? "bg-green-900/50 text-green-400 hover:bg-green-900/70"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {keyword.word} ({keyword.count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium">Sentiment Timeline</h4>
            <div className="space-y-4">
              {metrics.timePatterns.map((period, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{period.period}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Volume:</span>
                      <span
                        className={`text-xs ${
                          period.volume > 70 && (riskLevel === "critical" || riskLevel === "high")
                            ? "text-red-400"
                            : period.volume > 50
                              ? "text-yellow-400"
                              : "text-gray-300"
                        }`}
                      >
                        {period.volume}%
                      </span>
                      <span className="text-xs text-gray-400">Sentiment:</span>
                      <span className={`text-xs ${getSentimentTextColor(period.sentiment)}`}>{period.sentiment}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-400">Volume</div>
                      <div className="h-1.5 w-full rounded-full bg-gray-700">
                        <div
                          className={`h-1.5 rounded-full ${
                            period.volume > 70 && (riskLevel === "critical" || riskLevel === "high")
                              ? "bg-red-500"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${period.volume}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Sentiment</div>
                      <div className="h-1.5 w-full rounded-full bg-gray-700">
                        <div
                          className={`h-1.5 rounded-full ${getSentimentColor(period.sentiment)}`}
                          style={{ width: `${Math.abs(period.sentiment)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium">Platform Analysis</h4>
            <div className="space-y-4">
              {metrics.platforms.map((platform, index) => (
                <div key={index} className="rounded-md bg-gray-800 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-700">
                        <Image src={platform.icon || "/placeholder.svg"} alt={platform.name} width={24} height={24} />
                      </div>
                      <span className="font-medium">{platform.name}</span>
                    </div>
                    <div
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        platform.suspicious
                          ? "bg-red-900/50 text-red-400"
                          : platform.sentiment === "Mixed" || platform.sentiment === "Neutral"
                            ? "bg-yellow-900/50 text-yellow-400"
                            : "bg-green-900/50 text-green-400"
                      }`}
                    >
                      {platform.sentiment}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Mention Volume</span>
                        <span
                          className={`${
                            platform.volume > 70 && platform.suspicious
                              ? "text-red-400"
                              : platform.volume > 50
                                ? "text-yellow-400"
                                : "text-gray-300"
                          }`}
                        >
                          {platform.volume}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-gray-700">
                        <div
                          className={`h-1.5 rounded-full ${platform.suspicious ? "bg-red-500" : "bg-amber-500"}`}
                          style={{ width: `${platform.volume}%` }}
                        ></div>
                      </div>
                    </div>
                    {platform.suspicious && (
                      <div className="rounded-md bg-red-950/20 p-2 text-xs text-red-400">
                        {platform.sentiment === "Very Negative" || platform.sentiment === "Negative"
                          ? "Unusually high negative sentiment detected"
                          : platform.sentiment === "Artificial" || platform.sentiment === "Suspicious"
                            ? "Artificial promotion patterns detected"
                            : "Suspicious activity detected"}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium">Cross-Platform Patterns</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-md bg-gray-800 p-2">
                <span className="text-sm">Coordinated Posting</span>
                <Badge
                  className={`${
                    riskLevel === "critical" || riskLevel === "high"
                      ? "bg-red-900/50 text-red-400"
                      : riskLevel === "medium"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-green-900/50 text-green-400"
                  }`}
                >
                  {riskLevel === "critical"
                    ? "Highly Suspicious"
                    : riskLevel === "high"
                      ? "Suspicious"
                      : riskLevel === "medium"
                        ? "Some Patterns"
                        : "Not Detected"}
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-md bg-gray-800 p-2">
                <span className="text-sm">Copy/Paste Content</span>
                <Badge
                  className={`${
                    riskLevel === "critical" || riskLevel === "high"
                      ? "bg-red-900/50 text-red-400"
                      : riskLevel === "medium"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-green-900/50 text-green-400"
                  }`}
                >
                  {riskLevel === "critical"
                    ? "Widespread"
                    : riskLevel === "high"
                      ? "Common"
                      : riskLevel === "medium"
                        ? "Occasional"
                        : "Rare"}
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-md bg-gray-800 p-2">
                <span className="text-sm">New Account Activity</span>
                <Badge
                  className={`${
                    riskLevel === "critical" || riskLevel === "high"
                      ? "bg-red-900/50 text-red-400"
                      : riskLevel === "medium"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-green-900/50 text-green-400"
                  }`}
                >
                  {riskLevel === "critical"
                    ? "Very High"
                    : riskLevel === "high"
                      ? "High"
                      : riskLevel === "medium"
                        ? "Moderate"
                        : "Low"}
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium">Sentiment Distribution</h4>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Positive</span>
                  <span>
                    {riskLevel === "critical"
                      ? "15%"
                      : riskLevel === "high"
                        ? "25%"
                        : riskLevel === "medium"
                          ? "45%"
                          : "65%"}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{
                      width:
                        riskLevel === "critical"
                          ? "15%"
                          : riskLevel === "high"
                            ? "25%"
                            : riskLevel === "medium"
                              ? "45%"
                              : "65%",
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Neutral</span>
                  <span>
                    {riskLevel === "critical"
                      ? "20%"
                      : riskLevel === "high"
                        ? "25%"
                        : riskLevel === "medium"
                          ? "30%"
                          : "25%"}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-gray-500"
                    style={{
                      width:
                        riskLevel === "critical"
                          ? "20%"
                          : riskLevel === "high"
                            ? "25%"
                            : riskLevel === "medium"
                              ? "30%"
                              : "25%",
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Negative</span>
                  <span>
                    {riskLevel === "critical"
                      ? "65%"
                      : riskLevel === "high"
                        ? "50%"
                        : riskLevel === "medium"
                          ? "25%"
                          : "10%"}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{
                      width:
                        riskLevel === "critical"
                          ? "65%"
                          : riskLevel === "high"
                            ? "50%"
                            : riskLevel === "medium"
                              ? "25%"
                              : "10%",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium">Sentiment Analysis</h4>
            <div className="space-y-3">
              <div className="rounded-md bg-gray-800 p-3">
                <div className="mb-2 text-sm font-medium">Common Positive Themes</div>
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span>
                      {riskLevel === "low"
                        ? "Strong technology and use case discussions"
                        : "Price increase expectations"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span>
                      {riskLevel === "low" ? "Active developer updates and roadmap" : "Short-term profit potential"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-400" />
                    <span>
                      {riskLevel === "low" ? "Community building and engagement" : "FOMO-inducing statements"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-gray-800 p-3">
                <div className="mb-2 text-sm font-medium">Common Negative Themes</div>
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-red-400" />
                    <span>
                      {riskLevel === "critical" || riskLevel === "high"
                        ? "Scam accusations and warnings"
                        : "Technical concerns"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-red-400" />
                    <span>
                      {riskLevel === "critical" || riskLevel === "high"
                        ? "Reports of inability to sell tokens"
                        : "Market timing concerns"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-red-400" />
                    <span>
                      {riskLevel === "critical" || riskLevel === "high"
                        ? "Rug pull and honeypot allegations"
                        : "Competition comparisons"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="influencers" className="space-y-4">
          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium">Influencer Activity</h4>
            <div className="space-y-3">
              {metrics.influencers.map((influencer, index) => (
                <div key={index} className="rounded-md bg-gray-800 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-700"></div>
                      <div>
                        <div className="text-sm font-medium">{influencer.name}</div>
                        <div className="text-xs text-gray-400">{influencer.followers} followers</div>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        influencer.sentiment === "negative" || influencer.sentiment === "suspicious"
                          ? "bg-red-900/50 text-red-400"
                          : influencer.sentiment === "neutral"
                            ? "bg-gray-700 text-gray-300"
                            : "bg-green-900/50 text-green-400"
                      }`}
                    >
                      {influencer.sentiment.charAt(0).toUpperCase() + influencer.sentiment.slice(1)}
                    </Badge>
                  </div>
                  {influencer.suspicious && (
                    <div className="rounded-md bg-red-950/20 p-2 text-xs text-red-400">
                      <div className="font-medium">Warning:</div>
                      <div>
                        {influencer.sentiment === "negative"
                          ? "This influencer has posted negative content about the token"
                          : "This influencer may be involved in paid promotion without disclosure"}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
            <h4 className="mb-3 text-sm font-medium">Promotion Analysis</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-md bg-gray-800 p-2">
                <span className="text-sm">Paid Promotions</span>
                <Badge
                  className={`${
                    riskLevel === "critical" || riskLevel === "high"
                      ? "bg-red-900/50 text-red-400"
                      : riskLevel === "medium"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-green-900/50 text-green-400"
                  }`}
                >
                  {riskLevel === "critical"
                    ? "Extensive"
                    : riskLevel === "high"
                      ? "Significant"
                      : riskLevel === "medium"
                        ? "Some"
                        : "Minimal"}
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-md bg-gray-800 p-2">
                <span className="text-sm">Disclosure Compliance</span>
                <Badge
                  className={`${
                    riskLevel === "critical" || riskLevel === "high"
                      ? "bg-red-900/50 text-red-400"
                      : riskLevel === "medium"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-green-900/50 text-green-400"
                  }`}
                >
                  {riskLevel === "critical"
                    ? "Very Poor"
                    : riskLevel === "high"
                      ? "Poor"
                      : riskLevel === "medium"
                        ? "Partial"
                        : "Good"}
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-md bg-gray-800 p-2">
                <span className="text-sm">Influencer Credibility</span>
                <Badge
                  className={`${
                    riskLevel === "critical" || riskLevel === "high"
                      ? "bg-red-900/50 text-red-400"
                      : riskLevel === "medium"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-green-900/50 text-green-400"
                  }`}
                >
                  {riskLevel === "critical"
                    ? "Very Low"
                    : riskLevel === "high"
                      ? "Low"
                      : riskLevel === "medium"
                        ? "Mixed"
                        : "High"}
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
