const { format } = require('timeago.js');


const helpers = {};

helpers.timeago = (fecha) => {
    return format(fecha);
};
module.exports = helpers;