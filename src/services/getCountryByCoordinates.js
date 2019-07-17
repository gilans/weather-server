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
  const lcCountryName = countryName.toLocaleLowerCase();
  const helperFunc = item => item.name.toLocaleLowerCase().includes(lcCountryName);

  const countryResponse = await countriesCapital.find(helperFunc);
  const countryCapital = countryResponse ? countryResponse.capital : '';
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
          return reject();
        }
        // handle success

        const countryName = await findCountryName(countries);
        console.log('countryName', countryName);
        if (countryName === '') {
          return resolve({ addressCountry: '' });
        }
        const countryCapital = await findCountryCapital(countryName);
        if (countryCapital === '') {
          return resolve({ addressCountry: '' });
        }
        return resolve({ addressCountry: `${countryCapital},${countryName}` });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  });
};
