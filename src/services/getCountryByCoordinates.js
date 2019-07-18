
const axios = require('axios');
const { countriesCapital } = require('./models');
const { findCountryName, findCountryCapital } = require('./utils/countryByCoordinatesUtils');

/**
 * retorna nombre de pais y su capital a partir de una
 * coordenada de cualquier localidad de ese pais
 */
module.exports.getCountryByCoordinates = (latitude, longitude) => {
  console.log('Latitude: ', latitude, '  Longitude: ', longitude);
  // const latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

  return new Promise((resolve, reject) => {
    const url = `${process.env.GOOGLE_MAPS_API_URL}?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    console.log('url', url);
    axios.get(url)
      .then(async (response) => {
        const countries = response.data;
        if (!countries || !countries.results || !countries.results.length) {
          return reject();
        }

        const countryName = await findCountryName(countries);
        console.log('countryName', countryName);
        if (countryName === '') {
          return resolve({ addressCountry: '' });
        }
        const countryCapital = await findCountryCapital(countryName, countriesCapital);
        if (countryCapital === '') {
          return resolve({ addressCountry: '' });
        }
        return resolve({ addressCountry: `${countryCapital},${countryName}` });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
