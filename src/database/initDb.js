require('dotenv').config();

const getDb=require("./getDb")


async function main() {
  let connection;

  try {
    connection = await getDb();

    console.log('Borrando tablas existentes');
    await connection.query('DROP TABLE IF EXISTS notes');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('Creando tablas');

    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        username VARCHAR(30) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE notes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        title VARCHAR(30) NOT NULL,
        text VARCHAR(1000) NOT NULL,
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
    if (connection) connection.release();
    process.exit();
  }
}

main();
