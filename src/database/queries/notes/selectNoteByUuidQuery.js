const getDb = require("../../getDb");

const { generateError } = require("../../../helpers");

const selectNoteByUuidQuery = async (uuid) => {
  //Declaramos la conexión para poder acceder en los bloques de try catch y finally.
  let connection;
  try {
    // Abrimos una pool de conexiones con la base de datos.
    connection = await getDb;

    //Seleccionamos la nota con el uuid de la petición.
    const [notes] = await connection.query(`SELECT * FROM notes WHERE uuid = ?`, [
      uuid,
    ]);

    //Lanzamos un error si no se encuentra la nota
    if (notes.length < 1) {
      throw generateError("Nota no encontrada", 404);
    }
    //Devolvemos la información de la notaa
    return notes[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNoteByUuidQuery;
