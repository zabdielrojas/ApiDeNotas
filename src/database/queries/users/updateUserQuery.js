const getDb = require("../../getDb");

const updateUserQuery = async (updatedUser) => {
  const { id, username, email } = updatedUser;

  //Declaramos la conexión para poder acceder en los bloques de try catch y finally.
  let connection;
  try {

    // Abrimos una pool de conexiones con la base de datos.
    connection = await getDb;

    //actualizamos la informacion del usuario.
    await connection.query(
      `UPDATE users SET email=?, username=? WHERE id = ?`,
      [email, username, id]
    );
    
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserQuery;
