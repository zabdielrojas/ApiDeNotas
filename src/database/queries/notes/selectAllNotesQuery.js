const getDb = require("../../getDb");
const {generateError}= require("../../../helpers")


const selectAllNotesQuery = async (user_id)=>{
 // Declaramos la conexión para poder acceder en los bloques de try catch y finally.
 let connection;
try {

    // Abrimos una pool de conexiones con la base de datos.
    connection =  await getDb

    // Guardamos en una variable la string con nuestra consulta.
    let query = "SELECT title, id, user_id FROM notes WHERE is_public = 1"
    
    // Si el usuario está registrado podrá ver las notas que ha creado.
    if (user_id) query += " OR user_id = ?"
    
    const [notes] = await connection.query(query,[user_id])

    return notes 

}finally{
    if(connection) connection.release();
}

}

module.exports = selectAllNotesQuery;
