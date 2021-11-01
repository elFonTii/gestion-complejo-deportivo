const mysql = require('mysql');
const express = require('express');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

// Si no se puede conectar a la base de datos, se lanza una excepción
pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
        return;
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has to many connections');
        return;
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused');
        return;
      }
    }
    // Si la conexión es exitosa, se ejecuta la función.
    if(connection){
    connection.release();
    //log with colors
    console.log('\x1b[34m%s\x1b[0m', 'Database connection was released with a result of:', '\x1b[32m\x1b[0m', connection.state);
    return;
    }
});

// Ejecuta una sentencia SQL
pool.query = promisify(pool.query);

module.exports = pool;