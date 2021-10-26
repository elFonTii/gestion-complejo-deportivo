const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
const sheets = require('../lib/sheets');
const { isLoggedIn, isAdmin } = require('../lib/auth');
const notes = require('../lib/notes');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/'),
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
    }
});

const upload = multer({
    storage: storage,
});

router.get('/', isAdmin, (req, res) => {
    res.render('tools/tools');
});

/* ROUTE OF A DEPRECATED MODULE */
    router.get('/sheets', isAdmin,(req, res) => {
        res.send('This route is deprecated.');
});

router.get('/sheets/:file', isAdmin, (req, res) => {
    //LAYOUT FILES
    const files = sheets.scan();
    const data = sheets.read(req.params.file);

    //RENDER
    const keys = sheets.getObjectKey(req.params.file);
    res.render('tools/sheets/render', {
        layout: 'sheetsLayout',
        files: files,
        rows: {
            data0: data[0],
            data1: data[1],
            data2: data[2],
            data3: data[3],
            data4: data[4],
            data5: data[5],
            data6: data[6],
            data7: data[7],
            data8: data[8],
            data9: data[9],
            data10: data[10],
        },
        keys: keys,
    });
})

router.post('/sheets/upload', upload.single('sheet'), isAdmin, (req, res) => {
    req.flash('success', 'Archivo subido correctamente');
    res.redirect('/tools/sheets');
});

router.get('/notes', isAdmin, (req, res) => {
    const notas = notes.scan();

    const keys = Object.keys(notas);
    res.render('tools/notes/notes', { layout: 'notesLayout', notas: notas });
})

router.get('/notes/new', isAdmin, (req, res) => {
    const notas = notes.scan();
    res.render('tools/notes/new', { layout: 'notesLayout', notas: notas });
})

router.post('/notes/new', isAdmin, (req, res) => {
    const { title, body } = req.body;
    notes.new(title, body);
    req.flash('success', 'Nota creada correctamente');
    res.redirect('/tools/notes');
});

router.get('/notes/:title', isAdmin, (req, res) => {
    const notas = notes.scan();
    const content = (notes.read(req.params.title));
    const title = req.params.title;
    res.render('tools/notes/read', { layout: 'notesLayout', content: content, title: title, notas: notas });
});

module.exports = router;