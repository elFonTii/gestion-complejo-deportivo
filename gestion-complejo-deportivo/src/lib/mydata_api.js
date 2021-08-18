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

    console.log(endTime);

    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ? AND start_booking = ?', [currentDate, currentTime]);

    if(bookings.length > 0) {
        return bookings;
    } else {
        return null;
    }
}

module.exports = mydata;