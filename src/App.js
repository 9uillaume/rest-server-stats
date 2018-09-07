
const express = require('express');
// const apiRouter = require('./api/router');

module.exports.init = () => {
  const app = express();
  app.use(express.json());
  app.get('/_ping', (req, res) => res.send({ ok: true }));
  // app.use('/api', apiRouter);

  return new Promise((resolve) => {
    module.exports.instance = () => app;
    resolve();
  });
};

module.exports.instance = () => { throw new Error('App not initialized'); };
