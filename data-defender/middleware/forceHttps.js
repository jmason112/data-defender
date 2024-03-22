// This middleware redirects HTTP requests to HTTPS
const forceHttps = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    console.log(`Redirecting http request to https: ${req.hostname}${req.originalUrl}`);
    return res.redirect(302, 'https://' + req.hostname + req.originalUrl);
  }
  console.log("Request is already using HTTPS");
  next();
};

module.exports = forceHttps;