const moment = require('moment');

const isDate = ( value, { req, location, path } ) => {
    
    if (  !value ) { //si no existe el valor returna un false 
        return false;// esto le dice al exprress-validator que si regresa false ese campo no es correcto
    }

    const date = moment( value );
    if( date.isValid() ) { 
        return true;
    } else {
        return false;
    }


}


module.exports = { isDate };