const pool = require('../database');
const log = require('../lib/log');
const user = {}

user.data = async function (username) {
    data = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return data[0];
}

user.modify = async function (type, username, param){
    newParam = param;
    if(type == 'name'){
        await pool.query('UPDATE users SET name = ? WHERE username = ?', [newParam, username]);
    } else if(type == 'surname'){
        await pool.query('UPDATE users SET surname = ? WHERE username = ?', [newParam, username]);
    } else if(type == 'direccion'){
        await pool.query('UPDATE users SET direccion = ? WHERE username = ?', [newParam, username]);
    } else if(type == 'telefono'){
        await pool.query('UPDATE users SET telefono = ? WHERE username = ?', [newParam, username]);
    } else {
        log.error('TIPO DE DATO user.modify(?, username, param)', 'Verifica que hayas escrito bien el primer parámetro,');
    }
}
module.exports = user;