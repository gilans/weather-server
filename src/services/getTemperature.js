const axios = require('axios');

// const redisClient = require('./utils/redis-client');

module.exports.getTemperature = async ({ lat, lng }) => {
  const key = `${lat}:${lng}`;
  const redisData = null; // = await redisClient.getAsync(key);

  console.log('Address: ', lat, lng);
  const { DARKSKY_API_KEY, DARKSKY_API_URL, DARKSKY_API_UNITS } = process.env;

  /* if (redisData) {
    console.log('redis data', redisData);
    return redisData;
  } else { */
  const url = `${DARKSKY_API_URL}${DARKSKY_API_KEY}/${lat},${lng}?units=${DARKSKY_API_UNITS}`;
  console.log('url', url);

  // const resp = await callService(url);
  const resp = await axiosGetRetry(url, 20);
  const weatherData = resp.data;
  if (!weatherData || !weatherData.currently) {
    return;// TODO: error
  }

  const { temperature } = weatherData.currently;

  // await redisClient.setAsync(key, temperature);

  return temperature;
  // }
};

const axiosGetRetry = async (url, n) => {
  try {
    if (simulateErrorService()) {
      console.log('>>>>>>>> Error simulado')
      throw Error('Error Service ....');
    }
    return await axios.get(url);
  } catch (err) {
    if (n === 1) throw err;
    return await axiosGetRetry(url, n - 1);
  }
};

function simulateErrorService() {
  const randNumber = Math.floor(Math.random() * 100)
  const resultError = randNumber >= 0 && randNumber <= 9;
  console.log('-------Simulate Error = ', resultError);
  return resultError;
}
function callService(url) {
  return new Promise((resolve, reject) => {

    axios.get(url, { retry: 20, retryDelay: 1000 })
      .then(async (response) => {
        if (simulateErrorService()) {
          console.log('>>>>>>>> Error simulado')
          throw Error('Error Service ....');
        }
        const weatherData = response.data;
        if (!weatherData || !weatherData.currently) {
          return reject(); // TODO: error
        }

        const { temperature } = weatherData.currently;



        return resolve(temperature);
      })
      .catch((error) => {
        // handle error
        console.log('Error', error);
        callService(url);
      });
  });
};