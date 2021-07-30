const express = require('express');
const notifier = require('node-notifier');

const app = express();

const pool = require('../database');

const notification = {};


notification.get = async (id_notification) => {
    const user = app.locals.user;
    console.log(user);
    const notification = await pool.query('SELECT * FROM notifications WHERE  id_notification = ?', id_notification);
    return notification;
    const alv = document.getElementById('nashe');
};

notification.windows = (title, message) => {
    notifier.notify({
        title: title,
        message: message,
        icon: './public/img/profile_picture.svg',
        appID: 'Gestión de Complejo '
      });
};


module.exports = notification;
