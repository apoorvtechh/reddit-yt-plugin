┌─────────────────────────────┐
│      Chrome Extension       │
│ (fetches post data, HTTPS)  │
└──────────────┬──────────────┘
               │ HTTPS Request (e.g. /fetch/<postId>)
               ▼
┌─────────────────────────────┐
│   DuckDNS Subdomain         │
│ insightreddit.duckdns.org   │
│ (DNS → EC2 Public IP)       │
└──────────────┬──────────────┘
               │ DNS Resolution
               ▼
┌─────────────────────────────┐
│        EC2 Instance         │
│  Public IP: 13.51.205.67    │
└──────────────┬──────────────┘
               │ Incoming HTTPS (443) or HTTP (80)
               ▼
┌─────────────────────────────┐
│           Caddy             │
│ - Auto TLS (Let's Encrypt)  │
│ - HTTP → HTTPS Redirect     │
│ - Reverse proxy to 127.0.0.1:8000
└──────────────┬──────────────┘
               │ Reverse Proxy (HTTP)
               ▼
┌─────────────────────────────┐
│       Docker Container      │
│     Flask API (port 5000)   │
│   mapped to Host 8000       │
└──────────────┬──────────────┘
               │ Internal API Call
               ▼
┌─────────────────────────────┐
│         MLflow Server       │
│     (port 5000 in venv)     │
│ Model Registry + Artifacts  │
└─────────────────────────────┘
