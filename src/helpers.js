
/**
 * ####################
 * ## GENERATE ERROR ##
 * ####################
 */
//Función que nos permite añadir un status code a los errores.

const generateError = (msg, status) => {
    const error = new Error(msg);
    error.statusCode = status;
    return error;
  };


  module.exports = {generateError}