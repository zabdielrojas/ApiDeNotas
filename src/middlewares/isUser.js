const { generateError } = require("../helpers");

// Comprueba si el usuario tiene el token y si no genera un error.
const isUser = (req, res, next) => {
  if (req.user) return next();
  
  throw generateError("No puedes acceder", 401);

};

module.exports = isUser;
