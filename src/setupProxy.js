const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/requestImageURL", {
      target: "https://api.cloudflare.com",
      changeOrigin: true,
      pathRewrite: {
        "^/requestImageURL": "https://api.cloudflare.com",
      },
    })
  );
  app.use(
    createProxyMiddleware("/imageUpload", {
      target: "https://upload.imagedelivery.net",
      changeOrigin: true,
      pathRewrite: {
        "^/imageUpload": "https://upload.imagedelivery.net",
      },
    })
  );
};
