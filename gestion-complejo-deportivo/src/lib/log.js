const dbdata = require('./mydata_api');
const log  = {}

/*
    The log module exports the log object, which contains the error, warn and arduino functions.
*/


log.message = function(msg) {
  console.log("\x1b[35m", msg)
}

log.error = function(err, msg) {
    console.log("\x1b[31m", err, "\x1b[0m", msg);
}

log.warn = function(err, msg) {
    console.log("\x1b[33m", err, "\x1b[0m", msg);
}

log.arduino = function(host, port) {
    console.log("\x1b[36m", "Arduino connected to:", host, ":", port, "\x1b[0m");
}

log.actives =  async function() {
    const actives = await dbdata.activeCount();
    console.log("\x1b[36m", actives, "\x1b[0m", " Reservas activas");
}

module.exports = log;