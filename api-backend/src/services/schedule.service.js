const {db} = require('../utils/firebase');

const scheduleService = async (req, res) =>{

    const { idCliente, idBarberia, idEmpleado, servicioId, hora, estado } = req;

    try {

        const data = await db.collection('citas').where('hora', '==', req.hora).where('idBarberia', '==', req.idBarberia).where('idEmpleado', '==', req.idEmpleado).get();
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
                idCliente,
                idBarberia,
                idEmpleado,
                servicioId,
                hora,
                estado
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

const getByBusinessId = async (req, res) => {

    try {

        const idEmpresa = req.params.idEmpresa;
        
        const querySnapshot = await db.collection('citas').where('idEmpresa', '==', idEmpresa).get();

        if (querySnapshot.empty) {
            
            res.status(404).json({
                msg: 'no data'
            });

        } else {

            const schedule = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log(schedule);

            res.status(200).json({
                msg: 'OK',
                data_list: schedule
            });

        }
    } catch (e) {
        res.status(400).json({
            msg: 'bad request',
            error: e
        });
    }
}

const getByClientId = async (req, res) => {

    try {

        const idCliente = req.params.idCliente;
        
        const querySnapshot = await db.collection('citas').where('idCliente', '==', idCliente).get();

        if (querySnapshot.empty) {
            
            res.status(404).json({
                msg: 'no data'
            });

        } else {

            const schedule = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log(schedule);

            res.status(200).json({
                msg: 'OK',
                data_list: schedule
            });

        }
    } catch (e) {
        res.status(400).json({
            msg: 'bad request',
            error: e
        });
    }
}

const getByEmployeeId = async (req, res) => {

    try {

        const idEmpleado = req.params.idEmpleado;
        
        const querySnapshot = await db.collection('citas').where('idEmpleado', '==', idEmpleado).get();

        if (querySnapshot.empty) {
            
            res.status(404).json({
                msg: 'no data'
            });

        } else {

            const schedule = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log(schedule);

            res.status(200).json({
                msg: 'OK',
                data_list: schedule
            });

        }
    } catch (e) {
        res.status(400).json({
            msg: 'bad request',
            error: e
        });
    }
}

module.exports = {scheduleService, getByBusinessId, getByClientId, getByEmployeeId};