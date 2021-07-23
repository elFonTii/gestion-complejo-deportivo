const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
    // Encrypt the password with bcrypt 
    //(Genera un hash de la contraseña genSalt toma como parámetro las veces que el algoritmo de encriptación se repite)
    const salt = await bcrypt.genSalt(10);
    const cryptedPass = await bcrypt.hash(password, salt);
    return cryptedPass;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch(e){
        console.log(e)
    }
};

module.exports = helpers;