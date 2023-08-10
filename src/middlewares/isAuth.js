const jwt = require("jsonwebtoken");
const { generateError } = require("../helpers");

const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next();
    }

    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (error) {
      throw generateError("Token incorrecto", 401);
    }
    req.user = tokenInfo;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
