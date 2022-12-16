const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3999;
const HOST = "localhost";
const NODE_1 = "http://stx-btc1.dlc.link";

// Logging
app.use(morgan('dev'));

// Proxy endpoints
app.use('/', createProxyMiddleware({
  target: NODE_1,
  changeOrigin: true,
  router: {
    'localhost:3999': NODE_1 + ':' + PORT,
  }
}));

// Start Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
