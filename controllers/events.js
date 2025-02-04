

const crearEvent = (req,res) => {
    //verificar que tenga el evento 
    console.log(req.body);

    res.json({
        ok: true,
        msg: 'crearEvent'
    });

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