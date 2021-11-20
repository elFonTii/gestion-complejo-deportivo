const express = require('express');
const path = require('path');
const router = express.Router();
const { isAdmin, isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn ,(req, res) => {
    res.json({
        status: false,
        message: 'This area is under construction',
        data: null
    });
});

router.get('/:data', isLoggedIn, (req, res) => {
    const data = req.params.data;
    if (data === 'videos') {
        var video = req.query.video;
        console.log(video);
        var videoPath = '/videos/' + video + '.mp4';
    }
    res.render('tutorials/video', { videoPath });
});

module.exports = router;