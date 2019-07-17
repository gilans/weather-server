module.exports.weatherSeasonByCountry = (latitudeCountry, dateSeason) => {
  const [NORTHERN, SOUTHERN] = ['NORTHERN', 'SOUTHERN'];

  const HEMISPHERE = latitudeCountry >= 0 ? NORTHERN : SOUTHERN;

  const NORTHERN_SEASONS = ['Invierno', 'Primavera', 'Verano', 'Otoño'];
  const SOUTHERN_SEASONS = ['Verano', 'Otoño', 'Invierno', 'Primavera'];

  const SEASON_INDEX = Math.floor((dateSeason.getMonth() / 12 * 4)) % 4;

  let seasonName = SOUTHERN_SEASONS[SEASON_INDEX];
  if (HEMISPHERE === NORTHERN) {
    seasonName = NORTHERN_SEASONS[SEASON_INDEX];
  }
  return seasonName;
};
