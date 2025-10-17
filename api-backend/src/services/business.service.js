const { db } = require('../utils/firebase');
const bcrypt = require('bcrypt');

const createService = async (req, res) => {

    const { nombre_establecimiento, nombre_admin, apellido_admin, direccion, correo, tipo_establecimiento } = req;

    let { contraseña } = req;
    const salt = bcrypt.genSaltSync();
    contraseña = bcrypt.hashSync(contraseña, salt);

    try {

        const data = await db.collection('empresas').where('correo', '==', req.correo).get();
        const dataSnapshot = [];

        data.docs.forEach(doc => {
            dataSnapshot.push(doc);
        });

        if (dataSnapshot.length == 0) {
            await db.collection('empresas').add({
                nombre_establecimiento,
                nombre_admin,
                apellido_admin,
                direccion,
                correo,
                contraseña,
                tipo_establecimiento: tipo_establecimiento || null,
                estado: true // Siempre se registra como activo
            })

            return res.status(201).json({
                msg: 'usuario [' + req.correo + '] creado exitosamente'
            });


        } else {
            return res.status(406).json({
                msg: 'usuario [' + req.correo + '] ya tiene cuenta'
            });
        }
    } catch (e) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }

    //console.log(nombre, empleado_id, direccion, correo, rol);
}

const getAllService = async (req, res) => {

    try {

        const querySnapshot = await db.collection('empresas').where('estado', '==', true).get();

        if (querySnapshot.empty) {

            res.status(404).json({
                msg: 'no data'
            });

        } else {

            const business = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log(business);

            res.status(200).json({
                msg: 'OK',
                data_list: business
            });

        }

    } catch (e) {
        res.status(400).json({
            msg: 'bad request',
            error: e
        });
    }
}

module.exports = { createService, getAllService };