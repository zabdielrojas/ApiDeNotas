const mysql = require("mysql2/promise");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// Declaramos la variable pool fuera de la función para que tenga un alcance global.
let pool;

const getDb = async () => {
  try {
    
    if (!pool) {
        pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        timezone: "Z",
      });

    }

    // Retornamos una conexión libre.
    return await pool.getConnection();
  } catch (err) {
    console.error(err);
  }
};

// Exportamos la función.
module.exports = getDb();
