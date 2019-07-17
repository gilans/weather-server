const axios = require('axios');

module.exports.getCoordinatesByCapital = (address) => {
  console.log('Address: ', address);
  const addressNormalized = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return new Promise((resolve, reject) => {
    const { GOOGLE_MAPS_API_URL, GOOGLE_MAPS_API_KEY } = process.env;
    const url = `${GOOGLE_MAPS_API_URL}?address=${addressNormalized}&key=${GOOGLE_MAPS_API_KEY}`;
    console.log('url', url);
    axios.get(url)
      .then(async (response) => {
        console.log(JSON.stringify(response.data.results.geometry));
        const countries = response.data;
        if (!countries || !countries.results || !countries.results.length) {
          return reject(); // TODO: error
        }
        // handle success

        const dataCountry = countries.results[0].geometry.location;

        return resolve(dataCountry);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  });
};
