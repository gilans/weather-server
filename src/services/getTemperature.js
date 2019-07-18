const axios = require('axios');

const redisClient = require('./utils/redis-client');
const { simulateErrorService } = require('./utils/getTemperatureUtils');

module.exports.getTemperature = async ({ lat, lng }) => {
  const key = `${lat}:${lng}`;
  const redisData = await redisClient.getAsync(key);

  console.log('Address: ', lat, lng);
  const { DARKSKY_API_KEY, DARKSKY_API_URL, DARKSKY_API_UNITS } = process.env;

  if (redisData) {
    console.log('redis data=', redisData);
    return redisData;
  }

  const url = `${DARKSKY_API_URL}${DARKSKY_API_KEY}/${lat},${lng}?units=${DARKSKY_API_UNITS}`;

  const resp = await axiosGetRetry(url, 20);
  const weatherData = resp.data;
  if (!weatherData || !weatherData.currently) {
    return '';
  }

  const { temperature } = weatherData.currently;

  await redisClient.setAsync(key, temperature);

  return temperature;
};

const axiosGetRetry = async (url, n) => {
  try {
    if (simulateErrorService()) {
      console.log('>>>>>>>> Error simulado');
      throw Error('Error Service ....');
    }
    return await axios.get(url);
  } catch (err) {
    if (n === 1) throw err;
    return await axiosGetRetry(url, n - 1);
  }
};
