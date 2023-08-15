const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

// Función que comprueba si el usuario está logeado o no.
const isAuth = async (req, res, next) => {

  try {
    const { authorization } = req.headers;

    // Si no tiene token, no está loggeado y simplemente pasamos al siguiente middleware.
    if (!authorization) {
      return next();
    }
    // Si lo tuviera, agregamos la  información del usuario a la petición.
    let tokenInfo;

    try {
      // Se verifica si el token es válido y si no se lanza un error.
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (error) {
      throw generateError("Token incorrecto", 401);
    }
    // Agregamos la información a la petición.
    req.user = tokenInfo;
    next();
    
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
