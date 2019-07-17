const axios = require('axios');
const { countriesCapital } = require('./models');

const findCountryName = countries => new Promise((resolve) => {
  const findCountry = item => item.types.includes('country');
  const dataCountry = countries.results.find(findCountry);

  const countryName = dataCountry
    ? dataCountry.formatted_address
    : '';
  return resolve(countryName);
});

const findCountryCapital = countryName => new Promise(async (resolve) => {
  const helperFunc = item => item.name.toLocaleLowerCase() === countryName.toLocaleLowerCase();
  // TODO: agregar expresion regular para buscar texto
  const countryCapital = await countriesCapital.find(helperFunc).capital;
  resolve(countryCapital);
});
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
          return reject(); // TODO: error
        }
        // handle success

        const countryName = await findCountryName(countries);
        console.log('countryName', countryName);
        if (countryName === '') {
          return reject(); // TODO: error
        }
        const countryCapital = await findCountryCapital(countryName);
        return resolve({ addressCountry: `${countryCapital},${countryName}` });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  });
};
