const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
const sheets = require('../lib/sheets');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
    }
});

const upload = multer({
    storage: storage,
});

router.get('/', (req, res) => {
    res.render('tools/tools');
});

router.get('/sheets', (req, res) => {
    res.render('tools/sheets/sheets');
    const datos = sheets.read('sheet-1631678597870.xlsx');
    console.log(sheets.data(datos, 'Nombre'));
});

router.post('/sheets/upload', upload.single('sheet'), (req, res) => {
    res.send('Uploaded');
});

module.exports = router;