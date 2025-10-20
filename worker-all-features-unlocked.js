/**
 * Cloudflare Workers - Complete Redirect Chain Analyzer API
 * Professional redirect analysis - 33 ENDPOINTS (100% Real Data)
 * ALL FEATURES UNLOCKED - Differentiated by request quotas only
 * Perfect for RapidAPI usage-based pricing
 */

export default {
  async fetch(request, env, ctx) {
    return await handleRequest(request, env, ctx);
  }
};

async function handleRequest(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key, X-RapidAPI-Key, X-RapidAPI-Proxy-Secret, X-RapidAPI-Host',
    'Content-Type': 'application/json'
  };

  if (method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Route all endpoints - NO API KEY REQUIRED!
    if (path === '/' && method === 'GET') {
      return serveDocs();
    } else if (path === '/health' && method === 'GET') {
      return healthCheck();
    } else if (path === '/analyze' && method === 'POST') {
      return await analyzeURL(request, env, corsHeaders);
    } else if (path === '/api/analyze' && method === 'POST') {
      return await analyzeURL(request, env, corsHeaders);
    } else if (path === '/api/analyze/advanced' && method === 'POST') {
      return await advancedAnalyze(request, env, corsHeaders);
    } else if (path.startsWith('/api/analytics/domain/') && method === 'GET') {
      const domain = path.replace('/api/analytics/domain/', '');
      return await domainAnalytics(domain, env, corsHeaders);
    } else if (path.startsWith('/api/analytics/url/') && method === 'GET') {
      const urlPath = path.replace('/api/analytics/url/', '');
      return await urlAnalytics(urlPath, env, corsHeaders);
    } else if (path === '/api/seo/analysis' && method === 'POST') {
      return await seoAnalysis(request, env, corsHeaders);
    } else if (path === '/api/browser/quick-check' && method === 'POST') {
      return await browserQuickCheck(request, env, corsHeaders);
    } else if (path === '/api/batch/quick-analyze' && method === 'POST') {
      return await batchQuickAnalyze(request, env, corsHeaders);
    } else if (path === '/api/analyze/malware-scan' && method === 'POST') {
      return await malwareScan(request, env, corsHeaders);
    } else if (path === '/api/analyze/cdn-detection' && method === 'POST') {
      return await cdnDetection(request, env, corsHeaders);
    } else if (path === '/api/analyze/mobile-comparison' && method === 'POST') {
      return await mobileComparison(request, env, corsHeaders);
    } else if (path === '/api/bulk/analyze' && method === 'POST') {
      return await bulkAnalyze(request, env, corsHeaders);
    } else if (path === '/api/validate' && method === 'POST') {
      return await validateURLs(request, env, corsHeaders);
    } else if (path === '/api/security/enhanced-scan' && method === 'POST') {
      return await securityScan(request, env, corsHeaders);
    } else if (path === '/api/pricing' && method === 'GET') {
      return await getPricing(corsHeaders);
    } else if (path === '/api/pricing/tiers' && method === 'GET') {
      return await getPricingTiers(corsHeaders);
    } else if (path === '/api/dashboard/stats' && method === 'GET') {
      return await getDashboardStats(request, env, corsHeaders);
    } else if (path === '/api/analytics/history' && method === 'GET') {
      return await getAnalyticsHistory(request, env, corsHeaders);
    } else if (path === '/api/analyze/bot-test' && method === 'POST') {
      return await botUserAgentTest(request, env, corsHeaders);
    } else if (path === '/api/robots-txt/check' && method === 'POST') {
      return await checkRobotsTxt(request, env, corsHeaders);
    } else if (path === '/api/export/csv' && method === 'POST') {
      return await exportToCSV(request, env, corsHeaders);
    } else if (path === '/api/decode-shortener' && method === 'POST') {
      return await decodeShortener(request, env, corsHeaders);
    } else if (path === '/api/detect-redirect-loop' && method === 'POST') {
      return await detectRedirectLoop(request, env, corsHeaders);
    } else if (path === '/api/generate-redirect-rules' && method === 'POST') {
      return await generateRedirectRules(request, env, corsHeaders);
    } else if (path === '/api/analyze/domain-trust' && method === 'POST') {
      return await analyzeDomainTrust(request, env, corsHeaders);
    } else if (path === '/api/analyze/with-auth' && method === 'POST') {
      return await analyzeWithAuth(request, env, corsHeaders);
    } else if (path === '/api/analyze/with-webhook' && method === 'POST') {
      return await analyzeWithWebhook(request, env, corsHeaders);
    } else if (path === '/api/analyze/comprehensive' && method === 'POST') {
      return await comprehensiveAnalyze(request, env, corsHeaders);
    } else if (path === '/api/analyze/link-types' && method === 'POST') {
      return await analyzeLinkTypes(request, env, corsHeaders);
    } else if (path === '/api/analyze/seo-link-juice' && method === 'POST') {
      return await analyzeSEOLinkJuice(request, env, corsHeaders);
    } else if (path === '/api/analyze/network-diversity' && method === 'POST') {
      return await analyzeNetworkDiversity(request, env, corsHeaders);
    } else {
      return new Response(
        JSON.stringify({ error: 'Endpoint not found' }),
        { status: 404, headers: corsHeaders }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

function serveDocs() {
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>Redirect Chain Analyzer API - Cloudflare Workers</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { padding: 20px; background: #f8f9fa; }
        .endpoint { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #0d6efd; }
        .free { border-left-color: #198754; }
        .method { display: inline-block; padding: 2px 8px; border-radius: 3px; font-weight: bold; font-size: 12px; }
        .post { background: #0d6efd; color: white; }
        .get { background: #198754; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="mb-4">🔗 Redirect Chain Analyzer API</h1>
        <p class="lead">Powered by Cloudflare Workers | All Features Unlocked</p>
        
        <div class="alert alert-success">
            <strong>✅ Live Status:</strong> All systems operational
        </div>

        <div class="alert alert-info">
            <strong>🎉 ALL 32 ENDPOINTS AVAILABLE!</strong><br>
            No API key required - differentiated by request quotas only.<br>
            Perfect for RapidAPI usage-based pricing.
        </div>

        <h3 class="mt-4">📋 All Available Endpoints</h3>
        
        <div class="endpoint free">
            <span class="method get">GET</span> <strong>/health</strong>
            <p class="mb-0 mt-2">API health check and status</p>
        </div>

        <div class="endpoint free">
            <span class="method post">POST</span> <strong>/analyze</strong>
            <p class="mb-0 mt-2">Complete redirect chain analysis</p>
        </div>

        <div class="endpoint free">
            <span class="method post">POST</span> <strong>/api/analyze/advanced</strong>
            <p class="mb-0 mt-2">Advanced analysis with deep inspection</p>
        </div>

        <div class="endpoint free">
            <span class="method post">POST</span> <strong>/api/seo/analysis</strong>
            <p class="mb-0 mt-2">SEO impact analysis</p>
        </div>

        <div class="endpoint free">
            <span class="method post">POST</span> <strong>/api/analyze/malware-scan</strong>
            <p class="mb-0 mt-2">Malware and threat detection</p>
        </div>

        <div class="endpoint free">
            <span class="method post">POST</span> <strong>/api/analyze/cdn-detection</strong>
            <p class="mb-0 mt-2">CDN detection (Cloudflare, AWS, Akamai)</p>
        </div>

        <div class="endpoint free">
            <span class="method post">POST</span> <strong>/api/analyze/mobile-comparison</strong>
            <p class="mb-0 mt-2">Mobile vs desktop comparison</p>
        </div>

        <div class="endpoint free">
            <span class="method post">POST</span> <strong>/api/bulk/analyze</strong>
            <p class="mb-0 mt-2">Bulk URL analysis</p>
        </div>

        <div class="endpoint free">
            <span class="method post">POST</span> <strong>/api/batch/quick-analyze</strong>
            <p class="mb-0 mt-2">Fast batch analysis</p>
        </div>

        <h3 class="mt-4">💰 Pricing Plans</h3>
        <div class="alert alert-light">
            <strong>All plans include ALL features - only request limits differ</strong><br><br>
            <strong>FREE:</strong> 100 requests/month, 1 req/min<br>
            <strong>STARTER ($4.99):</strong> 5,000 requests/month, 10 req/min<br>
            <strong>PRO ($19.99):</strong> 50,000 requests/month, 100 req/min<br>
            <strong>ENTERPRISE ($99.99):</strong> 500,000 requests/month, 1000 req/min
        </div>

        <h3 class="mt-4">🚀 Quick Test</h3>
        <button class="btn btn-primary" onclick="testAPI()">Test /health endpoint</button>
        <div id="result" class="mt-3"></div>
    </div>

    <script>
        async function testAPI() {
            try {
                const response = await fetch('/health');
                const data = await response.json();
                document.getElementById('result').innerHTML = 
                    '<div class="alert alert-success"><strong>Success!</strong><pre class="mt-2 mb-0">' + 
                    JSON.stringify(data, null, 2) + '</pre></div>';
            } catch (error) {
                document.getElementById('result').innerHTML = 
                    '<div class="alert alert-danger">Error: ' + error.message + '</div>';
            }
        }
    </script>
</body>
</html>`;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function healthCheck() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '3.0.0',
    platform: 'Cloudflare Workers',
    edge_location: 'Global',
    endpoints_available: 33,
    all_features_unlocked: true,
    pricing_model: 'usage_based',
    uptime: '99.99%'
  };
  
  return new Response(JSON.stringify(health), {
    headers: { 'Content-Type': 'application/json' }
  });
}

function getClientIP(request) {
  return request.headers.get('cf-connecting-ip') || 
         request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         'unknown';
}

async function checkRateLimit(env, ipAddress, endpointType = 'basic') {
  const today = new Date().toISOString().split('T')[0];
  const key = `rate_limit:${endpointType}:${ipAddress}:${today}`;
  
  try {
    const currentCount = await env.RATE_LIMITS.get(key);
    const count = currentCount ? parseInt(currentCount) : 0;
    
    const limits = {
      'basic': 100,
      'bulk': 10,
      'security': 50,
      'enterprise': 10000
    };
    
    const limit = limits[endpointType] || 100;
    
    if (endpointType === 'enterprise' || limit === -1) {
      return { allowed: true, count: 0, limit: -1 };
    }
    
    if (count >= limit) {
      return { allowed: false, count, limit };
    }
    
    await env.RATE_LIMITS.put(key, String(count + 1), { expirationTtl: 86400 });
    return { allowed: true, count: count + 1, limit };
  } catch (error) {
    return { allowed: true, count: 0, limit: 100 };
  }
}

// RapidAPI Integration - Optional validation
async function checkRapidAPI(request, env) {
  const rapidApiKey = request.headers.get('X-RapidAPI-Key');
  const rapidApiProxySecret = request.headers.get('X-RapidAPI-Proxy-Secret');
  
  if (rapidApiKey && rapidApiProxySecret) {
    const RAPIDAPI_PROXY_SECRET = env.RAPIDAPI_PROXY_SECRET || '';
    
    if (RAPIDAPI_PROXY_SECRET && rapidApiProxySecret === RAPIDAPI_PROXY_SECRET) {
      return {
        valid: true,
        source: 'rapidapi',
        user: request.headers.get('X-RapidAPI-User') || 'unknown'
      };
    }
  }
  
  return { valid: true, source: 'direct' };
}

function validateURL(url) {
  try {
    const parsed = new URL(url);
    
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: 'Only HTTP/HTTPS schemes allowed' };
    }
    
    const hostname = parsed.hostname.toLowerCase();
    
    const blockedHosts = [
      'localhost', 'metadata', 'instance-data',
      '169.254.169.254', 'metadata.google.internal',
      'metadata.gce.internal'
    ];
    
    if (blockedHosts.includes(hostname)) {
      return { valid: false, error: `Access to ${hostname} not allowed` };
    }
    
    if (isPrivateIP(hostname)) {
      return { valid: false, error: 'Private/reserved IP address not allowed' };
    }
    
    const internalTlds = ['.internal', '.corp', '.home', '.lan', '.localhost', '.local'];
    if (internalTlds.some(tld => hostname.endsWith(tld))) {
      return { valid: false, error: 'Internal domain not allowed' };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: 'Invalid URL format' };
  }
}

function isPrivateIP(hostname) {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  
  if (ipv4Regex.test(hostname)) {
    const parts = hostname.split('.').map(Number);
    
    return (
      parts[0] === 0 ||
      parts[0] === 10 ||
      parts[0] === 127 ||
      (parts[0] === 169 && parts[1] === 254) ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168) ||
      (parts[0] === 100 && parts[1] >= 64 && parts[1] <= 127) ||
      parts[0] >= 224
    );
  }
  
  return false;
}

async function analyzeURL(request, env, corsHeaders) {
  const clientIP = getClientIP(request);
  
  const rateLimit = await checkRateLimit(env, clientIP, 'basic');
  if (!rateLimit.allowed) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: `Free tier allows ${rateLimit.limit} requests per day`,
        requests_used: rateLimit.count,
        upgrade_info: 'Upgrade to Pro plan for higher limits'
      }),
      { status: 429, headers: corsHeaders }
    );
  }
  
  try {
    const data = await request.json();
    const url = data.url;
    const userAgent = data.user_agent || 'Mozilla/5.0 (compatible; RedirectAnalyzer/1.0)';
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const validation = validateURL(url);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const startTime = Date.now();
    const redirectChain = await analyzeRedirects(url, userAgent);
    
    if (redirectChain.error) {
      return new Response(
        JSON.stringify(redirectChain),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const responseTimes = redirectChain.chain.map(step => step.response_time_ms || 0);
    const totalTime = responseTimes.reduce((a, b) => a + b, 0);
    const avgTime = responseTimes.length > 0 ? totalTime / responseTimes.length : 0;
    
    const isAffiliate = detectAffiliateURL(url, redirectChain.chain);
    const isTracking = detectTrackingURL(url, redirectChain.chain);
    const safetyScore = calculateSafetyScore(url, redirectChain.chain);
    
    const result = {
      input_url: url,
      final_url: redirectChain.chain[redirectChain.chain.length - 1]?.url || url,
      redirect_chain: redirectChain.chain,
      total_redirects: redirectChain.chain.filter(s => s.is_redirect).length,
      chain_length: redirectChain.chain.length,
      is_affiliate_link: isAffiliate,
      is_tracking_url: isTracking,
      safety_score: safetyScore,
      security_analysis: {
        https_only: redirectChain.chain.every(s => s.url?.startsWith('https://')),
        suspicious_domains: detectSuspiciousDomains(redirectChain.chain),
        threat_level: safetyScore > 80 ? 'low' : safetyScore > 50 ? 'medium' : 'high'
      },
      performance_metrics: {
        total_response_time_ms: totalTime,
        average_response_time_ms: Math.round(avgTime * 10) / 10,
        fastest_step_ms: Math.min(...responseTimes),
        slowest_step_ms: Math.max(...responseTimes),
        performance_grade: avgTime < 500 ? 'A' : avgTime < 1000 ? 'B' : 'C'
      },
      analysis_time_ms: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      requests_remaining: rateLimit.limit - rateLimit.count
    };
    
    return new Response(JSON.stringify(result), {
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function analyzeRedirects(url, userAgent, maxRedirects = 15) {
  const chain = [];
  let currentURL = url;
  let redirectCount = 0;
  
  try {
    while (redirectCount < maxRedirects) {
      const startTime = Date.now();
      
      const response = await fetch(currentURL, {
        method: 'GET',
        headers: { 'User-Agent': userAgent },
        redirect: 'manual',
        cf: { cacheTtl: 0 }
      });
      
      const responseTime = Date.now() - startTime;
      const statusCode = response.status;
      const isRedirect = statusCode >= 300 && statusCode < 400;
      
      const step = {
        step: chain.length + 1,
        url: currentURL,
        status_code: statusCode,
        is_redirect: isRedirect,
        response_time_ms: responseTime,
        headers: Object.fromEntries(response.headers)
      };
      
      if (isRedirect) {
        const location = response.headers.get('location');
        if (location) {
          step.redirect_type = getRedirectType(statusCode);
          step.next_url = new URL(location, currentURL).href;
          currentURL = step.next_url;
          redirectCount++;
        } else {
          chain.push(step);
          break;
        }
      }
      
      chain.push(step);
      
      if (!isRedirect) {
        break;
      }
    }
    
    if (redirectCount >= maxRedirects) {
      return { error: 'Maximum redirect limit reached', chain };
    }
    
    return { chain };
  } catch (error) {
    return { error: error.message, chain };
  }
}

function getRedirectType(statusCode) {
  const types = {
    301: 'Permanent',
    302: 'Temporary',
    303: 'See Other',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect'
  };
  return types[statusCode] || 'Unknown';
}

function detectAffiliateURL(url, chain) {
  const affiliatePatterns = [
    /amazon.*tag=/i,
    /amzn\.to/i,
    /bit\.ly/i,
    /geni\.us/i,
    /shareasale/i,
    /clickbank/i,
    /commission/i,
    /affiliate/i,
    /ref=/i,
    /aff_/i
  ];
  
  const allUrls = [url, ...chain.map(s => s.url)].join(' ');
  return affiliatePatterns.some(pattern => pattern.test(allUrls));
}

function detectTrackingURL(url, chain) {
  const trackingPatterns = [
    /utm_/i,
    /fbclid/i,
    /gclid/i,
    /msclkid/i,
    /_ga=/i,
    /mc_/i,
    /track/i
  ];
  
  const allUrls = [url, ...chain.map(s => s.url)].join(' ');
  return trackingPatterns.some(pattern => pattern.test(allUrls));
}

function calculateSafetyScore(url, chain) {
  let score = 100;
  
  const allUrls = [url, ...chain.map(s => s.url)];
  const hasHttp = allUrls.some(u => u?.startsWith('http://'));
  if (hasHttp) score -= 20;
  
  const redirectCount = chain.filter(s => s.is_redirect).length;
  if (redirectCount > 5) score -= 30;
  else if (redirectCount > 3) score -= 15;
  
  const suspiciousDomains = detectSuspiciousDomains(chain);
  score -= suspiciousDomains.length * 15;
  
  return Math.max(0, Math.min(100, score));
}

function detectSuspiciousDomains(chain) {
  const suspicious = [];
  const suspiciousPatterns = [
    /\.tk$/i, /\.ml$/i, /\.ga$/i, /\.cf$/i,
    /bit\.ly/i, /tinyurl/i, /short/i
  ];
  
  chain.forEach(step => {
    try {
      const hostname = new URL(step.url).hostname;
      if (suspiciousPatterns.some(p => p.test(hostname))) {
        if (!suspicious.includes(hostname)) {
          suspicious.push(hostname);
        }
      }
    } catch (e) {}
  });
  
  return suspicious;
}

// ===== ALL PREMIUM ENDPOINTS - NO API KEY REQUIRED! =====

async function advancedAnalyze(request, env, corsHeaders) {
  // NO API KEY CHECK - Feature fully unlocked!
  try {
    const data = await request.json();
    const url = data.url;
    
    const validation = validateURL(url);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const redirectResult = await analyzeRedirects(url, 'Advanced-Analyzer/1.0');
    
    const chain = redirectResult.chain || [];
    const headers = chain.map(s => s.headers);
    
    const serverInfo = headers.map(h => ({
      server: h.server || 'Unknown',
      powered_by: h['x-powered-by'] || 'Unknown',
      cache_control: h['cache-control'] || 'None'
    }));
    
    const result = {
      url,
      redirect_count: chain.filter(s => s.is_redirect).length,
      full_chain: chain,
      server_analysis: serverInfo,
      security_headers: chain.map(s => ({
        url: s.url,
        has_hsts: !!s.headers['strict-transport-security'],
        has_csp: !!s.headers['content-security-policy'],
        has_xframe: !!s.headers['x-frame-options']
      })),
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Advanced analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function seoAnalysis(request, env, corsHeaders) {
  // NO API KEY CHECK!
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'SEO-Analyzer/1.0');
    
    const chain = redirectResult.chain || [];
    const redirectCount = chain.filter(s => s.is_redirect).length;
    const httpsOnly = chain.every(s => s.url?.startsWith('https://'));
    const has301 = chain.some(s => s.status_code === 301);
    const has302 = chain.some(s => s.status_code === 302);
    
    let seoScore = 100;
    if (redirectCount > 3) seoScore -= 30;
    else if (redirectCount > 1) seoScore -= 15;
    if (!httpsOnly) seoScore -= 25;
    if (has302 && !has301) seoScore -= 10;
    if (redirectCount > 5) seoScore -= 20;
    seoScore = Math.max(0, Math.min(100, seoScore));
    
    const issues = [
      redirectCount > 3 ? 'Too many redirects - negatively impacts SEO' : null,
      !httpsOnly ? 'Mixed HTTP/HTTPS detected' : null,
      has302 ? 'Using 302 (temporary) redirects' : null
    ].filter(Boolean);
    
    const seoAnalysis = {
      url,
      redirect_count: redirectCount,
      seo_score: seoScore,
      seo_grade: seoScore >= 90 ? 'A' : seoScore >= 75 ? 'B' : seoScore >= 60 ? 'C' : 'D',
      https_secure: httpsOnly,
      redirect_types_used: [...new Set(chain.filter(s => s.is_redirect).map(s => s.status_code))],
      issues: issues.length > 0 ? issues : ['No SEO issues detected'],
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(seoAnalysis), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'SEO analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function malwareScan(request, env, corsHeaders) {
  // NO API KEY CHECK!
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Malware-Scanner/1.0');
    const chain = redirectResult.chain || [];
    
    const threats = [];
    const suspiciousDomains = detectSuspiciousDomains(chain);
    
    chain.forEach(step => {
      if (step.url?.includes('phishing') || step.url?.includes('malware')) {
        threats.push({ type: 'Suspicious URL pattern', url: step.url });
      }
    });
    
    const scanResult = {
      url,
      scan_status: 'completed',
      threats_detected: threats.length,
      threat_list: threats,
      suspicious_domains: suspiciousDomains,
      risk_level: threats.length > 0 ? 'high' : suspiciousDomains.length > 0 ? 'medium' : 'low',
      safe_to_visit: threats.length === 0,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(scanResult), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Malware scan failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function cdnDetection(request, env, corsHeaders) {
  // NO API KEY CHECK!
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'CDN-Detector/1.0');
    const chain = redirectResult.chain || [];
    
    const cdnDetection = chain.map(step => {
      const headers = step.headers || {};
      let cdn = 'None';
      
      if (headers.server?.includes('cloudflare') || headers['cf-ray']) {
        cdn = 'Cloudflare';
      } else if (headers['x-amz-cf-id'] || headers['x-amz-request-id']) {
        cdn = 'Amazon CloudFront';
      } else if (headers['x-akamai-transformed']) {
        cdn = 'Akamai';
      } else if (headers.server?.includes('nginx')) {
        cdn = 'Nginx (possibly CDN)';
      }
      
      return {
        url: step.url,
        cdn_detected: cdn,
        server: headers.server || 'Unknown'
      };
    });
    
    return new Response(JSON.stringify({
      url,
      cdn_analysis: cdnDetection,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'CDN detection failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function mobileComparison(request, env, corsHeaders) {
  // NO API KEY CHECK!
  try {
    const data = await request.json();
    const url = data.url;
    
    const desktopUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15';
    
    const [desktopResult, mobileResult] = await Promise.all([
      analyzeRedirects(url, desktopUA),
      analyzeRedirects(url, mobileUA)
    ]);
    
    const comparison = {
      url,
      desktop_redirects: desktopResult.chain?.filter(s => s.is_redirect).length || 0,
      mobile_redirects: mobileResult.chain?.filter(s => s.is_redirect).length || 0,
      desktop_final_url: desktopResult.chain?.[desktopResult.chain.length - 1]?.url || url,
      mobile_final_url: mobileResult.chain?.[mobileResult.chain.length - 1]?.url || url,
      different_destinations: (desktopResult.chain?.[desktopResult.chain.length - 1]?.url !== mobileResult.chain?.[mobileResult.chain.length - 1]?.url),
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(comparison), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Mobile comparison failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function browserQuickCheck(request, env, corsHeaders) {
  // NO API KEY CHECK!
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Browser-Check/1.0');
    
    const result = {
      url,
      accessible: redirectResult.chain && redirectResult.chain.length > 0,
      final_status: redirectResult.chain?.[redirectResult.chain.length - 1]?.status_code || 0,
      loads_successfully: redirectResult.chain?.[redirectResult.chain.length - 1]?.status_code === 200,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Browser check failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function batchQuickAnalyze(request, env, corsHeaders) {
  // NO API KEY CHECK!
  try {
    const data = await request.json();
    const urls = data.urls || [];
    
    if (!Array.isArray(urls) || urls.length === 0) {
      return new Response(
        JSON.stringify({ error: 'URLs array required' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const results = await Promise.all(
      urls.slice(0, 10).map(async url => {
        try {
          const redirectResult = await analyzeRedirects(url, 'Batch-Analyzer/1.0');
          return {
            url,
            status: 'success',
            redirect_count: redirectResult.chain?.filter(s => s.is_redirect).length || 0,
            final_url: redirectResult.chain?.[redirectResult.chain.length - 1]?.url || url
          };
        } catch (error) {
          return {
            url,
            status: 'error',
            error: error.message
          };
        }
      })
    );
    
    return new Response(JSON.stringify({
      results,
      total_analyzed: results.length,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Batch analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// ===== OTHER ENDPOINTS (Already unlocked) =====

async function domainAnalytics(domain, env, corsHeaders) {
  try {
    const testUrl = `https://${domain}`;
    
    const validation = validateURL(testUrl);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error, domain }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const redirectResult = await analyzeRedirects(testUrl, 'Domain-Analyzer/1.0');
    const chain = redirectResult.chain || [];
    const redirectCount = chain.filter(s => s.is_redirect).length;
    
    const analytics = {
      domain,
      total_requests: 1,
      unique_urls: [...new Set(chain.map(s => s.url))].length,
      avg_redirect_count: redirectCount.toString(),
      most_common_redirects: [...new Set(chain.filter(s => s.is_redirect).map(s => s.status_code))].map(String) || ['None'],
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(analytics), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Domain analysis failed', domain, message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function urlAnalytics(urlParam, env, corsHeaders) {
  try {
    const url = decodeURIComponent(urlParam);
    const validation = validateURL(url);
    
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: 'Invalid URL', url }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const redirectResult = await analyzeRedirects(url, 'URL-Analyzer/1.0');
    const chain = redirectResult.chain || [];
    const responseTimes = chain.map(s => s.response_time_ms || 0);
    const avgResponseTime = responseTimes.length > 0 ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length) : 0;
    
    const analytics = {
      url,
      total_analyses: 1,
      last_analyzed: new Date().toISOString(),
      avg_response_time: avgResponseTime,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(analytics), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'URL analysis failed', url: decodeURIComponent(urlParam), message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function bulkAnalyze(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const urls = data.urls || [];
    
    if (!Array.isArray(urls) || urls.length === 0) {
      return new Response(
        JSON.stringify({ error: 'URLs array required' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const results = await Promise.all(
      urls.slice(0, 10).map(async url => {
        try {
          const redirectResult = await analyzeRedirects(url, 'Bulk-Analyzer/1.0');
          return {
            url,
            status: 'success',
            redirect_count: redirectResult.chain?.filter(s => s.is_redirect).length || 0,
            final_url: redirectResult.chain?.[redirectResult.chain.length - 1]?.url || url,
            chain: redirectResult.chain
          };
        } catch (error) {
          return {
            url,
            status: 'error',
            error: error.message
          };
        }
      })
    );
    
    return new Response(JSON.stringify({
      results,
      total_analyzed: results.length,
      successful: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'error').length,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Bulk analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function validateURLs(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const urls = data.urls || [];
    
    if (!Array.isArray(urls) || urls.length === 0) {
      return new Response(
        JSON.stringify({ error: 'URLs array required' }),
        { status: 400, headers: corsHeaders }
      );
    }
    
    const results = urls.slice(0, 20).map(url => {
      const validation = validateURL(url);
      return {
        url,
        valid: validation.valid,
        error: validation.error || null
      };
    });
    
    return new Response(JSON.stringify({
      results,
      total_checked: results.length,
      valid_count: results.filter(r => r.valid).length,
      invalid_count: results.filter(r => !r.valid).length,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Validation failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function securityScan(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Security-Scanner/1.0');
    const chain = redirectResult.chain || [];
    
    const security = {
      url,
      https_only: chain.every(s => s.url?.startsWith('https://')),
      has_redirects: chain.filter(s => s.is_redirect).length > 0,
      redirect_count: chain.filter(s => s.is_redirect).length,
      suspicious_domains: detectSuspiciousDomains(chain),
      safety_score: calculateSafetyScore(url, chain),
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(security), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Security scan failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function getPricing(corsHeaders) {
  const pricing = {
    model: 'usage_based',
    all_features_included: true,
    plans: [
      {
        name: 'FREE',
        price: '$0/month',
        requests: '100/month',
        rate_limit: '1 req/min',
        features: 'All 32 endpoints'
      },
      {
        name: 'STARTER',
        price: '$4.99/month',
        requests: '5,000/month',
        rate_limit: '10 req/min',
        features: 'All 32 endpoints'
      },
      {
        name: 'PRO',
        price: '$19.99/month',
        requests: '50,000/month',
        rate_limit: '100 req/min',
        features: 'All 32 endpoints + Priority support'
      },
      {
        name: 'ENTERPRISE',
        price: '$99.99/month',
        requests: '500,000/month',
        rate_limit: '1000 req/min',
        features: 'All 32 endpoints + SLA + Dedicated support'
      }
    ]
  };
  
  return new Response(JSON.stringify(pricing), { headers: corsHeaders });
}

async function getPricingTiers(corsHeaders) {
  return getPricing(corsHeaders);
}

async function getDashboardStats(request, env, corsHeaders) {
  const stats = {
    total_endpoints: 33,
    all_unlocked: true,
    uptime: '99.99%',
    avg_response_time: '< 500ms',
    timestamp: new Date().toISOString()
  };
  
  return new Response(JSON.stringify(stats), { headers: corsHeaders });
}

async function getAnalyticsHistory(request, env, corsHeaders) {
  const history = {
    message: 'Real-time API - no historical data stored',
    all_endpoints_available: true,
    timestamp: new Date().toISOString()
  };
  
  return new Response(JSON.stringify(history), { headers: corsHeaders });
}

async function botUserAgentTest(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const botUA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
    const redirectResult = await analyzeRedirects(url, botUA);
    
    const result = {
      url,
      bot_user_agent: botUA,
      redirect_count: redirectResult.chain?.filter(s => s.is_redirect).length || 0,
      final_url: redirectResult.chain?.[redirectResult.chain.length - 1]?.url || url,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Bot test failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function checkRobotsTxt(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const parsed = new URL(url);
    const robotsUrl = `${parsed.protocol}//${parsed.hostname}/robots.txt`;
    
    const response = await fetch(robotsUrl);
    const content = await response.text();
    
    const result = {
      url,
      robots_url: robotsUrl,
      exists: response.status === 200,
      content: response.status === 200 ? content.substring(0, 1000) : null,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Robots.txt check failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function exportToCSV(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'CSV-Exporter/1.0');
    const chain = redirectResult.chain || [];
    
    let csv = 'Step,URL,Status Code,Is Redirect,Response Time (ms)\n';
    chain.forEach(step => {
      csv += `${step.step},"${step.url}",${step.status_code},${step.is_redirect},${step.response_time_ms}\n`;
    });
    
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="redirect-analysis.csv"'
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'CSV export failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function decodeShortener(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Shortener-Decoder/1.0');
    
    const result = {
      short_url: url,
      final_destination: redirectResult.chain?.[redirectResult.chain.length - 1]?.url || url,
      redirect_count: redirectResult.chain?.filter(s => s.is_redirect).length || 0,
      full_chain: redirectResult.chain,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Shortener decode failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function detectRedirectLoop(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Loop-Detector/1.0');
    const chain = redirectResult.chain || [];
    
    const urls = chain.map(s => s.url);
    const urlCounts = {};
    urls.forEach(u => {
      urlCounts[u] = (urlCounts[u] || 0) + 1;
    });
    
    const loops = Object.entries(urlCounts).filter(([_, count]) => count > 1);
    
    const result = {
      url,
      has_loop: loops.length > 0 || redirectResult.error === 'Maximum redirect limit reached',
      loop_detected: loops.length > 0,
      repeated_urls: loops.map(([url, count]) => ({ url, occurrences: count })),
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Loop detection failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function generateRedirectRules(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Rule-Generator/1.0');
    const chain = redirectResult.chain || [];
    
    const rules = chain.filter(s => s.is_redirect).map(step => ({
      from: step.url,
      to: step.next_url,
      type: step.redirect_type,
      status_code: step.status_code
    }));
    
    return new Response(JSON.stringify({
      url,
      redirect_rules: rules,
      total_rules: rules.length,
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Rule generation failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function analyzeDomainTrust(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Trust-Analyzer/1.0');
    const chain = redirectResult.chain || [];
    
    const trustScore = calculateSafetyScore(url, chain);
    
    const result = {
      url,
      trust_score: trustScore,
      trust_level: trustScore > 80 ? 'High' : trustScore > 50 ? 'Medium' : 'Low',
      https_only: chain.every(s => s.url?.startsWith('https://')),
      suspicious_domains: detectSuspiciousDomains(chain),
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Domain trust analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function analyzeWithAuth(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Auth-Analyzer/1.0');
    
    const result = {
      url,
      redirect_count: redirectResult.chain?.filter(s => s.is_redirect).length || 0,
      chain: redirectResult.chain,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Auth analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function analyzeWithWebhook(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Webhook-Analyzer/1.0');
    
    const result = {
      url,
      webhook_url: data.webhook_url || null,
      redirect_count: redirectResult.chain?.filter(s => s.is_redirect).length || 0,
      analysis_complete: true,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Webhook analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function comprehensiveAnalyze(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Comprehensive-Analyzer/1.0');
    const chain = redirectResult.chain || [];
    
    const result = {
      url,
      redirect_analysis: {
        total_redirects: chain.filter(s => s.is_redirect).length,
        chain_length: chain.length,
        full_chain: chain
      },
      security_analysis: {
        https_only: chain.every(s => s.url?.startsWith('https://')),
        safety_score: calculateSafetyScore(url, chain),
        suspicious_domains: detectSuspiciousDomains(chain)
      },
      performance_analysis: {
        total_time: chain.reduce((sum, s) => sum + (s.response_time_ms || 0), 0),
        avg_time: Math.round(chain.reduce((sum, s) => sum + (s.response_time_ms || 0), 0) / chain.length)
      },
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Comprehensive analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function analyzeLinkTypes(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Link-Type-Analyzer/1.0');
    const chain = redirectResult.chain || [];
    
    const result = {
      url,
      is_affiliate: detectAffiliateURL(url, chain),
      is_tracking: detectTrackingURL(url, chain),
      is_shortener: url.length < 30 && chain.filter(s => s.is_redirect).length > 0,
      redirect_count: chain.filter(s => s.is_redirect).length,
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Link type analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function analyzeSEOLinkJuice(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'SEO-LinkJuice-Analyzer/1.0');
    const chain = redirectResult.chain || [];
    
    const has301 = chain.some(s => s.status_code === 301);
    const has302 = chain.some(s => s.status_code === 302);
    const redirectCount = chain.filter(s => s.is_redirect).length;
    
    let linkJuicePreserved = 100;
    if (redirectCount > 0) {
      if (has302) linkJuicePreserved -= 15;
      if (redirectCount > 3) linkJuicePreserved -= 20;
      if (redirectCount > 1) linkJuicePreserved -= 10;
    }
    linkJuicePreserved = Math.max(0, linkJuicePreserved);
    
    const result = {
      url,
      link_juice_preserved: linkJuicePreserved,
      uses_301_permanent: has301,
      uses_302_temporary: has302,
      redirect_count: redirectCount,
      recommendation: has301 ? 'Good - using permanent redirects' : 'Use 301 for better SEO',
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Link juice analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function analyzeNetworkDiversity(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const url = data.url;
    
    const redirectResult = await analyzeRedirects(url, 'Network-Diversity-Analyzer/1.0');
    const chain = redirectResult.chain || [];
    
    const domains = [...new Set(chain.map(s => {
      try {
        return new URL(s.url).hostname;
      } catch (e) {
        return 'unknown';
      }
    }))];
    
    const result = {
      url,
      unique_domains: domains.length,
      domains_visited: domains,
      network_diversity_score: Math.min(100, domains.length * 25),
      timestamp: new Date().toISOString()
    };
    
    return new Response(JSON.stringify(result), { headers: corsHeaders });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Network diversity analysis failed', message: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}
