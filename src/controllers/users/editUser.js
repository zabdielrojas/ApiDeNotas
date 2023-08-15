const selectUserByIdQuery = require("../../database/queries/users/selectUserByIdQuery");
const updateUserQuery = require("../../database/queries/users/updateUserQuery");
const { generateError } = require("../../helpers");

const editUser = async (req, res, next) => {
  try {
    
    // Obtenemos el id del token
    const { id } = req.user;

    // Obtenemos la información que se va a editar.
    const { username, email } = req.body;
    
    // Si no hay ni nombre de usuario ni email lanzamos un error.
    if (!username && !email) {
      throw generateError("error faltan campos", 400);
    }

    // llamamos a la funcion que selecciona el user y lo guardamos en una variable
    const user = await selectUserByIdQuery(id);

    // Guardamos en un objeto la informacion actualizada
    // Si no hubiese un campo lo llenamos con la información anterior

    const updatedUser = {
      username: username || user.username,
      email: email || user.email,
      id: user.id,
      created_at: user.created_at,
    };

    // Llamamos a la funcion que actualiza el usuario.

    await updateUserQuery(updatedUser);
    
    // Envíamos la información del usuario actualizada.
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
