const { response } = require('express');
const Evento = require('../models/Evento');

const crearEvent = async (req,res= response) => {
  
    const evento = new Evento( req.body );

    try {

        evento.user = req.uid
        const eventoGuardado = await evento.save();   

        res.json({
            ok : true,
            evento : eventoGuardado
        })
        } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        return;
    }

}

const getEvent = (req,res) => {

    res.json({
        ok: true,
        msg: 'getEvents'
    });

}

const deleteEvent = (req,res) => {

    res.json({
        ok: true,
        msg: 'deleteEvents'
    });

}

const updateEvent= (req,res) => {

    res.json({
        ok: true,
        msg: 'updateEvents'
    });

}

module.exports = {
    crearEvent,
    getEvent,
    deleteEvent,
    updateEvent
}