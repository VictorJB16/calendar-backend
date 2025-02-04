//TODO: CRUD: Eventos
// /api/events
// todos los metodos de CRUD para eventos tiene que ser validados por jwt


const { Router } = require( 'express' );
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearEvent, getEvent, deleteEvent, updateEvent } = require('../controllers/events');

const router = Router();
//esto nos dice que cualquier peticion que se haga apartir de esta linea debe tener el token
router.use( validarJWT ); 

router.get( '/', getEvent );

router.post('/new',
    [
        check('title', 'El titullo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de fin es obligatoria').custom( isDate ),
        validarCampos
     ], 
    crearEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router;

