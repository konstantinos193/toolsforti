const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;

// Increase cache TTL to 5 minutes
let cache = { tokens: null, timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Add BTC price cache with longer TTL
let btcPriceCache = { price: 0, timestamp: 0 };
const BTC_PRICE_CACHE_TTL = 15 * 60 * 1000; // 15 minutes

// Create axios instance with default config
const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Helper: Assign risk level
function assignRiskLevel(token) {
  if (!token) return 'high';
  
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

// Optimize TV feed fetching with caching and timeout
const tvFeedCache = new Map();
const TV_FEED_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const TV_FEED_TIMEOUT = 1000; // 1 second timeout

async function fetchTokenTVFeed(tokenId) {
  // Skip TV feed fetching for now to improve performance
  return null;

  /* Commented out TV feed fetching
  const cached = tvFeedCache.get(tokenId);
  if (cached && (Date.now() - cached.timestamp < TV_FEED_CACHE_TTL)) {
    return cached.data;
  }

  try {
    const response = await axiosInstance.get(`https://api.odin.fun/v1/token/${tokenId}/tv_feed`, {
      params: {
        resolution: 1,
        last: 1440
      },
      timeout: TV_FEED_TIMEOUT
    });
    
    tvFeedCache.set(tokenId, {
      data: response.data,
      timestamp: Date.now()
    });
    
    return response.data;
  } catch (err) {
    console.error(`Error fetching TV feed for token ${tokenId}:`, err.message);
    return null;
  }
  */
}

// Optimize BTC price fetching
async function fetchBTCPrice() {
  if (btcPriceCache.price && (Date.now() - btcPriceCache.timestamp < BTC_PRICE_CACHE_TTL)) {
    return btcPriceCache.price;
  }

  try {
    const response = await axiosInstance.get('https://mempool.space/api/v1/prices');
    
    if (response.data && typeof response.data.USD === 'number') {
      btcPriceCache = {
        price: response.data.USD,
        timestamp: Date.now()
      };
      return response.data.USD;
    }
    return btcPriceCache.price || 0;
  } catch (err) {
    console.error('Error fetching BTC price:', err.message);
    return btcPriceCache.price || 0;
  }
}

// Optimize token normalization with fallbacks
async function normalizeToken(token) {
  if (!token || typeof token !== 'object') {
    console.log('Debug: Invalid token object received:', token);
    return null;
  }

  try {
    console.log('Debug: Processing token:', token.id);
    
    // Skip TV feed fetching and just get BTC price
    const btcPrice = await fetchBTCPrice();

    // Calculate volume from token data
    const volumeBtc = (token.volume || 0) / 100000000;
    const volumeUsd = volumeBtc * btcPrice;

    // Calculate age with validation
    const age = calculateAge(token.created_time);
    const timestamp = token.created_time ? new Date(token.created_time).getTime() : 0;

    const normalizedToken = {
      id: token.id || "unknown",
      name: token.name || "Unknown",
      ticker: token.ticker || "???",
      address: token.id || "unknown",
      logo: token.id ? `https://images.odin.fun/token/${token.id}` : "",
      age: age.text,
      ageValue: age.value,
      timestamp,
      marketCap: formatMarketCap(token.marketcap),
      sats: (typeof token.price === 'number' && !isNaN(token.price)) ? token.price : 0,
      change5m: formatChange(token.price_5m),
      change1h: formatChange(token.price_1h),
      change6h: formatChange(token.price_6h),
      change24h: formatChange(token.price_1d),
      volume: { btc: volumeBtc, usd: volumeUsd },
      txns: formatTxns(token.txn_count),
      ascended: { percent: 0, direction: "up" },
      risk: token.risk,
      contractStatus: token.verified === true ? "Verified" : (token.verified === false ? "Unverified" : undefined),
      marketManipulation: {
        title: "Data Unavailable",
        details: ["Trading data analysis temporarily disabled"]
      }
    };

    console.log('Debug: Successfully normalized token:', token.id);
    return normalizedToken;
  } catch (error) {
    console.error(`Error normalizing token ${token.id}:`, error);
    return null;
  }
}

// Helper functions for formatting
function formatMarketCap(marketCap) {
  if (typeof marketCap !== 'number' || isNaN(marketCap)) return "N/A";
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(1)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(1)}M`;
  if (marketCap >= 1e3) return `$${(marketCap / 1e3).toFixed(1)}K`;
  return `$${marketCap}`;
}

function formatChange(value) {
  return (typeof value === 'number' && !isNaN(value)) ? value.toString() : "-";
}

function formatTxns(value) {
  return (typeof value === 'number' && !isNaN(value)) ? value.toString() : "N/A";
}

function calculateAge(createdTime) {
  if (!createdTime) return { text: "Unknown", value: 0 };
  
  const created = new Date(createdTime);
  if (isNaN(created.getTime())) return { text: "Unknown", value: 0 };
  
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  
  let text = "Unknown";
  if (diffSecs < 60) text = `${diffSecs}s`;
  else if (diffSecs < 3600) text = `${Math.floor(diffSecs / 60)}m`;
  else if (diffSecs < 86400) text = `${Math.floor(diffSecs / 3600)}h`;
  else if (diffSecs < 2592000) text = `${Math.floor(diffSecs / 86400)}d`;
  else if (diffSecs < 31536000) text = `${Math.floor(diffSecs / 2592000)}mo`;
  else text = `${Math.floor(diffSecs / 31536000)}y`;
  
  return { text, value: diffSecs };
}

// Optimize batch processing with smaller batches and better error handling
async function processTokensInBatches(tokens, batchSize = 10) { // Increased batch size since we're not fetching TV feed
  const results = [];
  const batches = [];
  
  // Split tokens into batches
  for (let i = 0; i < tokens.length; i += batchSize) {
    batches.push(tokens.slice(i, i + batchSize));
  }

  // Process batches with concurrency control
  for (const batch of batches) {
    const batchPromises = batch.map(async (token) => {
      try {
        const risk = assignRiskLevel(token);
        const normalizedToken = await normalizeToken({
          ...token,
          risk
        });
        if (!normalizedToken) {
          console.log('Debug: Token normalization failed for:', token.id);
        }
        return normalizedToken;
      } catch (error) {
        console.error(`Error processing token ${token.id}:`, error.message);
        return null;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults.filter(Boolean));
  }

  return results;
}

// Main API endpoint with optimized caching and error handling
app.get('/api/tokens', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    console.log('Debug: Request received for page', page, 'limit', limit);

    // Serve from cache if available and fresh
    if (cache.tokens && (Date.now() - cache.timestamp < CACHE_TTL)) {
      console.log('Debug: Serving from cache, cache size:', cache.tokens.tokens.length);
      const start = (page - 1) * limit;
      const end = start + limit;
      return res.json({
        tokens: cache.tokens.tokens.slice(start, end),
        total: cache.tokens.total
      });
    }

    console.log('Debug: Cache miss, fetching from API');
    // Fetch tokens with timeout
    const response = await axiosInstance.get('https://api.odin.fun/v1/tokens', {
      params: {
        sort: 'created_time:desc',
        modified_by: 'table',
        page: 1,
        limit: 1000
      }
    });

    console.log('Debug: API Response received:', {
      hasData: !!response.data,
      dataType: typeof response.data,
      isArray: Array.isArray(response.data),
      keys: response.data ? Object.keys(response.data) : []
    });

    let tokens = [];
    if (Array.isArray(response.data.data)) {
      tokens = response.data.data;
      console.log('Debug: Using response.data.data, length:', tokens.length);
    } else if (Array.isArray(response.data.tokens)) {
      tokens = response.data.tokens;
      console.log('Debug: Using response.data.tokens, length:', tokens.length);
    } else if (Array.isArray(response.data)) {
      tokens = response.data;
      console.log('Debug: Using response.data, length:', tokens.length);
    } else if (typeof response.data === 'object') {
      tokens = [response.data];
      console.log('Debug: Using single object response');
    }

    if (tokens.length === 0) {
      console.log('Debug: No tokens found in response');
      return res.json({ 
        tokens: [], 
        total: 0,
        error: 'No tokens found in API response',
        debug: {
          responseData: response.data,
          responseStatus: response.status,
          responseHeaders: response.headers
        }
      });
    }

    console.log('Debug: Processing', tokens.length, 'tokens');
    // Process tokens in optimized batches
    const allTokens = await processTokensInBatches(tokens);
    console.log('Debug: Processed tokens count:', allTokens.length);
    
    if (allTokens.length === 0) {
      return res.json({
        tokens: [],
        total: 0,
        error: 'Token processing failed',
        debug: {
          originalTokensCount: tokens.length,
          processedTokensCount: allTokens.length,
          sampleToken: tokens[0]
        }
      });
    }

    // Sort and cache results
    allTokens.sort((a, b) => b.timestamp - a.timestamp);
    cache.tokens = { tokens: allTokens, total: allTokens.length };
    cache.timestamp = Date.now();

    // Return paginated results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTokens = allTokens.slice(startIndex, endIndex);
    
    console.log('Debug: Returning', paginatedTokens.length, 'tokens for page', page);
    res.json({
      tokens: paginatedTokens,
      total: allTokens.length
    });
  } catch (err) {
    console.error('Error in /api/tokens:', err);
    res.status(500).json({ 
      error: 'Failed to fetch tokens',
      message: err.message,
      stack: err.stack,
      details: {
        name: err.name,
        code: err.code,
        response: err.response ? {
          status: err.response.status,
          statusText: err.response.statusText,
          data: err.response.data,
          headers: err.response.headers
        } : null
      }
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/tokens`);
});