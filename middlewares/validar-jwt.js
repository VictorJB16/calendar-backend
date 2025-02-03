const { response } = require ('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res=response, next ) => {
    // x-token headers , asi va a ser el token que se envia en la peticion

    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se encontro el token'
        });
    }

    try {
        
        const {uid , name } = jwt.verify( token , process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;

        
    } catch( error ){
        return res.status(401).json({
            ok: false,
            msg: 'El token no es valido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}