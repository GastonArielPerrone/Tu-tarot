const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Proxy /api/generate hacia Ollama local
const target = process.env.OLLAMA_TARGET || 'http://localhost:11434';
app.use('/api/generate', createProxyMiddleware({
  target: target,
  changeOrigin: true,
  pathRewrite: { '^/api/generate': '/api/generate' },
  onProxyReq: (proxyReq, req, res) => {
    // mantener el body en proxied requests
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  }
}));

app.get('/', (req, res) => res.send('Proxy to Ollama - add CORS headers'));

app.listen(PORT, () => console.log(`Proxy listening on http://localhost:${PORT} -> ${target}`));
