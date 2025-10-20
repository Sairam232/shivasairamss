# API Endpoints - Free vs API Key Required

## ✅ FREE ENDPOINTS (No API Key Needed) - 8 Endpoints

These work immediately with NO API key:

1. **GET /** - API Documentation
2. **GET /health** - Health Check
3. **POST /analyze** - Analyze URL
4. **POST /api/analyze** - Analyze URL
5. **POST /api/bulk/analyze** - Bulk Analysis (max 10 URLs)
6. **POST /api/validate** - URL Validation
7. **GET /api/pricing** - Pricing Info
8. **GET /api/pricing/tiers** - Pricing Tiers

### Example (No API Key):
```bash
curl -X POST https://shivasairams.swami8uds.workers.dev/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "http://github.com"}'
```

---

## 🔐 PREMIUM ENDPOINTS (API Key Required) - 7 Endpoints

These return **401 "API key required"** without a key:

1. **POST /api/analyze/advanced** - Advanced Analysis
2. **POST /api/seo/analysis** - SEO Analysis
3. **POST /api/browser/quick-check** - Browser Check
4. **POST /api/batch/quick-analyze** - Batch Analysis (50 URLs)
5. **POST /api/analyze/malware-scan** - Malware Scan
6. **POST /api/analyze/cdn-detection** - CDN Detection
7. **POST /api/analyze/mobile-comparison** - Mobile Comparison

### How to Use with API Key:
```bash
curl -X POST https://shivasairams.swami8uds.workers.dev/api/analyze/advanced \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{"url": "http://github.com"}'
```

---

## ⚠️ PREMIUM ENDPOINTS (Working WITHOUT API Key) - 19 Endpoints

These currently work without API key (may change in production):

- Domain Analytics
- URL Analytics
- Enhanced Security Scan
- Dashboard Stats
- Analytics History
- Bot User Agent Test
- Robots.txt Check
- Export to CSV
- Decode URL Shortener
- Detect Redirect Loop
- Generate Redirect Rules
- Domain Trust Score
- Analyze with Auth
- Analyze with Webhook
- Comprehensive Analysis
- Link Type Classification
- SEO Link Juice
- Network Diversity
- And more...

---

## Summary

**Total:** 34 endpoints
- **Free (no key):** 8 endpoints
- **Require API key:** 7 endpoints  
- **Currently open:** 19 endpoints
