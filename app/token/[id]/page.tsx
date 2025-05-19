import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Info, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

type PageProps = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TokenPage(props: PageProps) {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams
  ])
  // In a real app, you would fetch token data based on the ID
  const token = {
    id: params.id,
    name:
      params.id === "bitcat"
        ? "BITCAT"
        : params.id === "odinape"
          ? "ODINAPE"
          : params.id === "odindog"
            ? "ODINDOG"
            : params.id.toUpperCase(),
    ticker:
      params.id === "bitcat"
        ? "BITCAT"
        : params.id === "odinape"
          ? "ODINAPE"
          : params.id === "odindog"
            ? "ODINDOG"
            : params.id.toUpperCase(),
    logo: `/placeholder.svg?height=80&width=80&query=${params.id} logo`,
    address: `${params.id.toUpperCase()}•ID•XXXX•ODIN`,
    age: "2mo",
    marketCap: "$7.2M",
    sats: 333,
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
    description: `${params.id.toUpperCase()} is a token on the ODIN.FUN platform.`,
    website: "https://example.com",
    explorer: "https://example.com/explorer",
    twitter: "https://twitter.com/example",
    telegram: "https://t.me/example",
    transactions: [
      { hash: "0x123...abc", type: "Buy", amount: "10,000", time: "5 mins ago", value: "0.05 BTC" },
      { hash: "0x456...def", type: "Sell", amount: "5,000", time: "10 mins ago", value: "0.025 BTC" },
      { hash: "0x789...ghi", type: "Buy", amount: "20,000", time: "15 mins ago", value: "0.1 BTC" },
      { hash: "0xabc...123", type: "Buy", amount: "15,000", time: "30 mins ago", value: "0.075 BTC" },
      { hash: "0xdef...456", type: "Sell", amount: "8,000", time: "45 mins ago", value: "0.04 BTC" },
    ],
    holders: [
      { address: "0x1234...5678", percentage: 15.2, amount: "152,000" },
      { address: "0x5678...9012", percentage: 12.5, amount: "125,000" },
      { address: "0x9012...3456", percentage: 8.7, amount: "87,000" },
    ],
  }

  const formatNumber = (num: number | undefined | null) => {
    if (typeof num !== 'number' || isNaN(num)) return "N/A";
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="border-b border-gray-800 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/forseti-logo.png" alt="Forseti" width={40} height={40} className="h-10 w-10" />
              <span className="text-2xl font-bold text-gray-100">Forseti Scan</span>
            </Link>
            <nav className="hidden space-x-6 md:flex">
              <Button variant="link" className="text-gray-300 hover:text-white">
                Tokens
              </Button>
              <Button variant="link" className="text-gray-300 hover:text-white">
                Liquidity
              </Button>
              <Button variant="link" className="text-gray-300 hover:text-white">
                Create
              </Button>
              <Button variant="link" className="text-gray-300 hover:text-white">
                FAQ
              </Button>
            </nav>
          </div>

          <Button className="rounded-md bg-cyan-400 px-6 py-2 font-medium text-black hover:bg-cyan-300">Connect</Button>
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
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">{token.address}</div>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold">{token.marketCap}</div>
                <div className="text-sm text-gray-400">{token.sats} sats</div>
              </div>
              <Button className="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
                <Zap className="h-4 w-4" />
                <span>Quick Buy</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
              <Tabs defaultValue="overview">
                <TabsList className="mb-4 grid w-full grid-cols-4 bg-gray-800">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="holders">Holders</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                      <div className="text-sm text-gray-400">Age</div>
                      <div className="text-xl font-bold">{token.age}</div>
                    </div>
                    <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                      <div className="text-sm text-gray-400">Market Cap</div>
                      <div className="text-xl font-bold">{token.marketCap}</div>
                      <div className="text-sm text-gray-400">{token.sats} sats</div>
                    </div>
                    <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                      <div className="text-sm text-gray-400">Volume (24h)</div>
                      <div className="text-xl font-bold">{token.volume.btc} BTC</div>
                      <div className="text-sm text-gray-400">${formatNumber(token.volume.usd)}</div>
                    </div>
                    <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                      <div className="text-sm text-gray-400">Transactions</div>
                      <div className="text-xl font-bold">{formatNumber(token.txns)}</div>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                    <h3 className="mb-2 text-lg font-semibold">Price Changes</h3>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-400">5m</div>
                        <div
                          className={`text-lg font-bold ${token.change5m === "-" ? "text-gray-400" : token.change5m?.includes("-") ? "text-red-500" : "text-green-500"}`}
                        >
                          {token.change5m}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">1h</div>
                        <div
                          className={`text-lg font-bold ${token.change1h === "-" ? "text-gray-400" : token.change1h?.includes("-") ? "text-red-500" : "text-green-500"}`}
                        >
                          {token.change1h}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">6h</div>
                        <div
                          className={`text-lg font-bold ${token.change6h === "-" ? "text-gray-400" : token.change6h?.includes("-") ? "text-red-500" : "text-green-500"}`}
                        >
                          {token.change6h}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">24h</div>
                        <div
                          className={`text-lg font-bold ${token.change24h === "-" ? "text-gray-400" : token.change24h?.includes("-") ? "text-red-500" : "text-green-500"}`}
                        >
                          {token.change24h}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                    <h3 className="mb-2 text-lg font-semibold">Ascended</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={100} className="h-2 w-full bg-gray-700" />
                      </div>
                      <div className="text-lg font-bold">100%</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      {token.ascended.direction === "up" ? "+" : "-"}
                      {token.ascended.percent}% in the last 24 hours
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="transactions">
                  <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                    <h3 className="mb-4 text-lg font-semibold">Recent Transactions</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                            <th className="pb-2">Tx Hash</th>
                            <th className="pb-2">Type</th>
                            <th className="pb-2">Amount</th>
                            <th className="pb-2">Value</th>
                            <th className="pb-2">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {token.transactions.map((tx, index) => (
                            <tr key={index} className="border-b border-gray-800 text-sm">
                              <td className="py-3">
                                <div className="flex items-center gap-1 text-cyan-400">
                                  {tx.hash}
                                  <ExternalLink className="h-3 w-3" />
                                </div>
                              </td>
                              <td className={`py-3 ${tx.type === "Buy" ? "text-green-500" : "text-red-500"}`}>
                                {tx.type}
                              </td>
                              <td className="py-3">{tx.amount}</td>
                              <td className="py-3">{tx.value}</td>
                              <td className="py-3 text-gray-400">{tx.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="holders">
                  <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                    <h3 className="mb-4 text-lg font-semibold">Top Holders</h3>
                    <div className="space-y-4">
                      {token.holders.map((holder, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-gray-800"></div>
                              <div>
                                <div className="text-sm">{holder.address}</div>
                                <div className="text-xs text-gray-400">Wallet</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">{holder.percentage}%</div>
                              <div className="text-xs text-gray-400">{holder.amount} tokens</div>
                            </div>
                          </div>
                          <div className="mt-2 h-1.5 w-full rounded-full bg-gray-800">
                            <div
                              className="h-1.5 rounded-full bg-cyan-500"
                              style={{ width: `${holder.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="social">
                  <div className="rounded-md border border-gray-800 bg-gray-800/50 p-4">
                    <h3 className="mb-4 text-lg font-semibold">Social Links</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <Link href={token.website} className="text-cyan-400 hover:underline">
                          Website
                        </Link>
                        <ExternalLink className="h-3 w-3 text-cyan-400" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Link href={token.twitter} className="text-cyan-400 hover:underline">
                          Twitter
                        </Link>
                        <ExternalLink className="h-3 w-3 text-cyan-400" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Link href={token.telegram} className="text-cyan-400 hover:underline">
                          Telegram
                        </Link>
                        <ExternalLink className="h-3 w-3 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
              <h3 className="mb-4 text-lg font-semibold">Token Info</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="text-sm text-gray-400">Token Name</div>
                  <div className="text-sm">{token.name}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-400">Token Ticker</div>
                  <div className="text-sm">{token.ticker}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-400">Address</div>
                  <div className="text-sm">{token.address}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-400">Age</div>
                  <div className="text-sm">{token.age}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-400">Market Cap</div>
                  <div className="text-sm">{token.marketCap}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-400">Sats</div>
                  <div className="text-sm">{token.sats}</div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full flex items-center justify-center gap-1 bg-blue-600 text-white hover:bg-blue-500">
                  <Zap className="h-4 w-4" />
                  <span>Quick Buy {token.sats}K sats</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
