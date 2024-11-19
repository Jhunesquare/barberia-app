const {db} = require("../firebase");

const scheduleService = async (req, res) =>{

    const { idClientes, idBarberia, hora } = req;

    try {

        const data = await db.collection('citas').where('hora', '==', req.hora).where('idBarberia', '==', req.idBarberia).get();
        const dataSnapshot = [];

        data.docs.forEach(doc =>{
            dataSnapshot.push(doc);
        });
        const cita = data.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        if (dataSnapshot.length == 0) {
            await db.collection('citas').add({
                idClientes,
                idBarberia,
                hora
            })
            return res.status(201).json({
                msg: 'cita agendada exitosamente'
            });
            
        } else {
            console.log(cita);
            return res.status(401).json({
                msg: 'agenda llena para solicitud en horario [' + req.hora + ']'
            });
            
        }
        
    } catch (e) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }

}

module.exports = {scheduleService};