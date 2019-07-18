const {
  getCountryByCoordinates,
  getCoordinatesByCapital,
  getTemperature,
  weatherSeasonByCountry,
} = require('../services');

// eslint-disable-next-line arrow-body-style
module.exports.getWeatherTemperature = async (req, res) => {
  const { lat, lng } = req.query;

  console.log('latlng', lat, lng);
  const { addressCountry } = await getCountryByCoordinates(lat, lng);
  let resp;
  if (addressCountry !== '') {
    console.log('country=', addressCountry);
    const capitalCoordinates = await getCoordinatesByCapital(addressCountry);
    console.log(capitalCoordinates);
    const weatherTemperature = await getTemperature(capitalCoordinates);
    console.log('temperature:', weatherTemperature);
    const weatherSeason = weatherSeasonByCountry(capitalCoordinates.lat, new Date());
    console.log('Season:', weatherSeason);
    resp = {
      status: 201,
      data: { addressCountry, temperature: weatherTemperature, weatherSeason },
    };
  } else {
    resp = {
      status: 500,
      data: { error: 'country not found' },
    };
  }

  res.json(resp.data);
};
