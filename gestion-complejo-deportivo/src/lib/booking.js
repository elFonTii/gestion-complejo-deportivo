const pool = require('../database');
const { normalizeDate, normalizeHour } = require('../lib/mydata_api');

module.exports = class Booking {
    constructor(date_booking, start_booking, cancha, user) {
        const endNormalized = (parseInt(start_booking) + 1 + ':00').toString();
        this.date_booking = date_booking;
        this.start_booking = normalizeHour(start_booking);
        this.end_booking = normalizeHour(endNormalized);
        this.cancha = cancha;
        this.user = user;
    }

    async insert() {
        const query = `INSERT INTO booking (date_booking, start_booking, end_booking, cancha, user) VALUES (?, ?, ?, ?, ?)`;
        const values = [this.date_booking, this.start_booking, this.end_booking, this.cancha, this.user];
        await pool.query(query, values);
    }

    isValid(){ 
        const actual_hour = new Date().getHours + ':00';

        if(this.date_booking < normalizeDate(new Date())){
            return false;
        } else {
            if(this.start_booking < normalizeHour(actual_hour)){
                return false;
            } else {
                return true;
            }
        }
    }

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

    isInDate() {
        const diff = new Date().getTime() - new Date(this.date_booking).getTime();

        if(diff <= 0){
            return true;
        } else {
            return false;
        }
    }
};