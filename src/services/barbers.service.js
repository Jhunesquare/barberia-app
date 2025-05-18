const { db } = require("../utils/firebase");
const bcrypt = require('bcrypt');

const createService = async (req, res) => {

    const { nombre, barberoNombre, direccion, correo } = req;

    let { contraseña } = req;
    const salt = bcrypt.genSaltSync();
    contraseña = bcrypt.hashSync(contraseña, salt);

    try {

        const data = await db.collection('barberias').where('correo', '==', req.correo).get();
        const dataSnapshot = [];

        data.docs.forEach(doc => {
            dataSnapshot.push(doc);
        });

        if (dataSnapshot.length == 0) {
            await db.collection('barberias').add({
                nombre,
                barberoNombre,
                direccion,
                correo,
                contraseña
            })

            return res.status(201).json({
                msg: 'usuario [' + data.correo + '] creado exitosamente'
            });


        } else {
            return res.status(406).json({
                msg: 'usuario [' + data.correo + '] ya tiene cuenta'
            });
        }
    } catch (e) {
        return res.status(400).json({
            msg: 'acción no permitida'
        });
    }

    console.log(nombre, apellido, correo, contraseña);
}

const getAllService = async (req, res) => {

    try {

        const querySnapshot = await db.collection('barberias').get();

        if (querySnapshot.empty) {

            res.status(404).json({
                msg: 'no data'
            });

        } else {

            const barberias = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log(barberias);

            res.status(200).json({
                msg: 'OK',
                data_list: barberias
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