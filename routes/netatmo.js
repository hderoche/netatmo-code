const express = require('express');
const router = express.Router();
const netatmoCtrl = require('../controllers/netatmo');


/**
 * Creating the different routes to keep code organised
 */
router.get('/access_token', netatmoCtrl.getToken);
router.get('/measures', netatmoCtrl.getMeasures);
router.get('/means', netatmoCtrl.getMeans);
module.exports = router;