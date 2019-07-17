const axios = require('axios');

module.exports.getTemperature = ({ lat, lng }) => {
  console.log('Address: ', lat, lng);
  const { DARKSKY_API_KEY, DARKSKY_API_URL, DARKSKY_API_UNITS } = process.env;

  return new Promise((resolve, reject) => {
    const url = `${DARKSKY_API_URL}${DARKSKY_API_KEY}/${lat},${lng}?units=${DARKSKY_API_UNITS}`;
    console.log('url', url);
    axios.get(url)
      .then(async (response) => {
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
      });
  });
};
