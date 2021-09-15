const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
const sheets = require('../lib/sheets');
const { isLoggedIn, isAdmin } = require('../lib/auth');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
    }
});

const upload = multer({
    storage: storage,
});

router.get('/', isAdmin,(req, res) => {
    res.render('tools/tools');
});

router.get('/sheets', isAdmin,(req, res) => {
    //LAYOUT FILES
    const files = sheets.scan();
    console.log(files);

    res.render('tools/sheets/sheets', {
        layout: 'sheetsLayout',
        files: files,
    });
});

router.get('/sheets/:file', isAdmin,(req, res) => {
    //LAYOUT FILES
    const files = sheets.scan();
    const data = sheets.read(req.params.file);
    const keys = sheets.getObjectKey(req.params.file);
    res.render('tools/sheets/render', {
        layout: 'sheetsLayout',
        files: files,
        data: data,
        keys: keys,
    });
});

router.post('/sheets/upload', upload.single('sheet'), isAdmin,(req, res) => {
    req.flash('success', 'Archivo subido correctamente');
    res.redirect('/tools/sheets');
});

module.exports = router;