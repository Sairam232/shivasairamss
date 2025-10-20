#!/bin/bash

echo "🚀 Deploying Updated Worker to Cloudflare"
echo "=========================================="
echo ""

# Check if logged in
echo "1️⃣ Checking Cloudflare login..."
wrangler whoami

if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Cloudflare"
    echo "Please run: wrangler login"
    exit 1
fi

echo ""
echo "2️⃣ Deploying worker.js..."
wrangler deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DEPLOYMENT SUCCESSFUL!"
    echo ""
    echo "🔗 Your API is live at:"
    echo "   https://shivasairams.swami8uds.workers.dev/"
    echo ""
    echo "3️⃣ Testing deployment..."
    sleep 2
    
    echo ""
    echo "Testing /health endpoint..."
    curl -s https://shivasairams.swami8uds.workers.dev/health | jq '.'
    
    echo ""
    echo "Testing premium endpoint with sample key..."
    curl -s -X POST https://shivasairams.swami8uds.workers.dev/api/analyze/advanced \
      -H "X-API-Key: test_key_12345" \
      -H "Content-Type: application/json" \
      -d '{"url": "https://google.com"}' | jq '.input_url, .total_redirects, .final_url'
    
    echo ""
    echo "✅ READY FOR RAPIDAPI!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://rapidapi.com/developer/dashboard"
    echo "2. Click 'Add New API'"
    echo "3. Follow the guide in RAPIDAPI_SETUP_GUIDE.md"
else
    echo ""
    echo "❌ Deployment failed!"
    echo "Please check errors above"
fi
