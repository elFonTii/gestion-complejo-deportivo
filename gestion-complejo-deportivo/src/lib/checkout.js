const mercadopago = require('mercadopago');
const checkout = {}
/* DEPRECATED */
/* DEPRECATED */
/* DEPRECATED */
/* DEPRECATED */
/*
CHECKOUT MODULE: Módulo que realiza la implementación con Mercado pago.

createProduct: Obtiene el titulo y precio por parámetro y retorna el producto.
*/
checkout.createProduct = function (title, price) {
  let item = {
    items: [
      {
        title: 'Reserva de cancha - ' + title,
        unit_price: price,
        quantity: 1,

        back_urls: {
          "success": "/bookings",
          "failure": "/bookings/new/badcheckout",
          "pending": "/bookings/new/pending"
        },
        auto_return: 'approved',
      }
    ]
  };
  return item;
}

module.exports = checkout;