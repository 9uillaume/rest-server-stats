const express = require('express');
// const log = require('simple-node-logger').createSimpleLogger();


const router = express.Router();
router.use(require('./middleware/request'));

// router.use(require('./middleware/authorization'));

router.get('/_ping', (req, res) => res.sendStatus(200));
