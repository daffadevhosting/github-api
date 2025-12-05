# GitHub API Cloudflare Worker

Worker untuk mengakses GitHub API dengan token authentication.

## Setup

**Install Wrangler:**
```bash
npm install -g wrangler
```

Login ke Cloudflare:

```bash
wrangler login
```

Set GitHub Token sebagai secret:

```bash
wrangler secret put GITHUB_TOKEN
```

Deploy:

```bash
npm run deploy
```

Endpoints

GET /

Halaman status dengan UI untuk testing

GET|POST|PUT|DELETE /api/github/*

Proxy ke GitHub API:

- /api/github/user - User profile
- /api/github/user/repos - User repositories
- /api/github/repos/:owner/:repo - Repository info
- /api/github/search/repositories - Search repos
- Semua endpoint GitHub API lainnya

GET /health

Health check endpoint

Cara Menggunakan

1. Dapatkan GitHub Token:
   - Buka GitHub Settings > Developer Settings > Personal Access Tokens
   - Generate token dengan scopes yang diperlukan
2. Set token di Cloudflare:
   - Dashboard Workers > Settings > Variables
   - Tambah secret GITHUB_TOKEN
3. Gunakan API:

```bash
# Get user info
curl https://your-worker.workers.dev/api/github/user

# Get repositories
curl https://your-worker.workers.dev/api/github/user/repos

# Search repositories
curl "https://your-worker.workers.dev/api/github/search/repositories?q=cloudflare"
```

Fitur

- ✅ Full GitHub API support
- ✅ Token authentication
- ✅ CORS enabled
- ✅ Beautiful status page
- ✅ Error handling
- ✅ Rate limit info

```

## Cara Menggunakan:

**Install dependencies:**
```bash
npm install
```

Login ke Cloudflare:

```bash
npx wrangler login
```

Set GitHub Token:

```bash
npx wrangler secret put GITHUB_TOKEN
# Masukkan token GitHub Anda
```

Deploy:

```bash
npm run deploy
```

Fitur yang Tersedia:

1. Halaman Status (/) - UI lengkap untuk testing
2. Full GitHub API Proxy - Semua endpoint GitHub API
3. CORS Support - Bisa digunakan dari frontend
4. Error Handling - Respons error yang jelas
5. Health Check - Endpoint monitoring
6. Rate Limit Info - Cek limit API

Worker ini siap digunakan dengan semua endpoint GitHub API.
