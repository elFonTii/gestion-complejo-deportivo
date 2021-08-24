const { format, register } = require('timeago.js');
const pool = require('../database');


//notificationQuery es un metodo que recibe un usuario y retorna una promesa de JavaScript.
// Fue necesario implementarlo de esta manera debido a que el método pool.query es asíncrono
// y no retornaba a tiempo el resultado de la consulta, dando como resultado un error.
// Por medio de la promesa esperamos a que la consulta se ejecute y luego retornamos el resultado.

const helpers = {};

helpers.isAdmin = (rol) => {
    //Verificar si el usuario es administrador.
    return rol == '1';
};

helpers.isActiveBooking = (value) => {
    return value == true;
};

helpers.isInactiveBooking = (value) => {
  return value == false;
};

helpers.isUser = (rol) => {
    //Verificar si es un usuario simple.
    return rol == '2';
};

  helpers.discount = (discount, amount) => {
    return discount += amount;
}

const spanish = (number, index, total_sec) => {
    return [
      ['Ahora mismo', 'Ahora mismo'],
      ['Hace %s segundos', 'En %s segundos'],
      ['Hace 1 minuto', 'En 1 minuto'],
      ['Hace %s minutos', 'En %s minutos'],
      ['Hace 1 hora', 'En 1 hora'],
      ['Hace %s horas', 'En %s horas'],
      ['Hace 1 día', 'En 1 día'],
      ['Hace %s dias', 'En %s días'],
      ['Hace 1 semana', 'En 1 semana'],
      ['Hace %s semanas', 'En %s semanas'],
      ['Hace 1 mes', 'En 1 mes'],
      ['Hace %s meses', 'En %s meses'],
      ['Hace 1 año', 'En 1 año'],
      ['Hace %s años', 'En %s años']
    ][index];
  };
  // register your locale with timeago
  register('es_ES', spanish);

helpers.timeago = (fecha) => {
    return format(fecha, 'es_ES');
};

helpers.timeagohour = (fecha, hour) => {
    return format(fecha+' '+hour+':00', 'es_ES');
}

helpers.dateNormalized = (fecha) => {
  const date = fecha.split('-');
  return date[2]+'/'+date[1]+'/'+date[0];
}
module.exports = helpers;