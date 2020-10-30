/**
 * In order to keep the code organised I try to separate it into multiple chunks
 * This is the Express file where all express' parameters are being defined
 */

const express = require('express');
const app = express();
app.use(express.json());
module.exports = app;