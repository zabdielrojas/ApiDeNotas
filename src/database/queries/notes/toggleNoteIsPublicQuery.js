const getDb = require("../../getDb");

const toggleNoteIsPublicQuery = async (note) => {
  //Declaramos la conexión para poder acceder en los bloques de try catch y finally.
  let connection;
  try {
    const { is_public, id } = note;
    // Abrimos una pool de conexiones con la base de datos.
    connection = await getDb;

    //actualizamos  la nota con el id de la petición.
    await connection.query(`UPDATE notes SET is_public = ? WHERE id = ?`, [
      !is_public,
      id,
    ]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = toggleNoteIsPublicQuery;
