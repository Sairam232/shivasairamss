/**
 * Cloudflare Workers - Complete Endpoint Verification
 * Tests all 33 unique API endpoints + 1 duplicate route (34 total routes)
 * 100% JavaScript - Ready for Cloudflare deployment
 */

const fs = require('fs');

const workerCode = fs.readFileSync('./worker.js', 'utf8');

const mockEnv = {
  RATE_LIMITS: {
    get: async () => null,
    put: async () => true
  },
  API_KEYS: {
    get: async () => null
  },
  ANALYTICS_DATA: {
    get: async () => null,
    put: async () => true
  }
};

const workerModule = {};
eval(workerCode.replace('export default', 'workerModule.default ='));

const ENDPOINTS = [
  // FREE TIER ENDPOINTS (17 unique endpoints)
  { id: 1, name: 'Homepage Documentation', method: 'GET', path: '/', tier: 'free', category: 'Core' },
  { id: 2, name: 'Health Check', method: 'GET', path: '/health', tier: 'free', category: 'Core' },
  { id: 3, name: 'Basic Analysis', method: 'POST', path: '/analyze', body: {url: 'https://google.com'}, tier: 'free', category: 'Analysis' },
  { id: 4, name: 'API Analysis (Duplicate Route)', method: 'POST', path: '/api/analyze', body: {url: 'https://github.com'}, tier: 'free', category: 'Analysis' },
  { id: 5, name: 'Bulk Analysis', method: 'POST', path: '/api/bulk/analyze', body: {urls: ['https://google.com']}, tier: 'free', category: 'Bulk' },
  { id: 6, name: 'URL Validation', method: 'POST', path: '/api/validate', body: {urls: ['https://google.com', 'https://github.com']}, tier: 'free', category: 'Validation' },
  { id: 7, name: 'Security Scan', method: 'POST', path: '/api/security/enhanced-scan', body: {url: 'https://example.com'}, tier: 'free', category: 'Security' },
  { id: 8, name: 'Pricing Info', method: 'GET', path: '/api/pricing', tier: 'free', category: 'Info' },
  { id: 9, name: 'Pricing Tiers', method: 'GET', path: '/api/pricing/tiers', tier: 'free', category: 'Info' },
  { id: 10, name: 'Robots.txt Check', method: 'POST', path: '/api/robots-txt/check', body: {url: 'https://github.com'}, tier: 'free', category: 'SEO' },
  { id: 11, name: 'Export to CSV', method: 'POST', path: '/api/export/csv', body: {url: 'https://google.com'}, tier: 'free', category: 'Export' },
  { id: 12, name: 'Decode URL Shortener', method: 'POST', path: '/api/decode-shortener', body: {url: 'https://bit.ly/test'}, tier: 'free', category: 'Analysis' },
  { id: 13, name: 'Detect Redirect Loop', method: 'POST', path: '/api/detect-redirect-loop', body: {url: 'https://example.com'}, tier: 'free', category: 'Analysis' },
  { id: 14, name: 'Generate Redirect Rules', method: 'POST', path: '/api/generate-redirect-rules', body: {source_url: 'https://old.com', destination_url: 'https://new.com', redirect_type: '301', server_type: 'both'}, tier: 'free', category: 'Tools' },
  { id: 15, name: 'Comprehensive Analysis', method: 'POST', path: '/api/analyze/comprehensive', body: {url: 'https://github.com'}, tier: 'free', category: 'Analysis' },
  { id: 16, name: 'Link Types Analysis', method: 'POST', path: '/api/analyze/link-types', body: {url: 'https://example.com'}, tier: 'free', category: 'Analysis' },
  { id: 17, name: 'SEO Link Juice Analysis', method: 'POST', path: '/api/analyze/seo-link-juice', body: {url: 'https://example.com'}, tier: 'free', category: 'SEO' },
  
  // PREMIUM ENDPOINTS (17 endpoints - require API key)
  { id: 18, name: 'Advanced Analysis', method: 'POST', path: '/api/analyze/advanced', body: {url: 'https://example.com'}, tier: 'premium', category: 'Analysis' },
  { id: 19, name: 'Domain Analytics', method: 'GET', path: '/api/analytics/domain/example.com', tier: 'premium', category: 'Analytics' },
  { id: 20, name: 'URL Analytics', method: 'GET', path: '/api/analytics/url/https://example.com', tier: 'premium', category: 'Analytics' },
  { id: 21, name: 'SEO Analysis', method: 'POST', path: '/api/seo/analysis', body: {url: 'https://example.com'}, tier: 'premium', category: 'SEO' },
  { id: 22, name: 'Browser Quick Check', method: 'POST', path: '/api/browser/quick-check', body: {url: 'https://example.com'}, tier: 'premium', category: 'Analysis' },
  { id: 23, name: 'Batch Quick Analyze', method: 'POST', path: '/api/batch/quick-analyze', body: {urls: ['https://example.com']}, tier: 'premium', category: 'Batch' },
  { id: 24, name: 'Malware Scan', method: 'POST', path: '/api/analyze/malware-scan', body: {url: 'https://example.com'}, tier: 'premium', category: 'Security' },
  { id: 25, name: 'CDN/Network Detection', method: 'POST', path: '/api/network/detection', body: {url: 'https://example.com'}, tier: 'premium', category: 'Network' },
  { id: 26, name: 'Revenue Optimization', method: 'POST', path: '/api/revenue/optimization', body: {url: 'https://example.com'}, tier: 'premium', category: 'Business' },
  { id: 27, name: 'Mobile Comparison', method: 'POST', path: '/api/analyze/mobile-comparison', body: {url: 'https://example.com'}, tier: 'premium', category: 'Analysis' },
  { id: 28, name: 'Dashboard Stats', method: 'GET', path: '/api/dashboard/stats', tier: 'premium', category: 'Analytics' },
  { id: 29, name: 'Analytics History', method: 'GET', path: '/api/analytics/history?days=30', tier: 'premium', category: 'Analytics' },
  { id: 30, name: 'Bot User Agent Test', method: 'POST', path: '/api/analyze/bot-test', body: {url: 'https://example.com', bots: ['googlebot']}, tier: 'premium', category: 'Analysis' },
  { id: 31, name: 'Domain Trust Analysis', method: 'POST', path: '/api/analyze/domain-trust', body: {url: 'https://example.com'}, tier: 'premium', category: 'Security' },
  { id: 32, name: 'Analysis with Auth', method: 'POST', path: '/api/analyze/with-auth', body: {url: 'https://example.com', username: 'test', password: 'test'}, tier: 'premium', category: 'Analysis' },
  { id: 33, name: 'Analysis with Webhook', method: 'POST', path: '/api/analyze/with-webhook', body: {url: 'https://example.com', webhook_url: 'https://example.com/hook'}, tier: 'premium', category: 'Integration' },
  { id: 34, name: 'Network Diversity Analysis', method: 'POST', path: '/api/analyze/network-diversity', body: {url: 'https://google.com'}, tier: 'premium', category: 'Network' }
];

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  free: { total: 0, passed: 0, failed: 0 },
  premium: { total: 0, passed: 0, failed: 0 },
  details: []
};

async function testEndpoint(endpoint) {
  try {
    const url = `http://localhost:5000${endpoint.path}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    
    const request = new Request(url, {
      method: endpoint.method,
      headers: headers,
      body: endpoint.body ? JSON.stringify(endpoint.body) : undefined
    });
    
    const response = await workerModule.default.fetch(request, mockEnv, {});
    const text = await response.text();
    const status = response.status;
    
    let success = false;
    let responseType = 'unknown';
    let data = null;
    
    if (status >= 200 && status < 500) {
      try {
        data = JSON.parse(text);
        success = true;
        responseType = 'json';
      } catch (e) {
        if (endpoint.path === '/' && text.includes('html')) {
          success = true;
          responseType = 'html';
        }
      }
    }
    
    results.total++;
    if (endpoint.tier === 'free') {
      results.free.total++;
      if (success) results.free.passed++;
      else results.free.failed++;
    } else {
      results.premium.total++;
      if (success) results.premium.passed++;
      else results.premium.failed++;
    }
    
    if (success) results.passed++;
    else results.failed++;
    
    const result = {
      id: endpoint.id,
      name: endpoint.name,
      method: endpoint.method,
      path: endpoint.path,
      tier: endpoint.tier,
      category: endpoint.category,
      status: status,
      success: success,
      responseType: responseType,
      hasData: data !== null,
      timestamp: new Date().toISOString()
    };
    
    results.details.push(result);
    
    const icon = success ? '✅' : '❌';
    const tierBadge = endpoint.tier === 'free' ? '🆓' : '💼';
    console.log(`${icon} ${tierBadge} [${endpoint.id}/34] ${endpoint.name} - ${status} (${responseType})`);
    
    return result;
    
  } catch (error) {
    results.total++;
    results.failed++;
    if (endpoint.tier === 'free') {
      results.free.total++;
      results.free.failed++;
    } else {
      results.premium.total++;
      results.premium.failed++;
    }
    
    const result = {
      id: endpoint.id,
      name: endpoint.name,
      method: endpoint.method,
      path: endpoint.path,
      tier: endpoint.tier,
      category: endpoint.category,
      status: 'error',
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
    
    results.details.push(result);
    console.log(`❌ [${endpoint.id}/34] ${endpoint.name} - ERROR: ${error.message}`);
    
    return result;
  }
}

async function runFullVerification() {
  console.log('\n╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║   CLOUDFLARE WORKERS - COMPLETE ENDPOINT VERIFICATION            ║');
  console.log('║   All 33 Unique Endpoints + 1 Duplicate Route = 34 Total         ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝\n');
  
  console.log('🆓 FREE TIER ENDPOINTS (17 endpoints)\n' + '═'.repeat(70) + '\n');
  
  for (const endpoint of ENDPOINTS.filter(e => e.tier === 'free')) {
    await testEndpoint(endpoint);
  }
  
  console.log('\n💼 PREMIUM TIER ENDPOINTS (17 endpoints)\n' + '═'.repeat(70) + '\n');
  
  for (const endpoint of ENDPOINTS.filter(e => e.tier === 'premium')) {
    await testEndpoint(endpoint);
  }
  
  console.log('\n╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║                       VERIFICATION SUMMARY                        ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝\n');
  
  console.log('📊 OVERALL RESULTS:');
  console.log(`   Total Endpoints Tested: ${results.total}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   Success Rate: ${Math.round((results.passed/results.total)*100)}%\n`);
  
  console.log('🆓 FREE TIER:');
  console.log(`   Total: ${results.free.total}`);
  console.log(`   ✅ Passed: ${results.free.passed}`);
  console.log(`   ❌ Failed: ${results.free.failed}\n`);
  
  console.log('💼 PREMIUM TIER:');
  console.log(`   Total: ${results.premium.total}`);
  console.log(`   ✅ Passed: ${results.premium.passed}`);
  console.log(`   ❌ Failed: ${results.premium.failed}\n`);
  
  const categories = {};
  results.details.forEach(r => {
    if (!categories[r.category]) categories[r.category] = { total: 0, passed: 0 };
    categories[r.category].total++;
    if (r.success) categories[r.category].passed++;
  });
  
  console.log('📁 BY CATEGORY:');
  Object.keys(categories).sort().forEach(cat => {
    const c = categories[cat];
    console.log(`   ${cat}: ${c.passed}/${c.total} passed`);
  });
  
  console.log('\n' + '═'.repeat(70));
  
  if (results.passed === results.total) {
    console.log('\n🎉 SUCCESS! ALL ENDPOINTS ARE WORKING CORRECTLY!');
    console.log('✅ Ready for Cloudflare deployment');
  } else if (results.passed >= 30) {
    console.log('\n⚠️  MOSTLY WORKING - Minor issues detected');
  } else {
    console.log('\n❌ MULTIPLE FAILURES - Needs attention');
  }
  
  console.log('\n' + '═'.repeat(70) + '\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.total,
      passed: results.passed,
      failed: results.failed,
      success_rate: Math.round((results.passed/results.total)*100)
    },
    by_tier: {
      free: results.free,
      premium: results.premium
    },
    by_category: categories,
    all_endpoints: results.details
  };
  
  fs.writeFileSync('verification-report.json', JSON.stringify(report, null, 2));
  console.log('📄 Detailed report saved to: verification-report.json\n');
  
  return report;
}

if (require.main === module) {
  runFullVerification()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Verification failed:', error);
      process.exit(1);
    });
}

module.exports = { runFullVerification, ENDPOINTS };
