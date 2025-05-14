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

type Props = {
  params: { id: string }
}

interface Token {
  id: string
  name: string
  symbol: string
  contractStatus: "Verified" | "Unverified" | "Suspicious"
  riskLevel: "low" | "medium" | "high" | "critical" | "none"
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
    level: "low" | "medium" | "high" | "critical" | "none"
    score: number
  }
}

export default function AnalyzePageClient({ params }: Props) {
  const { id } = params
  const [token, setToken] = useState<Token | null>({
    id: "",
    name: "",
    symbol: "",
    contractStatus: "Unverified",
    riskLevel: "none",
    age: "",
    created_time: "",
    marketCap: "",
    sats: "",
    change5m: "",
    change1h: "",
    change6h: "",
    change24h: "",
    volume: {
      btc: 0,
      usd: 0
    },
    txns: "",
    ascended: {
      direction: "up",
      percent: 0
    },
    verified: false,
    risk: {
      level: "none",
      score: 0
    }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch token data based on the ID
    // This is mock data for demonstration purposes
    // Update the mock token data to use ODIN.FUN format
    const mockToken: Token = {
      id: id,
      name: id === "bitcat" ? "BITCAT" : id === "odinape" ? "ODINAPE" : id === "odindog" ? "ODINDOG" : id.toUpperCase(),
      symbol: id.toUpperCase(),
      contractStatus: "Unverified",
      riskLevel: "none",
      age: "1 day",
      created_time: new Date().toISOString(),
      marketCap: "1000000",
      sats: "1000000",
      change5m: "0",
      change1h: "0",
      change6h: "0",
      change24h: "0",
      volume: {
        btc: 0,
        usd: 0
      },
      txns: "0",
      ascended: {
        direction: "up",
        percent: 0
      },
      verified: false,
      risk: {
        level: "none",
        score: 0
      }
    }

    setToken(mockToken)
    setLoading(false)
  }, [id])

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
      {/* Your existing JSX */}
    </div>
  )
} 