const { db } = require('../utils/firebase');

const createService = async (req, res) => {

    const { empresaId, nombre, apellido, celular, estado } = req;

    try {
        const data = await db.collection('empleado').where('nombre', '==', req.nombre).where('apellido', '==', req.apellido).get();
        const dataSnapshot = [];

        data.docs.forEach(doc => {
            dataSnapshot.push(doc);
        });

        if (dataSnapshot.empty) {
            await db.collection('empleado').add({
                empresaId,
                nombre,
                apellido,
                celular,
                estado
            });

            return res.status(201).json({
                msg: 'empleado [' + data.nombre + ' ' + data.apellido + '] agregado exitosamente'
            });

        } else {
            return res.status(201).json({
                msg: 'empleado [' + data.nombre + ' ' + data.apellido + '] ya existente'
            });
        }

    } catch (e) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }

}

const getEmployees = async (req, res) => {

    const empresaId = req;

    try {

        const querySnapshot = await db.collection('empleado').where('empresaId', '==', req.empresaId).where('estado', '==', true).get();

        if (querySnapshot.empty) {

            res.status(404).json({
                msg: 'no data'
            });

        } else {

            const employees = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log(employees);

            res.status(200).json({
                msg: 'OK',
                data_list: employees
            });

        }

    } catch (e) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }
}

module.exports = { createService, getEmployees };