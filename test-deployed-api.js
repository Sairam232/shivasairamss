const API_BASE = 'https://shivasairams.swami8uds.workers.dev';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

let passCount = 0;
let failCount = 0;
let totalTests = 0;

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

async function testEndpoint(name, method, path, body = null, expectedStatus = 200, tier = 'FREE') {
  totalTests++;
  const url = `${API_BASE}${path}`;
  const tierColor = tier === 'FREE' ? colors.green : colors.yellow;
  
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.text();
    
    let parsedData;
    try {
      parsedData = JSON.parse(data);
    } catch {
      parsedData = data;
    }
    
    if (response.status === expectedStatus || response.status === 200 || response.status === 201) {
      passCount++;
      log(`✓ [${tier}] ${name}`, colors.green);
      log(`  Status: ${response.status}`, colors.cyan);
      if (typeof parsedData === 'object' && parsedData !== null) {
        log(`  Response: ${JSON.stringify(parsedData).substring(0, 100)}...`, colors.cyan);
      }
      return { success: true, status: response.status, data: parsedData };
    } else {
      failCount++;
      log(`✗ [${tier}] ${name}`, colors.red);
      log(`  Expected: ${expectedStatus}, Got: ${response.status}`, colors.red);
      log(`  Response: ${JSON.stringify(parsedData).substring(0, 200)}`, colors.red);
      return { success: false, status: response.status, data: parsedData };
    }
  } catch (error) {
    failCount++;
    log(`✗ [${tier}] ${name}`, colors.red);
    log(`  Error: ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('\n========================================', colors.blue);
  log('  CLOUDFLARE WORKERS API TEST SUITE', colors.blue);
  log('  Testing: ' + API_BASE, colors.blue);
  log('========================================\n', colors.blue);

  // ===== FREE TIER ENDPOINTS =====
  log('\n--- FREE TIER ENDPOINTS (8 endpoints) ---\n', colors.green);
  
  await testEndpoint(
    '1. GET / - API Documentation',
    'GET',
    '/',
    null,
    200,
    'FREE'
  );
  
  await testEndpoint(
    '2. GET /health - Health Check',
    'GET',
    '/health',
    null,
    200,
    'FREE'
  );
  
  await testEndpoint(
    '3. POST /analyze - Analyze URL',
    'POST',
    '/analyze',
    { url: 'https://bit.ly/3QJZvN8' },
    200,
    'FREE'
  );
  
  await testEndpoint(
    '4. POST /api/analyze - Analyze URL (API version)',
    'POST',
    '/api/analyze',
    { url: 'https://google.com' },
    200,
    'FREE'
  );
  
  await testEndpoint(
    '5. POST /api/bulk/analyze - Bulk Analysis',
    'POST',
    '/api/bulk/analyze',
    { urls: ['https://google.com', 'https://github.com'] },
    200,
    'FREE'
  );
  
  await testEndpoint(
    '6. POST /api/validate - URL Validation',
    'POST',
    '/api/validate',
    { url: 'https://example.com' },
    200,
    'FREE'
  );
  
  await testEndpoint(
    '7. GET /api/pricing - Pricing Info',
    'GET',
    '/api/pricing',
    null,
    200,
    'FREE'
  );
  
  await testEndpoint(
    '8. GET /api/pricing/tiers - Pricing Tiers',
    'GET',
    '/api/pricing/tiers',
    null,
    200,
    'FREE'
  );

  // ===== PREMIUM TIER ENDPOINTS =====
  log('\n--- PREMIUM TIER ENDPOINTS (26 endpoints) ---\n', colors.yellow);
  
  await testEndpoint(
    '9. POST /api/analyze/advanced - Advanced Analysis',
    'POST',
    '/api/analyze/advanced',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '10. GET /api/analytics/domain/:domain - Domain Analytics',
    'GET',
    '/api/analytics/domain/google.com',
    null,
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '11. GET /api/analytics/url/:url - URL Analytics',
    'GET',
    '/api/analytics/url/https://google.com',
    null,
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '12. POST /api/seo/analysis - SEO Analysis',
    'POST',
    '/api/seo/analysis',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '13. POST /api/browser/quick-check - Browser Quick Check',
    'POST',
    '/api/browser/quick-check',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '14. POST /api/batch/quick-analyze - Batch Quick Analyze',
    'POST',
    '/api/batch/quick-analyze',
    { urls: ['https://google.com', 'https://github.com'] },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '15. POST /api/analyze/malware-scan - Malware Scan',
    'POST',
    '/api/analyze/malware-scan',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '16. POST /api/analyze/cdn-detection - CDN Detection',
    'POST',
    '/api/analyze/cdn-detection',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '17. POST /api/analyze/mobile-comparison - Mobile Comparison',
    'POST',
    '/api/analyze/mobile-comparison',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '18. POST /api/security/enhanced-scan - Enhanced Security Scan',
    'POST',
    '/api/security/enhanced-scan',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '19. GET /api/dashboard/stats - Dashboard Stats',
    'GET',
    '/api/dashboard/stats',
    null,
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '20. GET /api/analytics/history - Analytics History',
    'GET',
    '/api/analytics/history',
    null,
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '21. POST /api/analyze/bot-test - Bot User Agent Test',
    'POST',
    '/api/analyze/bot-test',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '22. POST /api/robots-txt/check - Robots.txt Check',
    'POST',
    '/api/robots-txt/check',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '23. POST /api/export/csv - Export to CSV',
    'POST',
    '/api/export/csv',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '24. POST /api/decode-shortener - Decode URL Shortener',
    'POST',
    '/api/decode-shortener',
    { url: 'https://bit.ly/3QJZvN8' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '25. POST /api/detect-redirect-loop - Detect Redirect Loop',
    'POST',
    '/api/detect-redirect-loop',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '26. POST /api/generate-redirect-rules - Generate Redirect Rules',
    'POST',
    '/api/generate-redirect-rules',
    { source: 'https://old.com', destination: 'https://new.com', type: '301' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '27. POST /api/analyze/domain-trust - Domain Trust Score',
    'POST',
    '/api/analyze/domain-trust',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '28. POST /api/analyze/with-auth - Analyze with Auth',
    'POST',
    '/api/analyze/with-auth',
    { url: 'https://google.com', auth: { username: 'test', password: 'test' } },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '29. POST /api/analyze/with-webhook - Analyze with Webhook',
    'POST',
    '/api/analyze/with-webhook',
    { url: 'https://google.com', webhook_url: 'https://example.com/webhook' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '30. POST /api/analyze/comprehensive - Comprehensive Analysis',
    'POST',
    '/api/analyze/comprehensive',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '31. POST /api/analyze/link-types - Link Type Analysis',
    'POST',
    '/api/analyze/link-types',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '32. POST /api/analyze/seo-link-juice - SEO Link Juice Analysis',
    'POST',
    '/api/analyze/seo-link-juice',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  await testEndpoint(
    '33. POST /api/analyze/network-diversity - Network Diversity Analysis',
    'POST',
    '/api/analyze/network-diversity',
    { url: 'https://google.com' },
    200,
    'PREMIUM'
  );
  
  // Test 404 endpoint
  await testEndpoint(
    '34. 404 Test - Invalid Endpoint',
    'GET',
    '/invalid-endpoint',
    null,
    404,
    'TEST'
  );

  // ===== SUMMARY =====
  log('\n========================================', colors.blue);
  log('           TEST SUMMARY', colors.blue);
  log('========================================', colors.blue);
  log(`Total Tests: ${totalTests}`, colors.cyan);
  log(`Passed: ${passCount}`, colors.green);
  log(`Failed: ${failCount}`, failCount > 0 ? colors.red : colors.green);
  log(`Success Rate: ${((passCount / totalTests) * 100).toFixed(1)}%`, colors.cyan);
  log('========================================\n', colors.blue);
  
  if (failCount === 0) {
    log('🎉 ALL TESTS PASSED! Your API is working perfectly!', colors.green);
  } else {
    log(`⚠️  ${failCount} test(s) failed. Review the errors above.`, colors.yellow);
  }
}

runTests().catch(console.error);
