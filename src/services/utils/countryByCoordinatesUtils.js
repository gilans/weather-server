
module.exports = {
  /**
   * Busca el nombre del pais dentro del objeto devuelto por la API de google.maps
   * @param {*} countries
   */
  findCountryName(countries) {
    return new Promise((resolve) => {
      const findCountry = item => item.types.includes('country');
      const dataCountry = countries.results.find(findCountry);

      const countryName = dataCountry
        ? dataCountry.formatted_address
        : '';
      return resolve(countryName);
    });
  },
  /**
   * busca la capital del pais en el objeto countriesCapital que tiene una lista de paises y capitales
   * @param {*} countryName
   * @param {*} countriesCapital
   */
  findCountryCapital(countryName, countriesCapital) {
    return new Promise(async (resolve) => {
      const lcCountryName = countryName.toLocaleLowerCase();
      const helperFunc = item => item.name.toLocaleLowerCase().includes(lcCountryName);

      const countryResponse = await countriesCapital.find(helperFunc);
      const countryCapital = countryResponse ? countryResponse.capital : '';
      resolve(countryCapital);
    });
  },
};
