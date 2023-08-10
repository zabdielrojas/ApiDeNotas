const selectUserByIdQuery = require("../../database/queries/users/selectUserByIdQuery");
const updateUserQuery = require("../../database/queries/users/updateUserQuery");
const { generateError } = require("../../helpers");

const editUser = async (req, res, next) => {
  try {
    console.log(req.body);
    //obtenemos el id del token
    const { id } = req.user;
    const { username, email } = req.body;
    if (!username && !email) {
      throw generateError("error faltan campos", 400);
    }

    // llamamos a la funcion que selecciona el user y lo guardamos en una variable
    const user = await selectUserByIdQuery(id);

    //guardamos en un objeto la informacion actualizada
    const updatedUser = {
      username: username || user.username,
      email: email || user.email,
      id: user.id,
      created_at: user.created_at,
    };
    // llamaos a la funcion que actualiza el usuario
    await updateUserQuery(updatedUser);

    res.send({
      status: "ok",
      messaje: `Usuario ${updatedUser.id} actualizado`,
      data: { user: updatedUser },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = editUser;
