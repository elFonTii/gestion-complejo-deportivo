const log = require('./log');
const pool = require('../database');

const mydata = {};
/*Normaliza la fecha para ser legible y almacenarla en la base de datos*/
mydata.normalizeDate = function (date) {
    const date01 = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const date_splitted = date01.split("-");

    /*EACH PART OF THE FULL DATE*/
    const currentMonth = ("0" + (parseInt(date_splitted[1]))).slice(-2);
    const currentDay = ("0" + (parseInt(date_splitted[2]))).slice(-2);
    const currentYear = date_splitted[0];
    /*EACH PART OF THE FULL DATE*/

    const normalizedDate = currentYear + "-" + currentMonth + "-" + currentDay;

    return normalizedDate;
}
/*Devuelve la diferencia entre dos fechas*/
mydata.getDifference = function (start, end) {
    //The start and end are in the format HH:MM.
    const start_splitted = start.split(":");
    const end_splitted = end.split(":");

    const start_hour = parseInt(start_splitted[0]);
    const start_minute = parseInt(start_splitted[1]);

    const end_hour = parseInt(end_splitted[0]);
    const end_minute = parseInt(end_splitted[1]);

    const difference = end_hour - start_hour;
    const difference_minute = end_minute - start_minute;

    const difference_hour = difference + (difference_minute / 60);

    return difference_hour;
}
/*Normaliza la hora a una hora legible para poder mostrarla y almacenarla en la base de datos*/
mydata.normalizeHour = function (hour) {
    const split = hour.split(":");
    const hour_splitted = split[0];
    const minute_splitted = split[1];

    const slice_hour = ("0" + (parseInt(hour_splitted))).slice(-2);
    const slice_minute = ("0" + (parseInt(minute_splitted))).slice(-2);

    const normalizedHour = slice_hour + ":" + '00';

    return normalizedHour;
}

mydata.getCurrentYear = function () {
    const currentYear = new Date().getFullYear();
    return currentYear;
}
/*
Devuelve solo el mes actual
*/
mydata.getCurrentMonth = function () {
    const currentMonth = new Date().getMonth() + 1;

    const slice = ("0" + currentMonth).slice(-2);
    return slice;
}
/*
Devuelve solo el día actual
*/
mydata.getCurrentDay = function () {
    const currentDay = new Date().getDate();

    const slice = ("0" + currentDay).slice(-2);
    return slice;
}
/*
Devuelve la fecha actual
*/
mydata.getCurrentDate = function () {
    const today = new Date();
    const currentDate = this.normalizeDate(today);
    return currentDate;
}

/*
Devuelve reservas que estan siendo ejecutadas en este momento
*/
mydata.get = async function () {
    const today = new Date();
    const currentDate = this.normalizeDate(today);
    const currentTime = this.normalizeHour(today.getHours() + ":" + today.getMinutes());

    //END OF THE BOOKING IS ONE HOUR AFTER THE CURRENT TIME.
    const endDate = new Date();
    endDate.setHours(today.getHours() + 1);
    const endTime = ("0" + endDate.getHours()).slice(-2) + ":" + ("0" + endDate.getMinutes()).slice(-2);
    
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ? AND start_booking = ? AND end_booking = ?', [currentDate, currentTime, endTime]);

    if(bookings.length > 0) {
        return bookings;
    } else {
        return null;
    }
}

/*Devuelve todas las reservas que son de este dia, sin importar si están siendo ejecutadas*/
mydata.getTodayBookings = async function (limit) {
    const today = new Date();
    const currentDate = this.normalizeDate(today);
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ? LIMIT ?', [currentDate, limit]);
    return bookings;
}
/*Devuelve el conteo de reservas que son de este dia.*/
mydata.getTodayBookingsCount = async function () {
    const today = new Date();
    const currentDate = this.normalizeDate(today);
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ?', [currentDate]);
    return bookings.length;
}

/*Devuelve todas las reservas, sin importar el dia ni si han sido ejecutadas o no */
mydata.getAllBookings  = async function () {
        const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha');
        return bookings;
}

/*Solicita una reserva por parámetro y devuelve un verdadero o falso en caso de si la reserva está siendo ejecutada en este momento*/
mydata.isActiveBooking = async function (booking) {
    //Cuando la fecha, y la hora de la reserva son iguales a la hora y fecha actual entonces la reserva es activa.
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ? AND start_booking = ? AND end_booking = ?', [booking.date_booking, booking.start_booking, booking.end_booking]);
    if(bookings.length > 0) {
        return true;
    } else {
        return false;
    }
}

/*Devuelve un int con la cantidad de reservas que están activas*/
mydata.activeCount = async function () {
    const currentTime = new Date().getHours() + ":" + new Date().getMinutes();
    const count = await pool.query('SELECT COUNT(*) AS count FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE start_booking = ?', [currentTime]);
    return count[0].count;
}

/*Solicita una reserva por parámetro y devuelve verdadero o falso si la reserva está siendo ejecutada en este momento*/
mydata.isBusy = async function (booking) {
    //Verify if exists other booking with the same date and time.
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ? AND start_booking = ? AND end_booking = ?', [booking.date_booking, booking.start_booking, booking.end_booking]);
    if(bookings.length > 0) {
        return true;
    } else {
        return false;
    }
}

/*Devuelve el conteo de usuarios registrados en el programa*/
mydata.userCount = async function (){
    const count = await pool.query('SELECT COUNT(*) AS user_count FROM users');
    return count[0].user_count;
};

/*Devuelve un conteo de las reservas*/
mydata.bookingsCount = async function (){
    const count = await pool.query('SELECT COUNT(*) AS booking_count FROM booking');
    return count[0].booking_count;
};


/*Devuelve un conteo de las canchas*/
mydata.canchasCount = async function (){
    const count = await pool.query('SELECT COUNT(*) AS cancha_count FROM cancha');
    return count[0].cancha_count;
};

/*Devuelve un promedio de reservas por mes*/
mydata.getAverageBookingMonth = async function () {
    const currentMonth = this.getCurrentMonth();
    const bookings = await pool.query('SELECT COUNT(*) AS count FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ?', [currentMonth]);
    const average = bookings[0].count / currentMonth;
    return average;
};

/*Devuelve un promedio de reservas por año*/
mydata.getAverageBookingYear = async function () {
    const currentYear = this.getCurrentYear();
    const bookings = await pool.query('SELECT COUNT(*) AS count FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ?', [currentYear]);
    const average = bookings[0].count / currentYear;
    return average;
};

/*Solicita una fecha por parámetro y devuelve el conteo de reservas para esa fecha*/
mydata.getByDate = async function (date) {
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ?', [date]);
    return bookings;
}

/*Solicita una fecha por parámetro y devuelve el conteo de reservas para esa fecha*/
mydata.getCountByDate = async function (date) {
    const timestamp = new Date(date);
    const normalizedTimestamp = this.normalizeDate(timestamp);
    console.log(normalizedTimestamp);
    const bookings = await pool.query('SELECT COUNT(*) AS count FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ?', [normalizedTimestamp]);
    return bookings[0].count;
}

/*
Obtiene una reserva por parámetro y devuelve si la fecha de la reserva es una fecha válida
es decir, que está a futuro.
*/
mydata.isFuture = function (booking) {
    const today = new Date();
    const currentDate = this.normalizeDate(today);
    if(booking.date_booking >= currentDate) {
        return true;
    } else {
        return false;
    }
}

/*
Obtiene una reserva por parámetro y verifica si la hora de la reserva es válida
es decir, que la hora no ha pasado.
*/
mydata.isFutureTime = function (booking) {
    const currentTime = new Date().getHours() + ":" + new Date().getMinutes();
    const normalizedHour = this.normalizeHour(currentTime);
    if(booking.start_booking >= normalizedHour) {
        return true;
    } else {
        return false;
    }
}

/*
Obtiene la reserva por parámetro y setea la hora en la que finaliza.
*/
//TO DO: Pasar la hora por parámetro
mydata.setEndTime = function (booking) {
    const startTime = booking.start_booking + ':00';
    //Add 2 hours to the start time to get the end time.
    const endTime = parseInt(startTime[0]) + 1 + ":" + '00';
    const normalizedEndTime = this.normalizeHour(endTime);
    booking.end_booking = normalizedEndTime;

    return booking;
}

mydata.isAvailable = async function (booking) {
    //The end of the booking is 2 hours after the start of the booking.
    //The booking is available if theres no other booking runing in the same time.
    //To know if theres a booking runing in the same time, we need to check the difference between the start and end time of the selected booking.
    //If the difference is less than 2 hours, theres a booking running in the same time.
    const startTime = booking.start_booking.split(':');
    const endTime = parseInt(startTime[0]) + 1 + ":" + startTime[1];
    const normalizedEndTime = this.normalizeHour(endTime);
    const normalizedStartTime = this.normalizeHour(booking.start_booking);
    const difference = this.getDifference(normalizedStartTime, normalizedEndTime);
    if(difference < 2) {
        return false;
    } else {
        const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ? AND start_booking = ? AND end_booking = ?', [booking.date_booking, booking.start_booking, booking.end_booking]);
        if(bookings.length > 0) {
            return false;
        } else {
            return true;
        }
    }
}

mydata.setUserProminent = async function (username) {
    //User is prominent if the number of bookings is greater than 3.
    const bookings = await pool.query('SELECT * FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE user = ?', [username]);
    if(bookings.length >= 3) {
        //Alter the user table and set the user as prominent.
        await pool.query('UPDATE users SET isProminent = 1 WHERE username = ?', [username]);
        return true;
    } else{
        //Alter the user table and set the user as not prominent.
        await pool.query('UPDATE users SET isProminent = 0 WHERE username = ?', [username]);
        return false;
    }
}

mydata.getAllProminentUsers = async function () {
    const users = await pool.query('SELECT * FROM users WHERE isProminent = 1');
    return users;
}

mydata.getBookingCountByUser = async function (username) {
    const bookings = await pool.query('SELECT COUNT(*) as count FROM booking WHERE user = ?', [username]);
    return bookings[0].count;
}

mydata.getBookingsPerMonthByUser = async function (username) {
    //Get the current month.
    const currentDate = this.getCurrentDate();
    const currentMonth = this.getCurrentMonth();
    const bookings = await pool.query('SELECT COUNT(*) as count FROM booking WHERE user = ? AND date_booking = ?', [username, currentMonth]);
    return bookings[0].count;
}

mydata.administration = {}

mydata.administration.gainsPerDay = async function () {
    const gains = await pool.query('SELECT SUM(price) AS total_gains FROM booking INNER JOIN cancha ON booking.cancha = cancha.id_cancha WHERE date_booking = ?', [mydata.getCurrentDate()]);
    return gains[0].total_gains;
}

mydata.administration.userRegisteredTodayCount = async function () {
    const currentDate = mydata.getCurrentDate();
    const count = await pool.query('SELECT COUNT(*) AS registered_today FROM users WHERE created_at = ?', [currentDate]);
    return count[0].registered_today;
}

mydata.administration.usersCount = async function () {
    const count = await pool.query('SELECT COUNT(*) AS registered_users FROM users');
    return count[0].registered_users;
}
module.exports = mydata;