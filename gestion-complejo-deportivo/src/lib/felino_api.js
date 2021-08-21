const five = require('johnny-five');
const { EtherPortClient } = require('etherport-client');
const log = require('./log');

//Creamos un objeto con las funciones que contendrá las funciones de la api programada.
const felino = {}
// arduino.test realiza una prueba de funcionamiento de la placa arduino.
felino.test = function(arduino){
    arduino = new five.Board();
    arduino.on('ready', function() {
        console.log('La placa responde correctamente.');
    });
    arduino.on('error', function(err) {
        console.log('Arduino error: ' + err.message);
    });
}
felino.init = function(){
    return new five.Board();
}
//arduino.print imprime un mensaje en la pantalla LCD conectada
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

felino.lcd = function(arduino, type, secs, pin){
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

/*
  var lcd = new five.LCD({
    controller: "PCF8574",
    rows: 4,
    cols: 20,
  });
*/