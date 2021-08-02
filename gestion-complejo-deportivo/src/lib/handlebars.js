const { format, register } = require('timeago.js');


const helpers = {};


const spanish = (number, index, total_sec) => {
    return [
      ['Ahora mismo', 'right now'],
      ['Hace %s segundos', 'in %s seconds'],
      ['Hace 1 minuto', 'in 1 minute'],
      ['Hace %s minutos', 'in %s minutes'],
      ['Hace 1 hora', 'in 1 hour'],
      ['Hace %s horas', 'in %s hours'],
      ['Hace 1 dia', 'in 1 day'],
      ['Hace %s dias', 'in %s days'],
      ['Hace 1 semana', 'in 1 week'],
      ['Hace %s semanas', 'in %s weeks'],
      ['Hace 1 mes', 'in 1 month'],
      ['Hace %s meses', 'in %s months'],
      ['Hace 1 año', 'in 1 year'],
      ['Hace %s años', 'in %s years']
    ][index];
  };
  // register your locale with timeago
  register('es_ES', spanish);

helpers.timeago = (fecha) => {
    return format(fecha, 'es_ES');
};
module.exports = helpers;