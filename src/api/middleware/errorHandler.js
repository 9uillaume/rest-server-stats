const log = require('simple-node-logger').createSimpleLogger();

const statusCodes = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const statusCode = err.responseStatusCode ? err.responseStatusCode : 500;
  const errorResponse = {
    message: err.message ? err.message : statusCodes[statusCode],
  };
  log.trace('error', { err: err.stack });
  log.debug('error', { url: req.url, error: errorResponse });
  return res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
