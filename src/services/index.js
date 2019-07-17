const { getCountryByCoordinates } = require('./getCountryByCoordinates');
const { getCoordinatesByCapital } = require('./getCoordinatesByCapital');
const { getTemperature } = require('./getTemperature');
const { weatherSeasonByCountry } = require('./weatherSeasonByCountry');

module.exports = {
  getCountryByCoordinates,
  getCoordinatesByCapital,
  getTemperature,
  weatherSeasonByCountry,
};
