const {response} = require('express');
const { generarJWT } = require('../helpers/jwt');
const  Usuario  = require('../models/Usuario');
const bcrypt = require('bcryptjs');


// el response que viene de express es para que el intelisense funcione bien y guarde el tipo de respuesta
const crearUsuario = async ( req,res = response ) => {

    const { email, password } = req.body; 
    
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
        usuario = new Usuario( req.body);  
        
        //encriptar la contraseña , usa 10 por defecto
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
        // se guarda el usuario en la base de datos y se retorna el json con los datos del usuario

        //Generar el token
        const token = await generarJWT( usuario._id, usuario.name ); 
        
        res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
};
const loginUsuario = async ( req,res = response )=> {
    
    const {  email, password } = req.body; 
    
    try {
        
        const usuario = await Usuario.findOne( { email} );
        if (!usuario ){
            return res.status( 400 ).json({
                ok: false,
                msg: 'El email no existe'
            });
        }
        //confirmar la contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password );
        
        if( !validPassword){
            return res.status( 400 ).json({
                ok: false,
                msg: 'La contraseña no es correcta'
            });
        }
        
        //Generar el token
        const token = await generarJWT( usuario._id, usuario.name ); 

        res.json( {
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        });

    }catch (error) { 
        console.log(error);
        res.status(500).json( {
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }

}; 

const revalidarToken = async ( req,res = response )=> {

    const { uid, name} = req;

    //generar un nuevo token

    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}