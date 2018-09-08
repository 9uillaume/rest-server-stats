const express = require('express');
const jwt = require('jsonwebtoken');
const log = require('simple-node-logger').createSimpleLogger();
const PlaygroundClient = require('../db-clients/PlaygroundClient');

const router = express.Router();
router.use(require('./middleware/request'));

router.use(require('./middleware/authorization'));

router.get('/_ping', (req, res) => res.sendStatus(200));

router.post('/location/create', (req, res, next) => {
  jwt.verify(req.token, 'playground', (authErr, authData) => {
    if (authErr) {
      res.sendStatus(403);
    } else {
      const client = PlaygroundClient.instance();
      client.createLocation(req.body)
        .then(() => {
          log.info('200: success');
          res.status(200)
            .json({
              status: 'success',
              message: 'New location created',
              authData,
            });
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});

router.get('/locations', (req, res, next) => {
  jwt.verify(req.token, 'playground', (authErr, authData) => {
    if (authErr) {
      res.sendStatus(403);
    } else {
      const client = PlaygroundClient.instance();
      client.getLocations()
        .then((query) => {
          log.info('200: success');
          res.status(200)
            .json({
              status: 'success',
              data: query,
              message: 'Retrieved all locations',
              authData,
            });
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});

router.use(require('./middleware/errorHandler'));

module.exports = router;
