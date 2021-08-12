const express = require('express');
const notifier = require('node-notifier');

const pool = require('../database');

const notification = {};

notification.create = async (user, notificationData) => {
    const notification = {
        notification_user: user,
        notification_data: notificationData
    }
    
    await pool.query('INSERT INTO notification set ?', [notification]);
}

notification.get = async (user) => {
    const notifications = await pool.query('SELECT * FROM notification WHERE notification_user = ?', [user]);
    return notifications;
}

notification.windows = (title, message) => {
    notifier.notify({
        title: title,
        message: message,
        icon: './public/img/profile_picture.svg',
        appID: 'Gestión de Complejo '
      });
};


module.exports = notification;
