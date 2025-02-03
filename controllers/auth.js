const {response} = require('express');
const { validationResult } = require('express-validator');
const  Usuario  = require('../models/Usuario');
// el response que viene de express es para que el intelisense funcione bien y guarde el tipo de respuesta
const crearUsuario = async ( req,res = response ) => {

    const { name, email, password } = req.body; 
    // se valida pregutando si el emial esta registrado y si lo esta tira un error 
    // si no lo esta se crea el usuario 
    try {
        let usuario = await Usuario.findOne( { email} );
        if ( usuario ){
            return res.status( 400 ).json( {
                ok: false,
                msg: 'El email ya esta registrado'
            });
        }
        // se crea el usuario
        usuario = new Usuario( { name, email, password } );  
        await usuario.save();
        // se guarda el usuario en la base de datos y se retorna el json con los datos del usuario
        res.status(201).json({
        ok: true,
        uid: usuario._id,
        name: usuario.name,
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: 'Por favor hable con el administrador',
    });
    }
};
const loginUsuario = ( req,res = response )=> {
    
    const {  email, password } = req.body; 

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
}; 

const revelarToken =  ( req,res = response )=> {

    res.json({
        ok: true,
        msg: 'renew'
    });
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revelarToken

}