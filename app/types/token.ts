export interface Token {
  id: string
  name: string
  ticker: string
  address: string // ODIN format like "BITCAT•ID•YBMO•ODIN"
  logo: string
  age: string // Format like "2mo"
  ageValue: number // For sorting
  timestamp: number // Unix timestamp in milliseconds
  marketCap: string // Formatted like "$7.2M"
  marketCapValue: number // Raw value for sorting
  sats: number // Value in satoshis
  change5m: string | null
  change1h: string | null
  change6h: string | null
  change24h: string | null
  volume: {
    btc: number
    usd: number
  }
  txns: number // Transaction count
  ascended: {
    percent: number
    direction: string // "up" | "down"
  }
  verified?: boolean
  info?: boolean
  riskLevel?: "low" | "medium" | "high" | "critical"
  contractStatus?: "Verified" | "Unverified" | "Suspicious"
  marketManipulation?: {
    title: string
    details: string[]
  }
  socialActivity?: {
    title: string
    details: string[]
  }
}
