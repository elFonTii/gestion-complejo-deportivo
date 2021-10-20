const express = require('express');
const router = express.Router();

router.get('/runner', (req, res) => {
    res.render('games/runner')
})

router.get('/tic-tac', (req, res) => {
    res.render('games/tic-tac', {layout: 'tic-tac'})
})

module.exports = router;