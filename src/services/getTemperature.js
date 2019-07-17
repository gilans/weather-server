const axios = require('axios');
const redisClient = require('./utils/redis-client');

module.exports.getTemperature = async ({ lat, lng }) => {
  const key = `${lat}:${lng}`;
  const redisData = await redisClient.getAsync(key);

  console.log('Address: ', lat, lng);
  const { DARKSKY_API_KEY, DARKSKY_API_URL, DARKSKY_API_UNITS } = process.env;

  return new Promise((resolve, reject) => {
    if (redisData) {
      console.log('redis data', redisData);
      resolve(redisData);
    }
    else {
      const url = `${DARKSKY_API_URL}${DARKSKY_API_KEY}/${lat},${lng}?units=${DARKSKY_API_UNITS}`;
      console.log('url', url);
      axios.get(url)
        .then(async (response) => {
          const weatherData = response.data;
          if (!weatherData || !weatherData.currently) {
            return reject(); // TODO: error
          }
          const { temperature } = weatherData.currently;

          await redisClient.setAsync(key, temperature);

          return resolve(temperature);
        })
        .catch((error) => {
          // handle error
          console.log('Error', error);
        });
    }
  });
};
