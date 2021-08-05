const mercadopago = require('mercadopago');
const checkout = {}

//Function to create a new product
checkout.createProduct = function(title, price) {
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