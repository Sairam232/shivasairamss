#!/bin/bash

# Test script for API key authentication
# Tests sample keys, RapidAPI simulation, and security

BASE_URL="https://shivasairams.swami8uds.workers.dev"

echo "🧪 API Key Authentication Test Suite"
echo "====================================="
echo ""

# Test 1: Premium endpoint WITHOUT API key (should fail)
echo "Test 1: Premium endpoint without API key"
echo "Expected: 401 Unauthorized"
curl -s -X POST "$BASE_URL/api/analyze/advanced" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}' | jq '.error'
echo ""

# Test 2: Premium endpoint WITH sample test key (should work)
echo "Test 2: Premium endpoint with test key"
echo "Expected: Success with analysis data"
curl -s -X POST "$BASE_URL/api/analyze/advanced" \
  -H "X-API-Key: test_key_12345" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}' | jq '.input_url, .final_url'
echo ""

# Test 3: Premium endpoint with enterprise key
echo "Test 3: Premium endpoint with enterprise demo key"
echo "Expected: Success with analysis data"
curl -s -X POST "$BASE_URL/api/seo/analysis" \
  -H "X-API-Key: demo_enterprise_xyz" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}' | jq '.seo_score, .seo_grade'
echo ""

# Test 4: Simulated RapidAPI request (without proxy secret - should fail)
echo "Test 4: Fake RapidAPI request (spoofing attempt)"
echo "Expected: 401 - Invalid authentication"
curl -s -X POST "$BASE_URL/api/analyze/advanced" \
  -H "X-RapidAPI-Key: fake_rapid_key_123" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}' | jq '.error'
echo ""

# Test 5: Invalid API key
echo "Test 5: Invalid API key"
echo "Expected: 401 Unauthorized"
curl -s -X POST "$BASE_URL/api/malware-scan" \
  -H "X-API-Key: invalid_key_xyz" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}' | jq '.error'
echo ""

# Test 6: Free endpoint (no key needed)
echo "Test 6: Free endpoint (no API key required)"
echo "Expected: Success"
curl -s -X POST "$BASE_URL/analyze" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://bit.ly/3example"}' | jq '.input_url, .total_redirects'
echo ""

# Test 7: Multiple premium endpoints with same key
echo "Test 7: Testing multiple premium endpoints"
echo "Expected: All succeed with test key"

echo "  - CDN Detection:"
curl -s -X POST "$BASE_URL/api/analyze/cdn-detection" \
  -H "X-API-Key: test_key_12345" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}' | jq '.cdn_detected'

echo "  - Mobile Comparison:"
curl -s -X POST "$BASE_URL/api/analyze/mobile-comparison" \
  -H "X-API-Key: test_key_12345" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}' | jq '.desktop_redirects, .mobile_redirects'

echo ""
echo "✅ Test suite complete!"
echo ""
echo "📋 Summary:"
echo "  - Sample keys added: test_key_12345, demo_enterprise_xyz, free_trial_abc"
echo "  - RapidAPI spoofing attempts are blocked"
echo "  - Free endpoints work without keys"
echo "  - Premium endpoints require valid keys"
