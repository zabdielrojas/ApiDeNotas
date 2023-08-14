const getDb = require("../../getDb");

const insertNoteQuery = async (note) => {
  // Declaramos la conexión para poder acceder en los bloques de try catch y finally.
  let connection;
  try {
    const { title, text, image, category, user_id } = note;

    // Abrimos una pool de conexiones con la base de datos.
    connection = await getDb;

    // Insertamos la Nota en la base de datos.
    const [newNote] = await connection.query(
      `INSERT INTO notes  (title,text,image, category,user_id, created_at) VALUES (?, ?, ?,?,?,?)`,
      [title, text, image, category, user_id, new Date()]
    );
    //devuelve el id de la nueva nota
    return newNote.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNoteQuery;
