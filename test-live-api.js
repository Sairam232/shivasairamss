/**
 * Comprehensive Test Script for Cloudflare Workers API
 * Tests all 34 endpoints at https://shivasairams.swami8uds.workers.dev/
 */

const BASE_URL = 'https://shivasairams.swami8uds.workers.dev';

const tests = [
  // Basic endpoints
  { name: 'Health Check', method: 'GET', path: '/health' },
  { name: 'Home Page', method: 'GET', path: '/' },
  
  // Free tier endpoints (POST)
  { name: 'Basic Analyze', method: 'POST', path: '/analyze', body: { url: 'https://bit.ly/3example' } },
  { name: 'API Analyze', method: 'POST', path: '/api/analyze', body: { url: 'https://bit.ly/3example' } },
  { name: 'Bulk Analyze', method: 'POST', path: '/api/bulk/analyze', body: { urls: ['https://bit.ly/3example', 'https://google.com'] } },
  { name: 'Validate URLs', method: 'POST', path: '/api/validate', body: { urls: ['https://google.com', 'https://github.com'] } },
  { name: 'Security Scan', method: 'POST', path: '/api/security/enhanced-scan', body: { url: 'https://google.com' } },
  
  // Premium endpoints (require API key)
  { name: 'Advanced Analyze', method: 'POST', path: '/api/analyze/advanced', body: { url: 'https://bit.ly/3example' } },
  { name: 'Domain Analytics', method: 'GET', path: '/api/analytics/domain/google.com' },
  { name: 'URL Analytics', method: 'GET', path: '/api/analytics/url/https://google.com' },
  { name: 'SEO Analysis', method: 'POST', path: '/api/seo/analysis', body: { url: 'https://google.com' } },
  { name: 'Browser Quick Check', method: 'POST', path: '/api/browser/quick-check', body: { url: 'https://google.com' } },
  { name: 'Batch Quick Analyze', method: 'POST', path: '/api/batch/quick-analyze', body: { urls: ['https://google.com'] } },
  { name: 'Malware Scan', method: 'POST', path: '/api/analyze/malware-scan', body: { url: 'https://google.com' } },
  { name: 'CDN Detection', method: 'POST', path: '/api/analyze/cdn-detection', body: { url: 'https://google.com' } },
  { name: 'Mobile Comparison', method: 'POST', path: '/api/analyze/mobile-comparison', body: { url: 'https://google.com' } },
  
  // Info endpoints
  { name: 'Pricing Info', method: 'GET', path: '/api/pricing' },
  { name: 'Pricing Tiers', method: 'GET', path: '/api/pricing/tiers' },
  { name: 'Dashboard Stats', method: 'GET', path: '/api/dashboard/stats' },
  { name: 'Analytics History', method: 'GET', path: '/api/analytics/history' },
  
  // Additional analysis endpoints
  { name: 'Bot User Agent Test', method: 'POST', path: '/api/analyze/bot-test', body: { url: 'https://google.com' } },
  { name: 'Robots.txt Check', method: 'POST', path: '/api/robots-txt/check', body: { url: 'https://google.com' } },
  { name: 'Export to CSV', method: 'POST', path: '/api/export/csv', body: { url: 'https://google.com' } },
  { name: 'Decode Shortener', method: 'POST', path: '/api/decode-shortener', body: { url: 'https://bit.ly/3example' } },
  { name: 'Detect Redirect Loop', method: 'POST', path: '/api/detect-redirect-loop', body: { url: 'https://google.com' } },
  { name: 'Generate Redirect Rules', method: 'POST', path: '/api/generate-redirect-rules', body: { url: 'https://google.com' } },
  { name: 'Domain Trust Analysis', method: 'POST', path: '/api/analyze/domain-trust', body: { url: 'https://google.com' } },
  { name: 'Analyze with Auth', method: 'POST', path: '/api/analyze/with-auth', body: { url: 'https://google.com' } },
  { name: 'Analyze with Webhook', method: 'POST', path: '/api/analyze/with-webhook', body: { url: 'https://google.com', webhook_url: 'https://webhook.site/test' } },
  { name: 'Comprehensive Analyze', method: 'POST', path: '/api/analyze/comprehensive', body: { url: 'https://google.com' } },
  { name: 'Link Types Analysis', method: 'POST', path: '/api/analyze/link-types', body: { url: 'https://google.com' } },
  { name: 'SEO Link Juice', method: 'POST', path: '/api/analyze/seo-link-juice', body: { url: 'https://google.com' } },
  { name: 'Network Diversity', method: 'POST', path: '/api/analyze/network-diversity', body: { url: 'https://google.com' } }
];

async function testEndpoint(test) {
  const url = `${BASE_URL}${test.path}`;
  const options = {
    method: test.method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (test.body && test.method === 'POST') {
    options.body = JSON.stringify(test.body);
  }

  try {
    const startTime = Date.now();
    const response = await fetch(url, options);
    const responseTime = Date.now() - startTime;
    
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text.substring(0, 200); // Preview of HTML/text response
    }

    return {
      name: test.name,
      path: test.path,
      method: test.method,
      status: response.status,
      statusText: response.statusText,
      responseTime: `${responseTime}ms`,
      success: response.status >= 200 && response.status < 300,
      requiresApiKey: response.status === 401 || response.status === 403,
      data: data
    };
  } catch (error) {
    return {
      name: test.name,
      path: test.path,
      method: test.method,
      status: 'ERROR',
      success: false,
      error: error.message
    };
  }
}

async function runAllTests() {
  console.log(`🧪 Testing API at: ${BASE_URL}\n`);
  console.log('='.repeat(80));
  
  const results = [];
  
  for (const test of tests) {
    const result = await testEndpoint(test);
    results.push(result);
    
    const statusIcon = result.success ? '✅' : result.requiresApiKey ? '🔑' : '❌';
    console.log(`${statusIcon} ${result.name}`);
    console.log(`   ${result.method} ${result.path}`);
    console.log(`   Status: ${result.status} (${result.responseTime || 'N/A'})`);
    
    if (result.requiresApiKey) {
      console.log(`   ⚠️  Requires API Key`);
    } else if (!result.success && result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log('');
  }
  
  console.log('='.repeat(80));
  console.log('\n📊 SUMMARY\n');
  
  const working = results.filter(r => r.success).length;
  const apiKeyRequired = results.filter(r => r.requiresApiKey).length;
  const failed = results.filter(r => !r.success && !r.requiresApiKey).length;
  
  console.log(`✅ Working endpoints: ${working}`);
  console.log(`🔑 Require API Key: ${apiKeyRequired}`);
  console.log(`❌ Failed/Error: ${failed}`);
  console.log(`📋 Total endpoints tested: ${results.length}`);
  
  console.log('\n📝 DETAILED BREAKDOWN\n');
  
  if (working > 0) {
    console.log('✅ WORKING ENDPOINTS:');
    results.filter(r => r.success).forEach(r => {
      console.log(`   • ${r.name} - ${r.method} ${r.path}`);
    });
    console.log('');
  }
  
  if (apiKeyRequired > 0) {
    console.log('🔑 PREMIUM ENDPOINTS (API Key Required):');
    results.filter(r => r.requiresApiKey).forEach(r => {
      console.log(`   • ${r.name} - ${r.method} ${r.path}`);
    });
    console.log('');
  }
  
  if (failed > 0) {
    console.log('❌ FAILED ENDPOINTS:');
    results.filter(r => !r.success && !r.requiresApiKey).forEach(r => {
      console.log(`   • ${r.name} - ${r.method} ${r.path}`);
      if (r.error) console.log(`     Error: ${r.error}`);
    });
  }
  
  return results;
}

// Run tests
runAllTests().then(() => {
  console.log('\n✨ Testing complete!');
}).catch(error => {
  console.error('Test suite error:', error);
});
