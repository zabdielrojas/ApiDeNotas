
const getDb = require("../../getDb");
const {generateError}= require("../../../helpers")


const insertUserQuery = async (username,email,hashedPassword)=>{
 // Declaramos la conexión para poder acceder en los bloques de try catch y finally.
 let connection;
try {
    // Abrimos una pool de conexiones con la base de datos.
    connection =  await getDb

    // Comprobamos si hay ya un usuario registrado con ese email.
    const [userMail] = await connection.query(`SELECT * FROM users WHERE email=?`,[email])

    // Si así fuese lanzamos un error.
    if (userMail.length > 0) {
        throw generateError(
            '¡Ya existe un usuario con ese email en la base de datos!',
            409
        );
    }

    // Insertamos el usuario en la base de datos.
    await connection.query(
        `INSERT INTO users (username, email, password,created_at) VALUES (?, ?, ?,?)`,
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
