const getDb = require("../../getDb");

const updateNoteQuery = async (note) => {
  //Declaramos la conexión para poder acceder en los bloques de try catch y finally.
  let connection;
  try {
    const { title, text, category, id } = note;
    // Abrimos una pool de conexiones con la base de datos.
    connection = await getDb;

    //actualizamos  la nota con el id de la petición.
    await connection.query(
      `UPDATE notes SET title =?,text=?,category = ? WHERE id = ?`,
      [title, text, category, id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateNoteQuery;
