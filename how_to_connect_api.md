# How to Connect to Your API

## Your API URL
```
https://shivasairams.swami8uds.workers.dev
```

---

## Method 1: Using Python (requests library)

### Install requests first:
```bash
pip install requests
```

### Example 1: Analyze a single URL
```python
import requests

# Analyze a URL
response = requests.post(
    "https://shivasairams.swami8uds.workers.dev/api/analyze",
    json={"url": "http://github.com"}
)

result = response.json()
print(f"Final URL: {result['final_url']}")
print(f"Redirects: {len(result['redirect_chain'])}")
```

### Example 2: Bulk analysis
```python
import requests

response = requests.post(
    "https://shivasairams.swami8uds.workers.dev/api/bulk/analyze",
    json={"urls": ["http://google.com", "http://github.com"]}
)

result = response.json()
for item in result['results']:
    print(f"{item['url']} -> {item['final_url']}")
```

---

## Method 2: Using cURL (Terminal/Command Line)

### Analyze a single URL:
```bash
curl -X POST https://shivasairams.swami8uds.workers.dev/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "http://github.com"}'
```

### Bulk analysis:
```bash
curl -X POST https://shivasairams.swami8uds.workers.dev/api/bulk/analyze \
  -H "Content-Type: application/json" \
  -d '{"urls": ["http://google.com", "http://github.com"]}'
```

### Check domain trust:
```bash
curl -X POST https://shivasairams.swami8uds.workers.dev/api/analyze/domain-trust \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'
```

---

## Method 3: Using JavaScript (fetch)

```javascript
// Analyze a URL
fetch('https://shivasairams.swami8uds.workers.dev/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'http://github.com'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Final URL:', data.final_url);
  console.log('Redirects:', data.redirect_chain.length);
});
```

---

## Available FREE Endpoints

1. **Analyze URL** - `POST /api/analyze`
2. **Bulk Analyze** - `POST /api/bulk/analyze`
3. **Validate URL** - `POST /api/validate`
4. **Pricing Info** - `GET /api/pricing`
5. **Health Check** - `GET /health`

---

## Response Format

All endpoints return JSON:

```json
{
  "input_url": "http://github.com",
  "final_url": "https://github.com/",
  "redirect_chain": [
    {
      "step": 1,
      "url": "http://github.com",
      "status_code": 301
    },
    {
      "step": 2,
      "url": "https://github.com/",
      "status_code": 200
    }
  ],
  "safety_score": 80
}
```
