const express = require('express');
const { isLoggedIn, isAdmin } = require('../lib/auth');
const pool = require('../database');
const router = express.Router();
const verificator = require('ciuy');

/* MOSTRAR LOS SERVICIOS */
router.get('/', isLoggedIn, async (req, res) => {
    const services = await pool.query('SELECT * FROM service INNER JOIN service_type ON service.service_type = service_type.service_type_id');
    const quantity = services.length;
    res.render('services/list', { services, quantity });
});

//RENDER ADD SERVICE FORM
router.get('/add', isAdmin, async (req, res) => {
    const service_type = await pool.query('SELECT * FROM service_type');
    res.render('services/add', { service_type });
});

//ADD SERVICE
router.post('/add', isAdmin, async (req, res) => {
    const { service_name, service_price, service_description, type } = req.body;

    //Verify the type of service
    if (type === 'Mensual') {
        const newService = {
            service_name,
            service_price,
            service_description,
            service_type: 1,
        };
        await pool.query('INSERT INTO service SET ?', newService);
        req.flash('success', 'Servicio agregado exitosamente');
        res.redirect('/services');
    } else if (type === 'Anual') {
        const newService = {
            service_name,
            service_price,
            service_description,
            service_type: 2,
        };
        await pool.query('INSERT INTO service SET ?', newService);
        req.flash('success', 'Servicio agregado exitosamente');
        res.redirect('/services');
    } else {
        req.flash('message', 'Servicio no valido');
        res.redirect('/services/add');
    }

});

/*RENDER SUBSCRIPTION OF A SERVICE FORM*/
router.get('/subscription/:service_id', isLoggedIn, async (req, res) => {
    const service_id = req.params.service_id;
    const username = req.user.username;
    const service = await pool.query('SELECT * FROM service INNER JOIN service_type ON service.service_type = service_type.service_type_id WHERE service_id = ?', service_id);
    res.render('services/confirm', { service });
});

// SUBMIT SUBSCRIPTION OF A SERVICE
router.post('/subscription/:service_id', isLoggedIn, async (req, res) => {
    const subscription = req.params.service_id;
    console.log(subscription);
    const owner = req.user.username;
    const { ass_name, ass_surname, asociated_ci, ass_email, ass_dir1, ass_dir2 } = req.body;
    const startDate = new Date();

    //Creamos una nueva suscripci??n
    const newSubscription = {
        owner,
        ass_name,
        ass_surname,
        asociated_ci,
        ass_email,
        ass_dir1,
        ass_dir2,
        subscription,
        startDate
    }

    var isValidCI = verificator.validateIdentificationNumber(asociated_ci);

    if (!isValidCI) {
        req.flash('message', 'La c??dula no es v??lida.');
        res.redirect('/services/subscription/' + subscription);
    } else {
        //Verificamos si existe una suscripcion a ese servicio (de el usuario logeado)
        const isSubscribed = await pool.query('SELECT * FROM suscripcion WHERE owner = ? AND subscription = ?', [owner, subscription]);

        if (isSubscribed.length == 0) {
            await pool.query('INSERT INTO suscripcion SET ?', newSubscription);
            req.flash('success', 'Tu suscripci??n ha sido agregada exitosamente');
            res.redirect('/subscriptions');
        } else {
            req.flash('message', 'Ya tienes una suscripci??n activa a este servicio');
            res.redirect('/services');
        }
    }
});

//EDIT AND SEE ALL THE SERVICES AVALIABLE
router.get('/', isLoggedIn, async (req, res) => {
    const services = await pool.query('SELECT * FROM service INNER JOIN service_type ON service.service_type = service_type.service_type_id');
    const quantity = services.length;
    res.render('services/list', { services, quantity });
});

//RENDER EDIT SERVICE FORM
router.get('/edit/:id', isAdmin, async (req, res) => {
    const id = req.params.id;
    var service = await pool.query('SELECT * FROM service WHERE service_id = ?', [id]);
    service = service[0];
    const service_type = await pool.query('SELECT * FROM service_type');
    res.render('services/edit', { service, service_type });
});


//EDIT SERVICE
router.post('/edit/:id', isAdmin, async (req, res) => {
    const id = req.params.id;
    const { service_name, service_price, service_description, type } = req.body;

    //Verify the type of service
    if (type === 'Mensual') {
        const updateService = {
            service_name,
            service_price,
            service_description,
            service_type: 1,
        };
        await pool.query('UPDATE service SET ? WHERE service_id = ?', [updateService, id]);
        req.flash('success', 'Servicio actualizado');
        res.redirect('/services');
    } else if (type === 'Anual') {
        const updateService = {
            service_name,
            service_price,
            service_description,
            service_type: 2,
        };
        await pool.query('UPDATE service SET ? WHERE service_id = ?', [updateService, id]);
        req.flash('success', 'Servicio actualizado.');
        res.redirect('/services');
    }
});

//DELETE SERVICE CALLBACK
router.get('/delete/:service_id', isAdmin, async (req, res) => {
    const service_id = req.params.service_id;
    await pool.query('DELETE FROM service WHERE service_id = ?', [service_id]);
    req.flash('success', 'Servicio eliminado correctamente');
    res.redirect('/services');
});

module.exports = router;