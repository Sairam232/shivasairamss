# 🔗 Redirect Chain Analyzer API

**Production-ready API for analyzing URL redirect chains - Cloudflare Workers Edition**

## 🚀 Quick Deploy to Cloudflare

This project is **100% ready** to deploy to Cloudflare Workers - pure JavaScript, no Python dependencies!

### What's Included
- ✅ **worker.js** (2,187 lines) - Complete API with all 34 endpoints
- ✅ **wrangler.toml** - Cloudflare configuration
- ✅ Zero dependencies - Standalone JavaScript

### Deploy in 5 Steps

```bash
# 1. Install Wrangler CLI
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Create KV namespaces
wrangler kv:namespace create "RATE_LIMITS"
wrangler kv:namespace create "API_KEYS"
wrangler kv:namespace create "ANALYTICS_DATA"

# 4. Update wrangler.toml with the KV namespace IDs from step 3

# 5. Deploy
wrangler deploy
```

Your API will be live at: `https://redirect-analyzer-api.YOURNAME.workers.dev`

## 📋 API Endpoints (34 Total)

### Free Tier Endpoints (No API Key Required)
- `GET /` - API documentation
- `GET /health` - Health check
- `POST /analyze` - Analyze redirect chain (100/day)
- `POST /api/analyze` - Analyze redirect chain (100/day)
- `POST /api/bulk/analyze` - Bulk analysis (10/day, max 10 URLs)
- `POST /api/validate` - URL validation
- `GET /api/pricing` - Pricing information
- `GET /api/pricing/tiers` - Pricing tiers

### Premium Endpoints (Require API Key)
- `POST /api/analyze/advanced` - Advanced analysis with metrics
- `GET /api/analytics/domain/:domain` - Domain analytics
- `GET /api/analytics/url/:url` - URL analytics
- `POST /api/seo/analysis` - SEO impact analysis
- `POST /api/browser/quick-check` - Browser compatibility check
- `POST /api/batch/quick-analyze` - Batch quick analyze (50 URLs)
- `POST /api/analyze/malware-scan` - Malware/threat scanning
- `POST /api/network/detection` - CDN/network detection
- `POST /api/revenue/optimization` - Revenue optimization tips
- `POST /api/analyze/mobile-comparison` - Mobile vs desktop comparison
- `POST /api/security/enhanced-scan` - Enhanced security scan
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/analytics/history` - Analytics history
- `POST /api/analyze/bot-test` - Bot user agent testing
- `POST /api/robots-txt/check` - robots.txt checking
- `POST /api/export/csv` - Export results to CSV
- `POST /api/decode-shortener` - URL shortener decoder
- `POST /api/detect-redirect-loop` - Redirect loop detection
- `POST /api/generate-redirect-rules` - Generate Apache/Nginx rules
- `POST /api/analyze/domain-trust` - Domain trust scoring
- `POST /api/analyze/with-auth` - Analysis with HTTP Basic Auth
- `POST /api/analyze/with-webhook` - Analysis with webhook callback
- `POST /api/analyze/comprehensive` - Comprehensive analysis (all features)
- `POST /api/analyze/link-types` - Link type classification
- `POST /api/analyze/seo-link-juice` - SEO link juice analysis
- `POST /api/analyze/network-diversity` - Network diversity analysis

## 🔐 Security Features

- ✅ **SSRF Protection** - Blocks private IPs, localhost, cloud metadata endpoints
- ✅ **Rate Limiting** - IP-based rate limits via Cloudflare KV Storage
- ✅ **API Key Validation** - Secure premium endpoint access
- ✅ **CORS Headers** - Configured for browser access
- ✅ **Input Validation** - Comprehensive URL and parameter validation

## 📊 Features

- **Real Redirect Analysis** - Manually follows redirects to capture each hop
- **Performance Metrics** - Response times, total chain time, performance grading
- **Security Scanning** - HTTPS validation, suspicious domain detection, safety scores
- **Affiliate Detection** - Identifies affiliate and tracking parameters
- **SEO Analysis** - Redirect chain impact on search engine optimization
- **Bulk Processing** - Analyze multiple URLs concurrently
- **Network Detection** - Identify CDNs (Cloudflare, AWS CloudFront, Akamai)
- **Bot Testing** - Test different user agents (desktop, mobile, bot)
- **Link Intelligence** - Detect link types and tracking parameters

## 🛠️ Technology Stack

- **Platform**: Cloudflare Workers (Edge Network)
- **Language**: JavaScript (ES6+)
- **Storage**: Cloudflare KV (Key-Value Store)
- **Rate Limiting**: KV-based per-IP daily limits
- **Database**: None - Fully serverless architecture

## 📖 Example Usage

### Analyze a URL
```bash
curl -X POST https://your-api.workers.dev/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://bit.ly/example"}'
```

### Bulk Analysis
```bash
curl -X POST https://your-api.workers.dev/api/bulk/analyze \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://bit.ly/1", "https://bit.ly/2"]}'
```

### Premium Endpoint (with API Key)
```bash
curl -X POST https://your-api.workers.dev/api/analyze/advanced \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{"url": "https://example.com"}'
```

## 🧪 Testing

Test results with real URLs (bit.ly, Google, GitHub, Amazon) available in `api_test_results_real_urls.md`

All 34 endpoints tested and verified working with 100% success rate.

## 📝 Documentation

- `CLOUDFLARE_DEPLOYMENT_FILES.md` - Detailed deployment guide
- `CLEANUP_SUMMARY.md` - What was removed to make this Cloudflare-only
- `api_test_results_real_urls.md` - Test verification with real URLs

## 🎯 Why Cloudflare Workers?

- ⚡ **Global Edge Network** - Low latency worldwide
- 💰 **Cost Effective** - Free tier: 100,000 requests/day
- 🚀 **Instant Scaling** - Automatic scaling to handle traffic
- 🔒 **Built-in DDoS Protection** - Cloudflare security included
- 🌍 **Zero Cold Starts** - Always fast response times

## 📝 License

MIT License - Free to use for personal and commercial projects

## 🤝 Support

For API keys, enterprise features, or support: contact@yourapi.com

---

**Status**: ✅ Production Ready | **Endpoints**: 34 | **Platform**: Cloudflare Workers | **Dependencies**: Zero
