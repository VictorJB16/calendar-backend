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

const getEvent = async (req,res = response) => {

    const eventos = await Evento.find()
    .populate('user', 'name');    

    res.json({
        ok: true,
        eventos
    });

}

const updateEvent= async (req,res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );
        if (!evento){
            res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese id'
            });
        }

        if ( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.json({
            ok: true,
            evento: eventoActualizado
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteEvent = async (req,res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );
        if (!evento){
            res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese id'
            });
        }

        if ( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });
        }


        await Evento.findByIdAndDelete( eventoId );

        res.json({ ok: true }) 
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    crearEvent,
    getEvent,
    deleteEvent,
    updateEvent
}