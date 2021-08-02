const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

// Si no se puede conectar a la base de datos, se lanza una excepción
pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has to many connections');
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused');
      }
    }
    // Si la conexión es exitosa, se ejecuta la función.
    if(connection) connection.release();
    console.log('La conexión con la base de datos ' + database.database + ' se ha establecido correctamente.');
    console.log('Server inicializado con éxito.');
    return;
}); 

// Ejecuta una sentencia SQL
pool.query = promisify(pool.query);

module.exports = pool;