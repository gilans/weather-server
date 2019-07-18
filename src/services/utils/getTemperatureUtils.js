module.exports = {
  /**
   * Funcion que genera un 10% de error para ser usado en la llamada al servicio
   */
  simulateErrorService() {
    const randNumber = Math.floor(Math.random() * 100);
    const resultError = randNumber >= 0 && randNumber <= 9;
    console.log('-------Simulate Error = ', resultError);
    return resultError;
  },
};
