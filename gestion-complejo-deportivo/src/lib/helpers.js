const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
    // Encrypt the password with bcrypt 
    //(Genera un hash de la contraseña genSalt toma como parámetro las veces que el algoritmo de encriptación se repite)
    const salt = await bcrypt.genSalt(10);
    const cryptedPass = await bcrypt.hash(password, salt);
    return cryptedPass;
};

helpers.comparePasswords = async (password, savedPass) => {
    // Compare the password with the crypted password
    // (Verifica si la contraseña es correcta)
    return await bcrypt.compare(password, savedPass);
};
module.exports = helpers;