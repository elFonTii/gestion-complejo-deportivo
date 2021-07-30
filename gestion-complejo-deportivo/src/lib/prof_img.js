const pool = require('../database');

const profile = {};

profile.get = async (img_id) => {
  const src = await pool.query('SELECT src FROM profile_img WHERE id_img = ?', [img_id]);
  return src[0].src;
}

profile.set = async (img) => {
  await pool.query('INSERT INTO profile_img (src) VALUES (?)', [img]);
}

module.exports = profile;