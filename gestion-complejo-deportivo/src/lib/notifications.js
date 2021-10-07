const express = require('express');
const notifier = require('node-notifier');

const pool = require('../database');

const notification = {};

/*
    NO
*/
notification.create = async (notificationData) => {
    await pool.query('INSERT INTO notifications SET ?', notificationData);
}

notification.deleteOne = async (id) => {
    await pool.query('DELETE FROM notifications WHERE noti_id = ?', [id]);
}

notification.get = async () => {
    return await pool.query('SELECT * FROM notifications');
}

notification.getNews = async () => {
    return await pool.query('SELECT * FROM notifications WHERE wasRead = 0');
}

notification.getNewCount = async () => {
    const result = await pool.query('SELECT COUNT(*) AS count FROM notifications WHERE wasRead = 0');
    return result[0].count;
}

notification.setViewed = async () => {
    await pool.query('UPDATE notifications SET wasRead = 1 WHERE wasRead = 0');
}

notification.windows = (title, message) => {
    notifier.notify({
        title: title,
        message: message,
        icon: './public/img/profile_picture.svg',
        appID: 'Gestión de Complejo'
      });
};


module.exports = notification;
