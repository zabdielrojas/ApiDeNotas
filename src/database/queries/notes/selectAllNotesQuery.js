const getDb = require("../../getDb");
const {generateError}= require("../../../helpers")


const selectAllNotesQuery = async (user_id, category)=>{
 // Declaramos la conexión para poder acceder en los bloques de try catch y finally.
 let connection;
try {

    // Abrimos una pool de conexiones con la base de datos.
    connection =  await getDb

    // Guardamos en una variable la string con nuestra consulta.
    let query = "SELECT title, id, user_id, image, category, uuid, is_public FROM notes WHERE user_id = ?"

    // Si hay una categoría añadimos el filtro.
    if (category) query += " AND category = ?"

    const [notes] = await connection.query(query,[user_id, category])

    return notes 

}finally{
    if(connection) connection.release();
}

}

module.exports = selectAllNotesQuery;
