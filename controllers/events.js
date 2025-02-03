

const crearEvent = (req,res) => {

    res.json({
        ok: true,
        msg: 'Evento creado'
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