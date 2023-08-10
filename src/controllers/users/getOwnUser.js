const selectUserByIdQuery = require("../../database/queries/users/selectUserByIdQuery");

const getOwnUser = async (req, res, next) => {
  try {
    //obtenemos el id del token
    const { id } = req.user;

    // llamamos a la funcion que selecciona el user y lo guardamos en una variable
    const user = await selectUserByIdQuery(id);

    //guardamos en un objeto la informacion que queremos mostrar
    const userInfo = {
      username: user.username,
      email: user.email,
      id: user.id,
      created_at: user.created_at,
    };

    res.send({ status: "ok", data: { user: userInfo } });
  } catch (error) {
    next(error);
  }
};
module.exports = getOwnUser;
