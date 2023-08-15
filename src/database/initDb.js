require("dotenv").config();

const getDb = require("./getDb");

// Función que resetea la base de datos. 
async function main() {

  // Declaramos una variable donde irá nuestra pool de conexiones fuera del try para que tenga alcance en el finally.
  let connection;

  try {
    // Guardamos en la variable connection la pool de conexiones.
    connection = await getDb;

    console.log("Borrando tablas existentes");

    // Borramos la tablas en el orden inverso al que son creadas.
    await connection.query("DROP TABLE IF EXISTS notes");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("Creando tablas");

    // Creamos la tabla users que es independiente.
    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        username VARCHAR(30) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Y después la de notes porque depende de la tabla users.

    await connection.query(`
      CREATE TABLE notes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        title VARCHAR(30) NOT NULL,
        text VARCHAR(1000) NOT NULL,
        image VARCHAR(100),
        category ENUM("emergencia", "otras", 
        "importantes", "citas") DEFAULT "otras",
        is_public BOOLEAN NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `);

  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release(); // Si queda una conexión abierta con la DB, la cierra.

    process.exit(); // Una vez acabado el reseteo cerramos el proceso.
  }
}

main();
