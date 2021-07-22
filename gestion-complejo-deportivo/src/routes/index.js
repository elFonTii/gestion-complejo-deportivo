const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Inicio de la pagina');
});
module.exports = router;