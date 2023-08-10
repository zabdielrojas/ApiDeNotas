const getDb = require("../../getDb");

const { generateError } = require("../../../helpers");

const selectUserByIdQuery = async (id) => {
  //Declaramos la conexión para poder acceder en los bloques de try catch y finally.
  let connection;
  try {
    // Abrimos una pool de conexiones con la base de datos.
    connection = await getDb;

    //Seleccionamos al usuario con el id de la petición.
    const [users] = await connection.query(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);

    //Lanzamos un error si no se encuentra el usuario
    if (users.length < 1) {
      throw generateError("Usuario no encontrado", 404);
    }
    //Devolvemos la información del usuario.
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
