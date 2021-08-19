const pool = require('../database');

const mydata = {};

//Get the current active booking from the sql database.
mydata.getActiveBooking = async function () {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}`;

    const date_splitted = date.split("-");

    /*EACH PART OF THE FULL DATE*/
    const currentMonth = ("0" + (parseInt(date_splitted[1]))).slice(-2);
    const currentDay = ("0" + (parseInt(date_splitted[2]))).slice(-2);
    const currentYear = date_splitted[0];
    /*EACH PART OF THE FULL DATE*/
    
    //ASSEMBLED TIME AND DATE
    const currentTime = ("0" + time).slice(-5);
    const currentDate = currentYear + "-" + currentMonth + "-" + currentDay;

    //END OF THE BOOKING IS ONE HOUR AFTER THE CURRENT TIME.
    const endDate = new Date();
    endDate.setHours(today.getHours() + 1);
    const endTime = ("0" + endDate.getHours()).slice(-2) + ":" + ("0" + endDate.getMinutes()).slice(-2);


    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ? AND start_booking = ?', [currentDate, currentTime]);

    if(bookings.length > 0) {
        return bookings;
    } else {
        return null;
    }
}

mydata.getTodayBookings = async function () {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const date_splitted = date.split("-");

    /*EACH PART OF THE FULL DATE*/
    const currentMonth = ("0" + (parseInt(date_splitted[1]))).slice(-2);
    const currentDay = ("0" + (parseInt(date_splitted[2]))).slice(-2);
    const currentYear = date_splitted[0];
    /*EACH PART OF THE FULL DATE*/
    
    //ASSEMBLED TIME AND DATE
    const currentDate = currentYear + "-" + currentMonth + "-" + currentDay;

    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ?', [currentDate]);
    return bookings;
}
    mydata.getAllBookings  = async function () {
        const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha');
        return bookings;
    }

//When the date_booking and the start_booking are equal, it means that the booking is active.
mydata.isActiveBooking = async function (booking) {
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ? AND start_booking = ? AND end_booking = ?', [booking.date_booking, booking.start_booking, booking.end_booking]);
    if(bookings.length > 0) {
        return true;
    } else {
        return false;
    }
}
mydata.count = async function () {
    const count = await pool.query('SELECT COUNT(*) AS count FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha');
    return count[0].count;
}

module.exports = mydata;