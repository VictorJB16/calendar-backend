const { response } = require('express'); 
const { validationResult } = require('express-validator');

// el next es para pasar el control al siguiente middleware

const validarCampos = ( req, res = response, next ) => {

    const errors = validationResult( req ); 

    if ( !errors.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        });
    };
    
    next();
}

module.exports = {
    validarCampos,
        
}
