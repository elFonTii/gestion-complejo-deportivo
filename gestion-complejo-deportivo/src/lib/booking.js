const pool = require('../database');
const { normalizeDate, normalizeHour } = require('../lib/mydata_api');

module.exports = class Booking {
    //BUILDER OF THE CLASS
    constructor(date_booking, start_booking, cancha, user) {
        const endNormalized = (parseInt(start_booking) + 1 + ':00').toString();
        this.date_booking = date_booking;
        this.start_booking = normalizeHour(start_booking);
        this.end_booking = normalizeHour(endNormalized);
        this.cancha = cancha;
        this.user = user;
    }


    //INSERT THE BOOKING INTO THE DATABASE
    async insert() {
        const query = `INSERT INTO booking (date_booking, start_booking, end_booking, cancha, user) VALUES (?, ?, ?, ?, ?)`;
        const values = [this.date_booking, this.start_booking, this.end_booking, this.cancha, this.user];
        await pool.query(query, values);
    }

    //CHECK IF THE BOOKING IS AVAILABLE
    async isBusy(){
        //Select count of booking in the same time
        const query = `SELECT count(*) as count FROM booking WHERE date_booking = ? AND start_booking = ? AND end_booking = ? AND cancha = ?`;
        const values = [this.date_booking, this.start_booking, this.end_booking, this.cancha];
        const result = await pool.query(query, values);
        if(result[0].count > 0){
            return true;
        } else {
            return false;
        }
    }
};