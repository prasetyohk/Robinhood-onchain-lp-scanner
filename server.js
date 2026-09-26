const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const root = __dirname;
const port = 4173;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
};

function send(response, status, body, type = 'text/plain; charset=utf-8') {
  response.writeHead(status, {
    'content-type': type,
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type, x-target-rpc'
  });
  response.end(body);
}

const server = http.createServer(async (request, response) => {
  // CORS Preflight
  if (request.method === 'OPTIONS') {
    return send(response, 204, '');
  }

  // 1. Proxy Uniswap Indexer GetPosition API
  if (request.url === '/api/positions' && request.method === 'POST') {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', async () => {
      try {
        const upstream = await fetch('https://liquidity.backend-prod.api.uniswap.org/uniswap.liquidity.v2.LiquidityService/GetPosition', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          body
        });
        const result = await upstream.text();
        send(response, upstream.status, result, 'application/json; charset=utf-8');
      } catch (error) {
        send(response, 502, JSON.stringify({ error: error.message }), 'application/json; charset=utf-8');
      }
    });
    return;
  }

  // 2. Multichain RPC Proxy (handles CORS-restricted public RPCs)
  if (request.url.startsWith('/api/rpc-proxy') && request.method === 'POST') {
    const targetRpc = request.headers['x-target-rpc'] || new URL(request.url, `http://${request.headers.host}`).searchParams.get('rpc');
    if (!targetRpc) {
      return send(response, 400, JSON.stringify({ error: 'Missing target RPC URL in header x-target-rpc or query ?rpc=' }), 'application/json');
    }

    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', async () => {
      try {
        const upstream = await fetch(targetRpc, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body
        });
        const result = await upstream.text();
        send(response, upstream.status, result, 'application/json; charset=utf-8');
      } catch (error) {
        send(response, 502, JSON.stringify({ error: `RPC proxy error: ${error.message}` }), 'application/json');
      }
    });
    return;
  }

  // 3. Health & Ping Check
  if (request.url === '/api/health') {
    return send(response, 200, JSON.stringify({ status: 'ok', time: Date.now() }), 'application/json');
  }

  // 4. Static File Server
  const requested = request.url === '/' ? '/index.html' : request.url;
  const filePath = path.join(root, requested.split('?')[0]);
  if (!filePath.startsWith(root) || !fs.existsSync(filePath)) {
    return send(response, 404, 'File not found');
  }

  send(response, 200, fs.readFileSync(filePath), mime[path.extname(filePath)] || 'application/octet-stream');
});

server.listen(port, '127.0.0.1', () => {
  const url = `http://localhost:${port}`;
  console.log(`UniLP Lens Multichain Server running: ${url}`);
});
