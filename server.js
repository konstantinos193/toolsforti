const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;

// In-memory cache
let cache = { tokens: null, timestamp: 0 };
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

// Add BTC price cache
let btcPriceCache = { price: 0, timestamp: 0 };
const BTC_PRICE_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper: Assign risk level
function assignRiskLevel(token) {
  if (token.holder_count < 10) return 'high';
  if (token.txn_count < 20) return 'high';
  if (token.verified === false) return 'high';
  if (token.volume < 1000000) return 'high';
  if (token.buy_count < 5 || token.sell_count < 5) return 'high';
  if (token.verified === true) return 'low';
if (token.holder_count > 100) return 'low';
if (token.volume > 10000000) return 'low';
if (token.txn_count > 100) return 'low';
if (token.featured === true) return 'low';
return 'medium';
}

function formatCap(val) {
  if (typeof val !== 'number' || isNaN(val)) return "N/A";
  if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
  return `$${val}`;
}

async function fetchTokenTVFeed(tokenId) {
  try {
    const response = await axios.get(`https://api.odin.fun/v1/token/${tokenId}/tv_feed`, {
      params: {
        resolution: 1, // 1 minute intervals
        last: 1440 // Last 24 hours (24 * 60 minutes)
      },
      timeout: 5000
    });
    return response.data;
  } catch (err) {
    console.error(`Error fetching TV feed for token ${tokenId}:`, err.message);
    return null;
  }
}

function calculate24hChange(tvFeed) {
  if (!tvFeed || !Array.isArray(tvFeed) || tvFeed.length === 0) return "-";
  
  // Get the first and last price from the feed
  const firstPrice = tvFeed[0].open;
  const lastPrice = tvFeed[tvFeed.length - 1].close;
  
  if (typeof firstPrice !== 'number' || typeof lastPrice !== 'number') return "-";
  
  // Check if we have enough data points for 24h (1440 minutes)
  if (tvFeed.length < 1440) {
    // For tokens less than 24h old, calculate change from first to last available price
    const firstTime = new Date(tvFeed[0].date_time).getTime();
    const lastTime = new Date(tvFeed[tvFeed.length - 1].date_time).getTime();
    const hoursSinceFirst = (lastTime - firstTime) / (1000 * 60 * 60);
    
    // Calculate percentage change
    const change = ((lastPrice - firstPrice) / firstPrice) * 100;
    return `${change.toFixed(2)}% (${hoursSinceFirst.toFixed(1)}h)`;
  }
  
  // For tokens older than 24h, calculate standard 24h change
  const change = ((lastPrice - firstPrice) / firstPrice) * 100;
  return change.toFixed(2) + "%";
}

async function fetchBTCPrice() {
  // Return cached price if it's fresh
  if (btcPriceCache.price && (Date.now() - btcPriceCache.timestamp < BTC_PRICE_CACHE_TTL)) {
    return btcPriceCache.price;
  }

  try {
    const response = await axios.get('https://mempool.space/api/v1/prices', {
      timeout: 5000
    });
    
    if (response.data && typeof response.data.USD === 'number') {
      btcPriceCache = {
        price: response.data.USD,
        timestamp: Date.now()
      };
      return response.data.USD;
    }
    return 0;
  } catch (err) {
    console.error('Error fetching BTC price:', err.message);
    return btcPriceCache.price || 0; // Return cached price if available, otherwise 0
  }
}

async function normalizeToken(token) {
  if (!token || typeof token !== 'object') {
    return {
      id: "unknown",
      name: "Unknown",
      ticker: "???",
      address: "unknown",
      logo: "",
      age: "Unknown",
      ageValue: 0,
      timestamp: 0,
      marketCap: "N/A",
      sats: 0,
      change5m: "-",
      change1h: "-",
      change6h: "-",
      change24h: "-",
      volume: { btc: 0, usd: 0 },
      txns: "N/A",
      ascended: { percent: 0, direction: "up" },
      risk: "medium",
      contractStatus: undefined,
    };
  }

  // Fetch TV feed data for 24h change and volume
  const tvFeed = await fetchTokenTVFeed(token.id);
  const change24h = calculate24hChange(tvFeed);
  
  // Calculate total volume from TV feed
  let volumeBtc = 0;
  if (tvFeed && Array.isArray(tvFeed)) {
    // Sum all candle volumes for 24h total
    const totalSats = tvFeed.reduce((sum, candle) => sum + (candle.volume || 0), 0);
    volumeBtc = totalSats / 100000000;

    console.log('DEBUG VOLUME:', {
      sats: totalSats,
      btc: volumeBtc,
      usd: volumeBtc * await fetchBTCPrice(),
      btcPrice: await fetchBTCPrice()
    });
  }

  // Get current BTC price and calculate USD volume
  const btcPrice = await fetchBTCPrice();
  const volumeUsd = volumeBtc * btcPrice;

  // Calculate age and timestamp
  let age = "Unknown";
  let ageValue = 0;
  let timestamp = 0;

  if (token.created_time) {
    const created = new Date(token.created_time);
    if (!isNaN(created.getTime())) {
      timestamp = created.getTime();
      const now = new Date();
      const diffMs = now.getTime() - timestamp;
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffMonths / 12);

      ageValue = diffSecs;

      if (diffSecs < 60) {
        age = `${diffSecs}s`;
      } else if (diffMins < 60) {
        age = `${diffMins}m`;
      } else if (diffHours < 24) {
        age = `${diffHours}h`;
      } else if (diffDays < 30) {
        age = `${diffDays}d`;
      } else if (diffMonths < 12) {
        age = `${diffMonths}mo`;
      } else {
        age = `${diffYears}y`;
      }
    }
  }

  // Market Cap formatting
  let marketCap = token.marketcap;
  let marketCapStr = (typeof marketCap === 'number' && !isNaN(marketCap))
    ? (marketCap >= 1e9
        ? `$${(marketCap / 1e9).toFixed(1)}B`
        : marketCap >= 1e6
          ? `$${(marketCap / 1e6).toFixed(1)}M`
          : marketCap >= 1e3
            ? `$${(marketCap / 1e3).toFixed(1)}K`
            : `$${marketCap}`)
    : "N/A";

  // Txns
  let txns = token.txn_count;
  let txnsStr = (typeof txns === 'number' && !isNaN(txns)) ? txns.toString() : "N/A";

  // Sats
  let sats = (typeof token.price === 'number' && !isNaN(token.price)) ? token.price : 0;

  // Logo: use the id-based URL (as you do) or, if you want the real image, use the image field
  let logo = token.id ? `https://images.odin.fun/token/${token.id}` : "";

  const marketManipulation = analyzeMarketManipulation(tvFeed);

  return {
    id: token.id || "unknown",
    name: token.name || "Unknown",
    ticker: token.ticker || "???",
    address: token.id || "unknown",
    logo,
    age,
    ageValue,
    timestamp,
    marketCap: marketCapStr,
    sats,
    change5m: (typeof token.price_5m === 'number' && !isNaN(token.price_5m)) ? token.price_5m.toString() : "-",
    change1h: (typeof token.price_1h === 'number' && !isNaN(token.price_1h)) ? token.price_1h.toString() : "-",
    change6h: (typeof token.price_6h === 'number' && !isNaN(token.price_6h)) ? token.price_6h.toString() : "-",
    change24h: change24h,
    volume: {
      btc: volumeBtc,
      usd: volumeUsd,
    },
    txns: txnsStr,
    ascended: { percent: 0, direction: "up" },
    risk: token.risk,
    contractStatus: token.verified === true ? "Verified" : (token.verified === false ? "Unverified" : undefined),
    marketManipulation,
  };
}

app.get('/api/tokens', async (req, res) => {
  // Pagination params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;

  // Serve from cache if available and fresh
  if (cache.tokens && (Date.now() - cache.timestamp < CACHE_TTL)) {
    console.log('Serving from cache');
    // Paginate cached tokens
    const start = (page - 1) * limit;
    const end = start + limit;
    return res.json({
      tokens: cache.tokens.tokens.slice(start, end),
      total: cache.tokens.total
    });
  }

  let allTokens = [];
  try {
    // Only fetch the first N tokens for speed
    const response = await axios.get('https://api.odin.fun/v1/tokens', {
      params: {
        sort: 'created_time:desc',
        modified_by: 'table',
        page: 1,
        limit: 1000
      },
      timeout: 10000
    });

    let tokens = [];
    if (Array.isArray(response.data.data)) {
      tokens = response.data.data;
    } else if (Array.isArray(response.data.tokens)) {
      tokens = response.data.tokens;
    } else if (Array.isArray(response.data)) {
      tokens = response.data;
    } else if (typeof response.data === 'object' && Object.keys(response.data).length > 0) {
      tokens = [response.data];
    }

    // Process tokens in parallel with a concurrency limit
    const concurrencyLimit = 5;
    const chunks = [];
    for (let i = 0; i < tokens.length; i += concurrencyLimit) {
      chunks.push(tokens.slice(i, i + concurrencyLimit));
    }

    for (const chunk of chunks) {
      const normalizedChunk = await Promise.all(
        chunk.map(token => normalizeToken({
          ...token,
          risk: assignRiskLevel(token)
        }))
      );
      allTokens.push(...normalizedChunk);
    }

    // Sort by timestamp (newer first)
    allTokens.sort((a, b) => b.timestamp - a.timestamp);

    // Cache the result
    cache.tokens = { tokens: allTokens, total: allTokens.length };
    cache.timestamp = Date.now();

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTokens = allTokens.slice(startIndex, endIndex);

    res.json({
      tokens: paginatedTokens,
      total: allTokens.length
    });
  } catch (err) {
    console.error('Error fetching tokens:', err.message);
    return res.status(500).json({ error: 'Failed to fetch tokens', details: err.message });
  }
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}/api/tokens`);
});