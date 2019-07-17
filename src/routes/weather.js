const express = require('express');
// const localAuth = require('../auth/local');
const { getWeatherTemperature } = require('../controllers');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

router.get('/weather/temperature', getWeatherTemperature);

module.exports = router;
