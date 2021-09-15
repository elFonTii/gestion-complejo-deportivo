const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isAdmin } = require('../lib/auth');

//registrar un complejo
router.get('/register', isAdmin , (req, res) => {
    res.render('complejo/register');
});

router.post('/register', isAdmin , async (req, res) => {
    const { nombre_complejo, informacion_complejo, direccion_complejo, correo_complejo, telefono_complejo } = req.body;
    const newComplejo = {
        nombre_complejo,
        informacion_complejo,
        direccion_complejo,
        correo_complejo,
        telefono_complejo
    };
    const complejos = await pool.query('SELECT * FROM complejo');
    if(complejos.length > 0){
        req.flash('message', 'El complejo ya está registrado');
        res.redirect('/dashboard');
    }else{
        await pool.query('INSERT INTO complejo SET ?', [newComplejo]);
        req.flash('success', 'Complejo registrado.')
        res.redirect('/complejo/register');
    }
});

//editar complejo
router.get('/edit', isAdmin , (req, res) =>{
    res.render('complejo/edit');
});

router.post('/edit', isAdmin ,async (req, res) =>{
    const { nombre_complejo, informacion_complejo, direccion_complejo, correo_complejo, telefono_complejo } = req.body;
    const updateComplejo = {
        nombre_complejo,
        informacion_complejo,
        direccion_complejo,
        correo_complejo,
        telefono_complejo
    };
    await pool.query('UPDATE complejo SET ?', [updateComplejo]);
        req.flash('success', 'Complejo actualizado.')
        res.redirect('/dashboard');
});

module.exports = router;