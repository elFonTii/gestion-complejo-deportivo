const bcrypt = require('bcryptjs');
const pool = require('../database');

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

helpers.getProfileImage = async (img_id) => {
  const src = await pool.query('SELECT src FROM profile_img WHERE id_img = ?', [img_id]);
}

helpers.setProfileImage = async (img) => {
  const src = await pool.query('INSERT INTO profile_img (src) VALUES (?)', [img]);
}

module.exports = helpers;