const express = require('express');
const router = express.Router();
const netatmoCtrl = require('../controllers/netatmo');

router.get('/access_token', netatmoCtrl.getToken);
router.get('/measures', netatmoCtrl.getMeasures);
router.get('/means', netatmoCtrl.getMeans);
module.exports = router;