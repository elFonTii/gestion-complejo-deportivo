const express = require('express');
const { isLoggedIn, isAdmin } = require('../lib/auth');
const pool = require('../database');
const router = express.Router();

/* MOSTRAR LOS SERVICIOS */
router.get('/', isLoggedIn, async (req, res) => {
    const services = await pool.query('SELECT * FROM service INNER JOIN service_type ON service.service_type = service_type.service_type_id');
    const quantity = services.length;
    res.render('services/list', {services, quantity});
});

router.get('/add', isAdmin, async (req, res) => {
    const service_type = await pool.query('SELECT * FROM service_type');
    res.render('services/add', {service_type});
});

router.post('/add', isAdmin, async (req, res) => {
    const {service_name, service_price, service_description, type} = req.body;

    //Verify the type of service
    if(type === 'Mensual'){
        const newService = {
            service_name,
            service_price,
            service_description,
            service_type: 1,
        };
        await pool.query('INSERT INTO service SET ?', newService);
        req.flash('success', 'Servicio agregado exitosamente');
        res.redirect('/services');
    } else if(type === 'Anual'){
        const newService = {
            service_name,
            service_price,
            service_description,
            service_type: 2,
        };
        await pool.query('INSERT INTO service SET ?', newService);
        req.flash('success', 'Servicio agregado exitosamente');
        res.redirect('/services');
    } else{
        req.flash('message', 'Servicio no valido');
        res.redirect('/services/add');
    }


});

/*SERVICE ADD SUBSCRIPTION (USER)*/
router.get('/subscription/:service_id', isLoggedIn, async (req, res) => {
    const service_id = req.params.service_id;
    const username = req.user.username;
    const service = await pool.query('SELECT * FROM service INNER JOIN service_type ON service.service_type = service_type.service_type_id WHERE service_id = ?', service_id);
    res.render('services/confirm', {service});
});

module.exports = router;