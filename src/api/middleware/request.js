const log = require('simple-node-logger').createSimpleLogger();

const request = (req, res, next) => {
  log.info('received request', { url: req.url });
  next();
};

module.exports = request;
