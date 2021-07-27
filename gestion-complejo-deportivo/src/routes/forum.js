const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('forum/main');
});

module.exports = router;