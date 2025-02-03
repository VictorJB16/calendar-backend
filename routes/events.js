//TODO: CRUD: Eventos
// /api/events
// todos los metodos de CRUD para eventos tiene que ser validados por jwt


const { Router } = require( 'express' );
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearEvent, getEvent, deleteEvent, updateEvent } = require('../controllers/events');

const router = Router();
//esto nos dice que cualquier peticion que se haga apartir de esta linea debe tener el token
router.use( validarJWT ); 

router.get( '/', getEvent );

router.post('/new', crearEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);


module.exports = router;

