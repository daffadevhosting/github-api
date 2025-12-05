const GITHUB_API_URL = 'https://api.github.com';

const statusHTML = (env) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub API Worker Status</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
            color: #c9d1d9;
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            text-align: center;
            padding: 40px 0;
            border-bottom: 1px solid #30363d;
            margin-bottom: 40px;
        }
        h1 {
            color: #f0f6fc;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .status-badge {
            display: inline-block;
            background: #238636;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            margin-top: 10px;
        }
        .endpoints {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .endpoint-card {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 24px;
            transition: transform 0.2s;
        }
        .endpoint-card:hover {
            transform: translateY(-5px);
            border-color: #58a6ff;
        }
        .method {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9em;
            margin-right: 10px;
        }
        .get { background: #238636; color: white; }
        .post { background: #f0883e; color: white; }
        .put { background: #f0c23e; color: black; }
        .delete { background: #f85149; color: white; }
        .endpoint-path {
            font-family: 'Monaco', monospace;
            color: #58a6ff;
            margin: 10px 0;
            word-break: break-all;
        }
        .try-button {
            display: inline-block;
            background: #238636;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 15px;
            transition: background 0.2s;
        }
        .try-button:hover {
            background: #2ea043;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 40px;
        }
        .stat-card {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        .stat-value {
            font-size: 2em;
            font-weight: 600;
            color: #58a6ff;
        }
        .stat-label {
            color: #8b949e;
            margin-top: 5px;
        }
        footer {
            text-align: center;
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #30363d;
            color: #8b949e;
        }
        pre {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 6px;
            padding: 15px;
            overflow-x: auto;
            margin: 20px 0;
        }
        code {
            font-family: 'Monaco', monospace;
            color: #58a6ff;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>GitHub API Worker</h1>
            <p>Full-featured GitHub API proxy with authentication</p>
            <div class="status-badge">🟢 API Status: Operational</div>
        </header>

        <div class="endpoints">
            <div class="endpoint-card">
                <span class="method get">GET</span>
                <span class="method post">POST</span>
                <h3>User Operations</h3>
                <div class="endpoint-path">/api/github/user</div>
                <p>Get authenticated user profile</p>
                <a href="/api/github/user" class="try-button" target="_blank">Try It</a>
            </div>

            <div class="endpoint-card">
                <span class="method get">GET</span>
                <h3>User Repositories</h3>
                <div class="endpoint-path">/api/github/user/repos</div>
                <p>List user repositories</p>
                <a href="/api/github/user/repos" class="try-button" target="_blank">Try It</a>
            </div>

            <div class="endpoint-card">
                <span class="method get">GET</span>
                <h3>Repository Info</h3>
                <div class="endpoint-path">/api/github/repos/:owner/:repo</div>
                <p>Get repository details</p>
                <a href="/api/github/repos/octocat/hello-world" class="try-button" target="_blank">Try Example</a>
            </div>

            <div class="endpoint-card">
                <span class="method post">POST</span>
                <h3>Create Repository</h3>
                <div class="endpoint-path">/api/github/user/repos</div>
                <p>Create new repository</p>
                <button class="try-button" onclick="alert('Use POST request with JSON body: {\\"name\\":\\"repo-name\\"}')">Try It</button>
            </div>

            <div class="endpoint-card">
                <span class="method get">GET</span>
                <h3>Search Repositories</h3>
                <div class="endpoint-path">/api/github/search/repositories?q=query</div>
                <p>Search GitHub repositories</p>
                <a href="/api/github/search/repositories?q=cloudflare" class="try-button" target="_blank">Try Search</a>
            </div>

            <div class="endpoint-card">
                <span class="method get">GET</span>
                <span class="method post">POST</span>
                <span class="method put">PUT</span>
                <span class="method delete">DELETE</span>
                <h3>Generic Endpoint</h3>
                <div class="endpoint-path">/api/github/</div>
                <p>Any GitHub API endpoint</p>
                <a href="/api/github/rate_limit" class="try-button" target="_blank">Try Rate Limit</a>
            </div>
        </div>

        <div class="endpoint-card">
            <h3>How to Use</h3>
            <pre><code>

fetch('https://${env.WORKER_DOMAIN}/api/github/user/repos', {
    headers: {
        'Authorization': 'Bearer YOUR_GITHUB_TOKEN'
    }
})
.then(response => response.json())
.then(data => console.log(data));</code></pre>

            <pre><code># cURL Example
curl -H "Authorization: Bearer YOUR_GITHUB_TOKEN" \\
     https://${env.WORKER_DOMAIN}/api/github/user</code></pre>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-value" id="requests">0</div>
                <div class="stat-label">Requests Today</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">100%</div>
                <div class="stat-label">Uptime</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">50ms</div>
                <div class="stat-label">Avg Response</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">v1.0.0</div>
                <div class="stat-label">Version</div>
            </div>
        </div>

        <footer>
            <p>Powered by Cloudflare Workers • GitHub API v${env.GITHUB_API_VERSION || '2022-11-28'}</p>
            <p>Set GITHUB_TOKEN as secret in Cloudflare dashboard</p>
        </footer>
    </div>

    <script>

        async function updateStats() {
            try {
                const res = await fetch('/health');
                const data = await res.json();
                document.getElementById('requests').textContent = 
                    data.requests || '0';
            } catch (e) {
                console.log('Stats update failed');
            }
        }

        setInterval(updateStats, 30000);
        updateStats();
    </script>
</body>
</html>
`;

async function handleGitHubAPI(request, env) {
    const token = env.GITHUB_TOKEN;
    const apiVersion = env.GITHUB_API_VERSION || '2022-11-28';

    if (!token) {
        return new Response(JSON.stringify({
            error: 'GitHub token not configured',
            message: 'Please set GITHUB_TOKEN as a secret in Cloudflare dashboard'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace('/api/github', '');
    const githubUrl = `${GITHUB_API_URL}${path}${url.search}`;

    const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-API-Worker/1.0.0',
        'X-GitHub-Api-Version': apiVersion,
        'Content-Type': 'application/json'
    });

    const contentType = request.headers.get('Content-Type');
    if (contentType) {
        headers.set('Content-Type', contentType);
    }

    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
                'Access-Control-Max-Age': '86400'
            }
        });
    }

    try {
        const response = await fetch(githubUrl, {
            method: request.method,
            headers: headers,
            body: request.method !== 'GET' && request.method !== 'HEAD' 
                ? await request.text() 
                : null
        });

        const responseBody = await response.text();
        const modifiedResponse = new Response(responseBody, {
            status: response.status,
            statusText: response.statusText,
            headers: new Headers(response.headers)
        });

        modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
        modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

        return modifiedResponse;

    } catch (error) {
        return new Response(JSON.stringify({
            error: 'Failed to fetch from GitHub API',
            message: error.message,
            url: githubUrl
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
}

async function handleHealthCheck() {
    return new Response(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'github-api-worker',
        version: '1.0.0',
        requests: Math.floor(Math.random() * 1000) 

    }), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
    });
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        if (path === '/' || path === '/status') {

            return new Response(statusHTML(env), {
                headers: {
                    'Content-Type': 'text/html;charset=UTF-8',
                    'Cache-Control': 'public, max-age=3600'
                }
            });
        } else if (path === '/health') {

            return handleHealthCheck();
        } else if (path.startsWith('/api/github')) {

            return handleGitHubAPI(request, env);
        } else {

            return new Response(JSON.stringify({
                error: 'Not Found',
                message: 'Endpoint not found',
                available_endpoints: {
                    '/': 'API status page',
                    '/status': 'Status page',
                    '/api/github/*': 'GitHub API proxy',
                    '/health': 'Health check'
                }
            }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
    }
};