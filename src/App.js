
const express = require('express');
const jwt = require('jsonwebtoken');
const apiRouter = require('./api/router');

module.exports.init = () => {
  const app = express();
  app.use(express.json());
  app.get('/_ping', (req, res) => res.send({ ok: true }));

  app.get('/login', (req, res) => {
    const user = {
      id: 1,
      username: 'karma',
      password: 'playground',
    };

    jwt.sign({ user }, user.password, (err, token) => {
      res.json({
        token,
      });
    });
  });

  app.use('/api', apiRouter);

  return new Promise((resolve) => {
    module.exports.instance = () => app;
    resolve();
  });
};

module.exports.instance = () => { throw new Error('App not initialized'); };
