
const getDb = require("../../getDb");

const insertUserQuery = async (username,email,hashedPassword)=>{
 // Declaramos la conexión para poder acceder en los bloques de try catch y finally.
 let connection;
try {
    // Abrimos una pool de conexiones con la base de datos.
    connection =  getDb
    // Insertamos el usuario en la base de datos.
    await connection.query(
        `INSERT INTO user (username, email, password,created_at) VALUES (?, ?, ?,?)`,
        [
            username,
            email,
            hashedPassword,
            new Date()
        ]
    );

}finally{
    if(connection) connection.release();
}


}

module.exports = insertUserQuery;
