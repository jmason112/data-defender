const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000', 
      changeOrigin: true,
      logLevel: 'debug',
      onError: (err, req, res) => {
        console.error('Error in proxy middleware:', err);
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Something went wrong with the proxy middleware.');
      },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.on('data', function (dataBuffer) {
          const data = dataBuffer.toString('utf-8');
          console.log(`Response data from ${req.originalUrl}: ${data}`);
        });
      },
      onProxyReq: function(proxyReq, req, res) {
        console.log(`Request made to ${req.originalUrl}`);
      }
    })
  );
};