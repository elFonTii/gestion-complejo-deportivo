const five = require('johnny-five');
const { EtherPortClient } = require('etherport-client');
const log = require('./log');

//Creamos un objeto con las funciones que contendrá las funciones de la api programada.
const felino = {}

/*
  Felino API: Es una api que realiza conexiones con placas arduino, puede enviar y recibir
  información por puerto y también mediante el protocolo http/https.

  DEPENDENCIAS: JHONNY-FIVE - ETHERPORT-CLIENT
*/
// felino.test makes a test to the board
felino.test = function(arduino){
    arduino = new five.Board();
    arduino.on('ready', function() {
        console.log('La placa responde correctamente.');
    });
    arduino.on('error', function(err) {
        console.log('Arduino error: ' + err.message);
    });
}

//Init a new board
felino.init = function(){
    return new five.Board();
}
//felino.print prints a message on an arduino board
felino.print = function(arduino, type, msg){
    arduino.on('ready', function() {
            lcd = new five.LCD({
            controller: "PCF8574",
            rows: 4,
            cols: 20,
          });
          if(type == 'error'){
            return lcd.print('null - error');
          } else if(type == 'booking'){
            return lcd.print('Reserva creada por: '+msg);
          } else if(type == 'current'){
            return lcd.print('Reserva actual: '+msg);
          } else{
            return lcd.print(msg);
          }
    });
}

//felino.led turns on, off or blink a led
felino.led = function(arduino, type, secs, pin){
  arduino.on('ready', function() {
    const led = new five.LCD(pin)
    if(type == 'blink'){
      led.blink(secs);
    } else if(type == 'on'){
      led.on();
    } else if(type == 'off'){
      led.off();
    }
  });
}

//felino.remote return a remote connection trougth etherport
felino.remote = function(host, port){
  const board = new five.Board({
    port: new EtherPortClient({
      host: host,
      port: port
    })
  });
  return board;
}



module.exports = felino;