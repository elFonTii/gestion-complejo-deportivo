const { format, register } = require('timeago.js');
const pool = require('../database');
const notis = require('../lib/notifications');
const handlebars = require('handlebars');

const helpers = {};
/*
  REGISTRO DE HELPERS HANDLEBARS
  
  Son utiles para implementar funciones en el front-end
*/

helpers.isAdmin = (rol) => {
    //Verificar si el usuario es administrador.
    return rol == '1';
};

helpers.isMan = (gen) => {
  //Verificar si el usuario es administrador.
  return gen == '1';
};

helpers.isGirl = (gen) => {
  //Verificar si el usuario es administrador.
  return gen == '2';
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


helpers.ifCond = (v1, operator, v2, options) => {
  switch (operator) {
      case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
          return options.inverse(this);
  }
}
helpers.discount = (discount, amount) => {
    return discount += amount;
}

helpers.getNotis = async() => {
  const notifications = await notis.get();
  return notifications;
}

const spanish = (number, index, total_sec) => {
    return [
      ['Ahora mismo', 'Ahora mismo'],
      ['Hace %s segundos', 'En %s segundos'],
      ['Hace 1 minuto', 'En 1 minuto'],
      ['Hace %s minutos', 'En %s minutos'],
      ['Hace 1 hora', 'En 1 hora'],
      ['Hace %s horas', 'En %s horas'],
      ['Hace 1 d??a', 'En 1 d??a'],
      ['Hace %s dias', 'En %s d??as'],
      ['Hace 1 semana', 'En 1 semana'],
      ['Hace %s semanas', 'En %s semanas'],
      ['Hace 1 mes', 'En 1 mes'],
      ['Hace %s meses', 'En %s meses'],
      ['Hace 1 a??o', 'En 1 a??o'],
      ['Hace %s a??os', 'En %s a??os']
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

handlebars.registerHelper('ifCond', helpers.ifCond);
module.exports = helpers;