// const express = require('express');

/*
    Rutas de Usuarios /Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


const { crearUsuario, loginUsuario ,revelarToken } = require('../controllers/auth')



router.post(
    '/new',
    [      //Middlewares 
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength( { min: 6} ),
        validarCampos
    ] ,
    crearUsuario);

router.post('/'
    ,[
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength( {min: 6 }),
        validarCampos
     ] 
    ,loginUsuario);


router.get('/renew', revelarToken);


module.exports = router;