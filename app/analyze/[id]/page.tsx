"use client"

import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, Shield, ShieldCheck, Info, ExternalLink, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ManipulationMetrics } from "@/app/components/manipulation-metrics"
import { SocialSentimentIndicator } from "@/app/components/social-sentiment-indicator"
import RiskRadarChart from "./risk-radar-chart"
import RiskTimeline from "./risk-timeline"
import SecurityAudit from "./security-audit"

interface PageProps {
  params: { [key: string]: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

interface AnalyzePageProps {
  params: {
    id: string
  }
}

export default function AnalyzePage({ params }: AnalyzePageProps) {
  const { id } = React.use(params)
  const [token, setToken] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch token data based on the ID
    // This is mock data for demonstration purposes
    // Update the mock token data to use ODIN.FUN format
    const mockToken = {
      id: id,
      name:
        id === "bitcat"
          ? "BITCAT"
          : id === "odinape"
            ? "ODINAPE"
            : id === "odindog"
              ? "ODINDOG"
              : id.toUpperCase(),
      symbol:
        id === "bitcat"
          ? "BITCAT"
          : id === "odinape"
            ? "ODINAPE"
            : id === "odindog"
              ? "ODINDOG"
              : id.toUpperCase(),
      logo: `/placeholder.svg?height=80&width=80&query=${id} logo`,
      address: `${id.toUpperCase()}•ID•XXXX•ODIN`,
      chain: "ODIN",
      age: "2mo",
      marketCap:
        id === "bitcat" ? "$7.2M" : id === "odinape" ? "$7M" : id === "odindog" ? "$5.6M" : "$1M",
      marketCapValue:
        id === "bitcat"
          ? 7200000
          : id === "odinape"
            ? 7000000
            : id === "odindog"
              ? 5600000
              : 1000000,
      price:
        id === "bitcat"
          ? 0.00333
          : id === "odinape"
            ? 0.00326
            : id === "odindog"
              ? 0.00261
              : 0.001,
      sats: id === "bitcat" ? 333 : id === "odinape" ? 326 : id === "odindog" ? 261 : 100,
      change5m: "-",
      change1h: "-",
      change6h: "0.1%",
      change24h: "-3.8%",
      volume: {
        btc: 127,
        usd: 13000000,
      },
      txns: 33200,
      ascended: {
        percent: 7.5,
        direction: "up",
      },
      verified: true,
      riskLevel:
        id === "bitcat" || id === "odindog"
          ? "low"
          : id === "odinape"
            ? "medium"
            : id === "riskytoken" || id === "suspicioustoken"
              ? "critical"
              : "medium",
      riskScore:
        id === "bitcat" || id === "odindog"
          ? 12
          : id === "odinape"
            ? 65
            : id === "riskytoken" || id === "suspicioustoken"
              ? 92
              : 65,
      description: `${id.toUpperCase()} is an ODIN.FUN token that enables secure peer-to-peer transactions on the ODIN platform.`,
      website: "https://example.com",
      explorer: "https://example.com/explorer",
      twitter: "https://twitter.com/example",
      reddit: "https://reddit.com/r/example",
      github: "https://github.com/example",
      contractAddress: `${id.toUpperCase()}•ID•XXXX•ODIN`,
      riskFactors: {
        contract:
          id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
            ? {
                status: "Verified",
                score: 10,
                details: "Contract code is verified and audited by reputable firms",
              }
            : id === "mediumtoken"
              ? {
                  status: "Verified",
                  score: 35,
                  details: "Contract is verified but has some potential issues",
                }
              : {
                  status: "Vulnerable",
                  score: 85,
                  details: "Multiple high-risk vulnerabilities detected in contract",
                },
        liquidity:
          id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
            ? {
                status: "High",
                score: 15,
                details: "Strong liquidity across multiple exchanges and pairs",
              }
            : id === "mediumtoken"
              ? {
                  status: "Moderate",
                  score: 45,
                  details: "Moderate liquidity with some concentration risks",
                }
              : {
                  status: "Very Low",
                  score: 90,
                  details: "Extremely low liquidity with high slippage",
                },
        ownership:
          id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
            ? {
                status: "Decentralized",
                score: 5,
                details: "Ownership is renounced or highly decentralized",
              }
            : id === "mediumtoken"
              ? {
                  status: "Centralized",
                  score: 60,
                  details: "Ownership is centralized with some controls",
                }
              : {
                  status: "Centralized",
                  score: 95,
                  details: "Single entity controls ownership with no timelock",
                },
        volume:
          id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
            ? {
                status: "Healthy",
                score: 10,
                details: "Consistent trading volume across exchanges",
              }
            : id === "mediumtoken"
              ? {
                  status: "Inconsistent",
                  score: 55,
                  details: "Trading volume shows irregular patterns",
                }
              : {
                  status: "Manipulated",
                  score: 95,
                  details: "Strong evidence of wash trading and volume manipulation",
                },
        holders:
          id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
            ? {
                status: "Distributed",
                score: 15,
                details: "Wide distribution across many wallets",
              }
            : id === "mediumtoken"
              ? {
                  status: "Top Heavy",
                  score: 60,
                  details: "Top 10 holders control significant supply",
                }
              : {
                  status: "Concentrated",
                  score: 90,
                  details: "Extreme concentration with few controlling wallets",
                },
        social:
          id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
            ? {
                status: "Positive",
                score: 15,
                details: "Organic community with genuine engagement",
              }
            : id === "mediumtoken"
              ? {
                  status: "Mixed",
                  score: 50,
                  details: "Some suspicious activity mixed with genuine interest",
                }
              : {
                  status: "Artificial",
                  score: 95,
                  details: "Evidence of bot networks and coordinated promotion",
                },
      },
      securityScans: [
        {
          name: "Contract Audit",
          status:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? "Passed"
              : id === "mediumtoken"
                ? "Partial"
                : "Failed",
          date: "Jan 15, 2023",
          details:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? "No vulnerabilities found"
              : id === "mediumtoken"
                ? "Minor issues found"
                : "Critical vulnerabilities detected",
        },
        {
          name: "Liquidity Lock",
          status:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? "Verified"
              : id === "mediumtoken"
                ? "Partial"
                : "None",
          date: "Jan 20, 2023",
          details:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? "Liquidity locked for 2 years"
              : id === "mediumtoken"
                ? "Partial liquidity locked for 6 months"
                : "No liquidity lock detected",
        },
        {
          name: "Ownership Renounced",
          status:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? "Verified"
              : id === "mediumtoken"
                ? "Timelock"
                : "Centralized",
          date: "Jan 25, 2023",
          details:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? "Ownership fully renounced"
              : id === "mediumtoken"
                ? "Ownership behind 48-hour timelock"
                : "Single wallet controls contract",
        },
        {
          name: "Honeypot Check",
          status:
            id === "ethereum" ||
            id === "bitcoin" ||
            id === "solana" ||
            id === "safetoken" ||
            id === "mediumtoken"
              ? "Passed"
              : "Failed",
          date: "Feb 1, 2023",
          details:
            id === "ethereum" ||
            id === "bitcoin" ||
            id === "solana" ||
            id === "safetoken" ||
            id === "mediumtoken"
              ? "Token can be bought and sold normally"
              : "Selling restrictions detected in contract",
        },
        {
          name: "Rug Pull Check",
          status:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? "Passed"
              : id === "mediumtoken"
                ? "Caution"
                : "High Risk",
          date: "Feb 5, 2023",
          details:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? "No rug pull vectors detected"
              : id === "mediumtoken"
                ? "Some centralization risks present"
                : "Multiple rug pull vectors identified",
        },
      ],
      riskHistory: [
        {
          date: "Jan 15, 2023",
          score:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? 15
              : id === "mediumtoken"
                ? 45
                : 75,
        },
        {
          date: "Feb 15, 2023",
          score:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? 12
              : id === "mediumtoken"
                ? 55
                : 85,
        },
        {
          date: "Mar 15, 2023",
          score:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? 10
              : id === "mediumtoken"
                ? 60
                : 90,
        },
        {
          date: "Apr 15, 2023",
          score:
            id === "ethereum" || id === "bitcoin" || id === "solana" || id === "safetoken"
              ? 12
              : id === "mediumtoken"
                ? 65
                : 92,
        },
      ],
    }

    setToken(mockToken)
    setLoading(false)
  }, [id])

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

  const formatPrice = (price: number | undefined) => {
    if (price === undefined) return "N/A"
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
      case "critical":
        return <Badge className="bg-red-700 hover:bg-red-800">Critical Risk</Badge>
      default:
        return null
    }
  }

  const getRiskIcon = (risk?: string) => {
    if (!risk) return null

    switch (risk) {
      case "low":
        return <ShieldCheck className="h-5 w-5 text-green-500" />
      case "medium":
        return <Shield className="h-5 w-5 text-yellow-500" />
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score < 20) return "text-green-500"
    if (score < 50) return "text-yellow-500"
    return "text-red-500"
  }

  const getRiskScoreBackground = (score: number) => {
    if (score < 20) return "bg-green-500"
    if (score < 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStatusColor = (status: string) => {
    const lowRiskStatuses = [
      "Verified",
      "Audited",
      "High",
      "Decentralized",
      "Renounced",
      "Distributed",
      "Healthy",
      "Positive",
      "Passed",
    ]
    const mediumRiskStatuses = ["Partial", "Moderate", "Timelock", "Top Heavy", "Inconsistent", "Mixed", "Caution"]
    const highRiskStatuses = [
      "Failed",
      "Vulnerable",
      "Very Low",
      "Centralized",
      "Concentrated",
      "Manipulated",
      "Artificial",
      "Suspicious",
      "None",
      "High Risk",
    ]

    if (lowRiskStatuses.includes(status)) return "text-green-500"
    if (mediumRiskStatuses.includes(status)) return "text-yellow-500"
    return "text-red-500"
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-xl text-white">Loading...</div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-xl text-white">Token not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="border-b border-gray-800 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/forseti-logo.png" alt="Forseti" width={40} height={40} className="h-10 w-10" />
              <span className="text-2xl font-bold text-gray-100">Forseti</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to scanner
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-800">
                <Image src={token.logo || "/placeholder.svg"} alt={token.name} width={64} height={64} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{token.name}</h1>
                  {token.verified && (
                    <div className="rounded-full bg-blue-900 p-1">
                      <Info className="h-4 w-4 text-blue-400" />
                    </div>
                  )}
                  {getRiskBadge(token.riskLevel)}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  {token.symbol} • {token.chain} •{" "}
                  <Link href={token.explorer} className="flex items-center gap-1 text-amber-400 hover:underline">
                    {token.contractAddress.substring(0, 6)}...{token.contractAddress.substring(38)}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="ml-auto flex flex-col items-end gap-2">
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {typeof token.price !== "undefined" ? `$${formatPrice(token.price)}` : token.marketCap}
                  </div>
                  <div
                    className={`flex items-center justify-end gap-1 ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {token.change24h >= 0 ? "+" : ""}
                    {token.change24h}% (24h)
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md border-amber-600 bg-transparent text-amber-400 hover:bg-amber-900/20"
                >
                  <Download className="mr-1 h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Risk Score</h3>
              <div className="flex items-center gap-2">
                {getRiskIcon(token.riskLevel)}
                <span className={`font-medium ${getRiskScoreColor(token.riskScore)}`}>{token.riskScore}/100</span>
              </div>
            </div>
            <div className="mb-2 h-4 w-full rounded-full bg-gray-800">
              <div
                className={`h-4 rounded-full ${getRiskScoreBackground(token.riskScore)}`}
                style={{ width: `${token.riskScore}%` }}
              ></div>
            </div>
            <div className="mb-4 flex justify-between text-xs text-gray-400">
              <span>Low Risk</span>
              <span>Medium Risk</span>
              <span>High Risk</span>
            </div>
            <div
              className={`rounded-md p-3 ${
                token.riskScore < 20
                  ? "border border-green-500/30 bg-green-950/20"
                  : token.riskScore < 50
                    ? "border border-yellow-500/30 bg-yellow-950/20"
                    : "border border-red-500/30 bg-red-950/20"
              }`}
            >
              <div
                className={`text-sm font-medium ${
                  token.riskScore < 20 ? "text-green-400" : token.riskScore < 50 ? "text-yellow-400" : "text-red-400"
                }`}
              >
                {token.riskScore < 20
                  ? "Low Risk - Safe to Interact"
                  : token.riskScore < 50
                    ? "Medium Risk - Proceed with Caution"
                    : "High Risk - Not Recommended"}
              </div>
              <div className="mt-1 text-xs text-gray-300">
                {token.riskScore < 20
                  ? "This token has passed all security checks and appears to be safe."
                  : token.riskScore < 50
                    ? "This token has some risk factors that require caution."
                    : "This token has multiple high-risk factors and is potentially unsafe."}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <h3 className="mb-4 text-lg font-semibold">Risk Radar</h3>
            <div className="flex h-[200px] items-center justify-center">
              <RiskRadarChart
                data={[
                  {
                    category: "Contract",
                    value: token.riskFactors.contract.score,
                  },
                  {
                    category: "Liquidity",
                    value: token.riskFactors.liquidity.score,
                  },
                  {
                    category: "Ownership",
                    value: token.riskFactors.ownership.score,
                  },
                  {
                    category: "Volume",
                    value: token.riskFactors.volume.score,
                  },
                  {
                    category: "Holders",
                    value: token.riskFactors.holders.score,
                  },
                  {
                    category: "Social",
                    value: token.riskFactors.social.score,
                  },
                ]}
              />
            </div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <h3 className="mb-4 text-lg font-semibold">Risk Timeline</h3>
            <div className="flex h-[200px] items-center justify-center">
              <RiskTimeline data={token.riskHistory} />
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <h3 className="mb-4 text-lg font-semibold">Risk Breakdown</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Contract Security</span>
                    <span className={`text-sm ${getStatusColor(token.riskFactors.contract.status)}`}>
                      ({token.riskFactors.contract.status})
                    </span>
                  </div>
                  <span className={`text-sm ${getRiskScoreColor(token.riskFactors.contract.score)}`}>
                    {token.riskFactors.contract.score}/100
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-800">
                  <div
                    className={`h-2 rounded-full ${getRiskScoreBackground(token.riskFactors.contract.score)}`}
                    style={{ width: `${token.riskFactors.contract.score}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">{token.riskFactors.contract.details}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Liquidity</span>
                    <span className={`text-sm ${getStatusColor(token.riskFactors.liquidity.status)}`}>
                      ({token.riskFactors.liquidity.status})
                    </span>
                  </div>
                  <span className={`text-sm ${getRiskScoreColor(token.riskFactors.liquidity.score)}`}>
                    {token.riskFactors.liquidity.score}/100
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-800">
                  <div
                    className={`h-2 rounded-full ${getRiskScoreBackground(token.riskFactors.liquidity.score)}`}
                    style={{ width: `${token.riskFactors.liquidity.score}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">{token.riskFactors.liquidity.details}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Ownership</span>
                    <span className={`text-sm ${getStatusColor(token.riskFactors.ownership.status)}`}>
                      ({token.riskFactors.ownership.status})
                    </span>
                  </div>
                  <span className={`text-sm ${getRiskScoreColor(token.riskFactors.ownership.score)}`}>
                    {token.riskFactors.ownership.score}/100
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-800">
                  <div
                    className={`h-2 rounded-full ${getRiskScoreBackground(token.riskFactors.ownership.score)}`}
                    style={{ width: `${token.riskFactors.ownership.score}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">{token.riskFactors.ownership.details}</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <h3 className="mb-4 text-lg font-semibold">Risk Breakdown (cont.)</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Trading Volume</span>
                    <span className={`text-sm ${getStatusColor(token.riskFactors.volume.status)}`}>
                      ({token.riskFactors.volume.status})
                    </span>
                  </div>
                  <span className={`text-sm ${getRiskScoreColor(token.riskFactors.volume.score)}`}>
                    {token.riskFactors.volume.score}/100
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-800">
                  <div
                    className={`h-2 rounded-full ${getRiskScoreBackground(token.riskFactors.volume.score)}`}
                    style={{ width: `${token.riskFactors.volume.score}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">{token.riskFactors.volume.details}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Holder Distribution</span>
                    <span className={`text-sm ${getStatusColor(token.riskFactors.holders.status)}`}>
                      ({token.riskFactors.holders.status})
                    </span>
                  </div>
                  <span className={`text-sm ${getRiskScoreColor(token.riskFactors.holders.score)}`}>
                    {token.riskFactors.holders.score}/100
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-800">
                  <div
                    className={`h-2 rounded-full ${getRiskScoreBackground(token.riskFactors.holders.score)}`}
                    style={{ width: `${token.riskFactors.holders.score}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">{token.riskFactors.holders.details}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Social Sentiment</span>
                    <span className={`text-sm ${getStatusColor(token.riskFactors.social.status)}`}>
                      ({token.riskFactors.social.status})
                    </span>
                  </div>
                  <span className={`text-sm ${getRiskScoreColor(token.riskFactors.social.score)}`}>
                    {token.riskFactors.social.score}/100
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-800">
                  <div
                    className={`h-2 rounded-full ${getRiskScoreBackground(token.riskFactors.social.score)}`}
                    style={{ width: `${token.riskFactors.social.score}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">{token.riskFactors.social.details}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
          <h3 className="mb-2 text-lg font-semibold">ODIN Metrics</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Age</span>
                <span className="text-sm">{token.age}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Sats</span>
                <span className="text-sm">{token.sats}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Transactions</span>
                <span className="text-sm">{formatNumber(token.txns)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Ascended</span>
                <span className="text-sm">
                  {token.ascended.direction === "up" ? "+" : "-"}
                  {token.ascended.percent}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">BTC Volume</span>
                <span className="text-sm">{token.volume.btc} BTC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">USD Volume</span>
                <span className="text-sm">${formatNumber(token.volume.usd)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="security">
            <TabsList className="mb-4 grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="security">Security Audit</TabsTrigger>
              <TabsTrigger value="manipulation">Market Manipulation</TabsTrigger>
              <TabsTrigger value="social">Social Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="security">
              <SecurityAudit securityScans={token.securityScans} riskLevel={token.riskLevel} />
            </TabsContent>

            <TabsContent value="manipulation">
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                <h3 className="mb-4 text-lg font-semibold">Market Manipulation Analysis</h3>
                <ManipulationMetrics tokenId={token.id} tokenName={token.name} riskLevel={token.riskLevel} />
              </div>
            </TabsContent>

            <TabsContent value="social">
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                <h3 className="mb-4 text-lg font-semibold">Social Sentiment Analysis</h3>
                <SocialSentimentIndicator tokenId={token.id} tokenName={token.name} riskLevel={token.riskLevel} />
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
                <h3 className="mb-4 text-lg font-semibold">Recommendations</h3>

                <div className="space-y-4">
                  {token.riskScore < 20 ? (
                    <>
                      <div className="rounded-md border border-green-500/30 bg-green-950/20 p-4">
                        <div className="mb-2 flex items-center gap-2 text-green-400">
                          <ShieldCheck className="h-5 w-5" />
                          <span className="font-medium">Safe to Interact</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          This token has passed all security checks and appears to be safe for trading and holding. As
                          with all cryptocurrencies, only invest what you can afford to lose.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Recommended Actions:</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>
                            Consider adding this token to your portfolio if it aligns with your investment strategy
                          </li>
                          <li>Monitor for any changes in risk factors over time</li>
                          <li>
                            Verify token information on official channels before making significant investment decisions
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : token.riskScore < 50 ? (
                    <>
                      <div className="rounded-md border border-yellow-500/30 bg-yellow-950/20 p-4">
                        <div className="mb-2 flex items-center gap-2 text-yellow-400">
                          <Shield className="h-5 w-5" />
                          <span className="font-medium">Proceed with Caution</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          This token has some risk factors that require caution. While not necessarily unsafe, you
                          should be aware of the potential risks before interacting with this token.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Recommended Actions:</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>
                            Limit your exposure to this token and only invest what you are comfortable potentially
                            losing
                          </li>
                          <li>
                            Research the project thoroughly, including team background, roadmap, and community sentiment
                          </li>
                          <li>
                            Pay attention to the specific risk factors highlighted in the analysis, particularly{" "}
                            {token.riskFactors.contract.score > 50
                              ? "contract security"
                              : token.riskFactors.liquidity.score > 50
                                ? "liquidity"
                                : token.riskFactors.ownership.score > 50
                                  ? "ownership"
                                  : token.riskFactors.volume.score > 50
                                    ? "trading volume"
                                    : token.riskFactors.holders.score > 50
                                      ? "holder distribution"
                                      : "social sentiment"}
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-md border border-red-500/30 bg-red-950/20 p-4">
                        <div className="mb-2 flex items-center gap-2 text-red-400">
                          <AlertTriangle className="h-5 w-5" />
                          <span className="font-medium">High Risk - Not Recommended</span>
                        </div>
                        <p className="text-sm text-gray-300">
                          This token has multiple high-risk factors and is potentially unsafe. We strongly advise
                          against interacting with this token unless you fully understand and accept the risks involved.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Recommended Actions:</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Avoid investing in this token due to the high risk profile</li>
                          <li>
                            If you already hold this token, consider exiting your position if possible (be aware that
                            some high-risk tokens may have selling restrictions)
                          </li>
                          <li>
                            Report suspicious activity to the relevant blockchain explorer or community channels if
                            appropriate
                          </li>
                          <li>
                            Be particularly cautious of{" "}
                            {token.riskFactors.contract.score > 80
                              ? "contract vulnerabilities"
                              : token.riskFactors.liquidity.score > 80
                                ? "liquidity issues"
                                : token.riskFactors.ownership.score > 80
                                  ? "centralized ownership"
                                  : token.riskFactors.volume.score > 80
                                    ? "market manipulation"
                                    : token.riskFactors.holders.score > 80
                                      ? "concentrated holdings"
                                      : "suspicious social activity"}
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
