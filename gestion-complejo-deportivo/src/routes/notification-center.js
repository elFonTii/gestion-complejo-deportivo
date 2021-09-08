const express = require('express');
const router = express.Router();
const { get, create, deleteOne, getNews, setViewed } = require('../lib/notifications');
const { isLoggedIn, isAdmin } = require('../lib/auth');

router.get('/', isLoggedIn ,async(req, res) => {
    const notifications = await get();
    const newNotifications = await getNews();
    res.render('notifications/index', { notifications, newNotifications });
    setViewed();
});

router.get('/:id_noti/delete', isAdmin, async(req, res) => {
    const { id_noti } = req.params;
    await deleteOne(id_noti);
    req.flash('success', 'Notificación eliminada correctamente');
    res.redirect('/notification-center');
});

router.get('/new', isAdmin, (req, res) => {
    res.render('notifications/new');
});

router.post('/new', isAdmin, async(req, res) => {
    const { noti_title, noti_description } = req.body;
    const newNotification = {
        noti_icon: 'fas fa-exclamation',
        noti_title,
        noti_description,
        wasRead: 0,
    }
    await create(newNotification);
    req.flash('success', 'Una nueva notificación fue añadida con éxito');
    res.redirect('/notification-center');
});

module.exports = router;