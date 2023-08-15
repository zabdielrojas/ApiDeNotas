const getDb = require("../../getDb");

const {generateError}= require("../../../helpers")

const selectUserByEmailQuery = async (email)=>{
 //Declaramos la conexión para poder acceder en los bloques de try catch y finally.
 let connection;

try {
    // Abrimos una pool de conexiones con la base de datos.
    connection = await getDb

    // Seleccionamos al usuario con el email de la petición.
    const [users] = await connection.query(`SELECT * FROM users WHERE email = ?`,[email]);

 // Lanzamos un error si el email es incorrecto
 if (users.length < 1) {
    return("Usuario no encontrado", 404);
  }

  // Devolvemos la información del usuario.
  return users[0]

}finally{
    if(connection) connection.release();
}


}

module.exports = selectUserByEmailQuery;